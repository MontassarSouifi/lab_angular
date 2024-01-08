import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  memberGlobal!: Member;

  //activated route == lien courant
  constructor(private MS: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { } //dependency injection

  form!: FormGroup;
  ngOnInit() {
    //Initialiser form contenant les 4 attributs(cin, name ,cv,type)
    // recuperation id du route
    const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);
    // si id existe alors je suis dans une operation edit
    //=> get memeber by id 
    if (!!idcourant) {
      this.MS.getMemberById(idcourant).subscribe((a) => {
        this.memberGlobal = a;
        this.initForm1(a);
      });
    } else {
      this.initForm();
    }
      }
  

  initForm1(a: Member): void {
    this.form = new FormGroup(
      {
        cin: new FormControl(null, [Validators.required]),
        nom: new FormControl(null, [Validators.required]),
        cv: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required])
      }

    )
  }

  initForm(): void {
    this.form = new FormGroup(
      {
        cin: new FormControl(null, [Validators.required]),
        nom: new FormControl(null, [Validators.required]),
        cv: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required])
      }

    )
  }

  onsub(): void {
    console.log(this.form.value);
    // appeler la fct su service qui envoie la requete http vers le backend
    //Il faut faire l injection du dependance ( le service )
    const MemberToSave = {
      ...this.form.value,
      id: Math.ceil(Math.random() * 1000).toString(),
      createdDate: new Date().toDateString()
    };
    this.MS.save(MemberToSave).subscribe(() => {
      this.router.navigate(['/members'])
    });
  }
}
