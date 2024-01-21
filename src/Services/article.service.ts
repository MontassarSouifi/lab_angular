import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Models/Publication';
import { GLOBAL } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  tabArticle:Article[]=GLOBAL._DB.articles;
  constructor(private httpClient: HttpClient) {
  }

  Save(dataRecieved: any): Observable<void> {
    console.log("hello");
    // generer une requtee http en mode poste vers le backend
    this.tabArticle.push(dataRecieved);
    return new Observable<void>(observer => observer.next())
    //ligne 19,20 pour add avec  l main sans avoir backend
    // return this.httpClient.post<void>('http://localhost:8080/api', dataRecieved);
  }

  getArticleById(id: string): Observable<Article> {
    console.log(id);
    console.log(this.tabArticle.filter(item => item.id == "123"));
    //this.dataSource.filter(item=> item.id == id ) [0]?? null ;  // ?? hethi fil ts manetha si sinon
    return new Observable(observer => observer.next(this.tabArticle.filter(item => item.id == id)[0] ?? null))
    // this.httpClient.get<Member> ('http://localhost:8080/api/Article/id') ;  : hethi partie backend juste ken ana backend naamlo requet get njibo bih
  }

  deleteArticleById(id: String): Observable<void> {
    this.tabArticle = this.tabArticle.filter(item => item.id != id);
    console.log("deleted  = " + id);
    return new Observable(observer => observer.next());
    // return this.httpClient.delete<void>('http://localhost:8080/api/Article/$id') ;
  }
}
