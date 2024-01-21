import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/Models/Publication';
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
  description: any;
  constructor(private AS: ArticleService, private router: Router, private activatedRoute: ActivatedRoute, private dialogRef: MatDialogRef<ArticleFormComponent>) { }
  articleGlobal!: Article;
  form!: FormGroup;

  ngOnInit() {
    // 1 Recuperer de id  de la route
    const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);
    if (!!idcourant) {
      this.AS.getArticleById(idcourant).subscribe((a) => {
        this.articleGlobal = a;
        console.log(a);
        this.intiForm1(a);
      }) /////////
    }
    else this.intiForm();//creer une inst de form et initialiser
    // si  id exeiste  => edit
    // {
    //getMemeberByid(id)
    //initiliser le form
    //}
    // sinon  je suuis  dans create  => appel a init form()
  }

  intiForm1(a: Article) {
    this.form = new FormGroup({
      id: new FormControl(a.id, []),
      type: new FormControl(a.type, []),
      titre: new FormControl(a.titre, []),
      lieu: new FormControl(a.lieu, []),
      Date: new FormControl(a.Date, []),
      SourcePdf: new FormControl(a.SourcePdf, []),
    })
  }
  intiForm() {
    this.form = new FormGroup({
      id: new FormControl('', []),
      type: new FormControl('', []),
      titre: new FormControl('', []),
      lieu: new FormControl('', []),
      Date: new FormControl('', []),
      SourcePdf: new FormControl('', []),

    })
  }


  save() {
    console.log(this.form.value);
    // 1.recuperer dans form .value
    // 2.lancer la methode save() du service
    // envoyer http POST vers le back
    //redirection vers la page /Articles


    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
