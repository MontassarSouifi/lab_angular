import { Component, OnInit, ViewChild } from '@angular/core';
import { Evenement } from 'src/Models/Evenement';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmeDialogComponent } from '../confirme-dialog/confirme-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/Services/event.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titre', 'dateStart', 'dateEnd', 'lieu', 'action'];
  dataRecieved: any;
  dataSource: MatTableDataSource<Evenement> = new MatTableDataSource<Evenement>();

  @ViewChild(MatPaginator, { static: true })

  paginator !: MatPaginator;
  router: any;

  constructor(private ES: EventService, private dialog: MatDialog) { this.dataSource.data = this.ES.dataSource; }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onDelete(id: string): void {

    //1 ouverture de la boite
    let dialogRef = this.dialog.open(ConfirmeDialogComponent, {
      height: '200px',
      width: '300px',
    });

    //2 attendre le resulat
    dialogRef.afterClosed().subscribe((a) => {
      if (a) {
        // 3  if retour ==true  => nefs5ou
        this.ES.deleteEventById(id).subscribe(() => {
          this.dataSource.data = this.ES.dataSource;
        });
      }
    })
    // subscribe joux le role  d' un Listner
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(ConfirmeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
          this.dataRecieved = data,
          this.ES.Save(this.dataRecieved).subscribe(() => {
            this.dataSource.data = this.ES.dataSource;
          })
      });
  }
}
