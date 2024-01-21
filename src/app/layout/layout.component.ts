import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user!: any;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserClaims().then(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.doLogout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
