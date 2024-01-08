import { Component } from '@angular/core';
import { GLOBAL } from '../app_config';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent {

  constructor(private MS: MemberService) {}


  delete(id: string): void {
    this.MS.deleteMemberById(id).subscribe(() => { 
      this.dataSource = this.MS.tab;
    });
  }

  nom = 'nour';
  dataSource : Member[] = GLOBAL._DB.members
  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'cv', 'createdDate', 'action'];

  
}
