import { Component } from '@angular/core';
import {GLOBAL} from "../app-config";

import {MemberService} from "../../Services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmeDialogComponent} from "../confirme-dialog/confirme-dialog.component";
import { Member } from 'src/Models/Member';


@Component({
  selector: 'app-membre-liste',
  templateUrl: './membre-liste.component.html',
  styleUrls: ['./membre-liste.component.css']
})
export class MembreListeComponent {
  constructor(private MS:MemberService , private dialog:MatDialog) {}

  onDelete(id:string) : void {
    //1 ouverture de la boite
    let dialogRef = this.dialog.open(ConfirmeDialogComponent, {
      height: '200px',
      width: '300px',
    });

    //2 attendre le resulat
    dialogRef.afterClosed().subscribe((a)=>{if(a){
      // 3  if retour ==true  => nefs5ou
      this.MS.deleteMemberById(id).subscribe(()=>{})
      this.dataSource = this.MS.dataSource ;
    }})
    // subscribe joux le role  d' un Listner


  }
  dataSource: Member[] = GLOBAL._DB.members as Member[];

  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'cv', 'createdDate', 'Actions'];
}
