import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "../app/app-config";
import { Member } from 'src/Models/Member';
import { HttpClient } from "@angular/common/http";

// injectble hethi
@Injectable({
  providedIn: 'root'
})

export class MemberService {
  constructor(private httpClient: HttpClient) {}
  
  dataSource : Member[] = GLOBAL._DB.members;
  Save(member: any): Observable<void> {
    // generer une requtee http en mode poste vers le backend
    this.dataSource.push(member);
    return new Observable<void>(observer => observer.next())
    //ligne 19,20 pour add avec  l main sans avoir backend
    // return  (this.httpClient.post<void>('http://localhost:8080/api',member)) ;
  }

  getMemberById(id: string): Observable<Member> {
    console.log(id);
    console.log(this.dataSource.filter(item => item.id == "123"));
    //this.dataSource.filter(item=> item.id == id ) [0]?? null ;  // ?? hethi fil ts manetha si sinon
    return new Observable(observer => observer.next(this.dataSource.filter(item => item.id == id)[0] ?? null))
    // this.httpClient.get<Member> ('http://localhost:8080/api/Members/id') ;  : hethi partie backend juste ken ana backend naamlo requet get njibo bih
  }

  deleteMemberById(id: String): Observable<void> {
    this.dataSource = this.dataSource.filter(item => item.id != id);
    return new Observable(observer => observer.next());
    // return this.httpClient.delete<void>('http://localhost:8080/api/members/$id') ;
  }
}
