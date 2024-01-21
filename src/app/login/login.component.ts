import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private Auth:AuthService, private router:Router, private ngzone:NgZone){};

  signin():void{
    this.Auth.doGoogleLogin().then(
      ()=>{
        this.successRedirect();
      }
    )
  }

  successRedirect():void{
    this.ngzone.run(()=>{
      this.router.navigate(['/members'])
    })
  }
  

}
