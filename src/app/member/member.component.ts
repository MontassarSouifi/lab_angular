import { Component } from '@angular/core';
import { GLOBAL } from '../app_config';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent {
  
  constructor(private MS: MemberService, private dialog: MatDialog ) { }

  ondelete(id: string): void {
    
   // 1. overture de la boite de dialogue
    // 2. attendre la reponse de l'utilisateur
    // 3. if return true => delete
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '210px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((a) => {
      if (a) 
        this.MS.deleteMemberById(id).subscribe(() => {
          this.dataSource = this.MS.tab;
        });
      });
  }
  
  nom = 'nour';
  dataSource : Member[] = GLOBAL._DB.members
  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'cv', 'createdDate', 'action'];

  
}
