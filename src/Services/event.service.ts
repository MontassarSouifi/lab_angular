import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from 'src/Models/Evenement';
import { GLOBAL } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  dataSource: Evenement[] = GLOBAL._DB.events as unknown as Evenement[];
  constructor(private httpClient: HttpClient) {}



    Save(events: any): Observable<void> {
      // generer une requtee http en mode poste vers le backend
      this.dataSource.push(events);
      return new Observable<void>(observer => observer.next())
      //ligne 19,20 pour add avec  l main sans avoir backend
      // return  (this.httpClient.post<void>('http://localhost:8080/api',events)) ;
    }
  
    getEventById(id: string): Observable<Evenement> {
      console.log(id);
      console.log(this.dataSource.filter(item => item.id == "123"));
      //this.dataSource.filter(item=> item.id == id ) [0]?? null ;  // ?? hethi fil ts manetha si sinon
      return new Observable(observer => observer.next(this.dataSource.filter(item => item.id == id)[0] ?? null))
      // this.httpClient.get<Member> ('http://localhost:8080/api/Members/id') ;  : hethi partie backend juste ken ana backend naamlo requet get njibo bih
    }
  
    deleteEventById(id: String): Observable<void> {
      this.dataSource = this.dataSource.filter(item => item.id != id);
      return new Observable(observer => observer.next());
      // return this.httpClient.delete<void>('http://localhost:8080/api/events/$id') ;
    }
}
