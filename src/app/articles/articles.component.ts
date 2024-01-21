import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/Models/Publication';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmeDialogComponent } from '../confirme-dialog/confirme-dialog.component';
import { ArticleService } from 'src/Services/article.service';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
 
  displayedColumns: string[] = ['id', 'type', 'titre', 'lieu', 'Date', 'SourcePdf', 'action'];
  dataRecieved: any;
  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator, { static: true })

  paginator !: MatPaginator;
  router: any;

  constructor(private AS: ArticleService, private dialog: MatDialog) { this.dataSource.data = this.AS.tabArticle; }

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
        this.AS.deleteArticleById(id).subscribe(() => {
          this.dataSource.data = this.AS.tabArticle;
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


    const dialogRef = this.dialog.open(ArticleFormComponent, { height: '600px', width: '600px', });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.dataRecieved = data,
        this.AS.Save(this.dataRecieved).subscribe(() => {
          this.dataSource.data = this.AS.tabArticle;
        })
      });
  }

}
