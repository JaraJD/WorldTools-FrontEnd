import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainSecurityComponent } from './pages/main-security/main-security.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authenticationRoutingModule } from './authentication-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainSecurityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    authenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
