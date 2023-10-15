import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MainSecurityComponent } from "./pages/main-security/main-security.component";

const routes: Routes = [
    {
      path: '',
      component: MainSecurityComponent,
      children: [
          {
          path:'login',// localhost:4200/login/registrar
          component: LoginComponent
          },
          {
          path:'register',// localhost:4200/login/registrar
          component: RegisterComponent
          },
          {
          path: '**',
          redirectTo: 'login'
          }
      ]
      }
  ]
  
  @NgModule({
      imports: [RouterModule.forChild( routes )],
      exports: [RouterModule]
    })
    export class authenticationRoutingModule { }