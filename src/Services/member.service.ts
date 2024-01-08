import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Models/Member';
import { GLOBAL } from 'src/app/app_config';

@Injectable({
  providedIn: 'root'
})


export class MemberService {
  constructor(private httpClient: HttpClient) { }
  tab: Member[] = GLOBAL._DB.members;

  getMemberById(id: string): Observable<Member> {
    return new Observable(observer => {
      observer.next(this.tab.find(item => item.id === id));
    });
  }

  deleteMemberById(id: string): Observable<void> {
      this.tab = this.tab.filter(item => item.id !== id);
      return new Observable(observer => observer.next());
  }


  // generate the reqests http to the backend
  save(member: Member): Observable<void> {   // envoyer les requetes end mode POST
    // return this.httpClient.post<void>('http://localhost:8080/api/members', member);
    this.tab.push(member);
    return new Observable(observer => observer.next());
  }



}
