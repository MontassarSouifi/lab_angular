import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from "./member/member.component";
import { MembreFormComponent } from "./membre-form/membre-form.component";
import { MembreListeComponent } from "./membre-liste/membre-liste.component";
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: LoginComponent
  },


  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },

  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },



  {
    path: 'tools',
    pathMatch: 'full',
    component: ToolsComponent
  },



  {
    path: 'articles',
    pathMatch: 'full',
    component: ArticlesComponent
  },


  {
    path: 'events',
    pathMatch: 'full',
    component: EventsComponent
  },

  {
    path: 'members',
    pathMatch: 'full',
    component: MembreListeComponent
  },
  // : c indique ili id dynamique fil root
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: MembreFormComponent
  },

  {
    path: "create",
    pathMatch: 'full',
    component: MembreFormComponent
  },
  {
    path: "",
    pathMatch: 'full',
    component: MembreFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
