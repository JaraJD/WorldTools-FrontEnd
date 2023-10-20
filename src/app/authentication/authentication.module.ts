import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainSecurityComponent } from './pages/main-security/main-security.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authenticationRoutingModule } from './authentication-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './security/jwt.interceptor';



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
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
})
export class AuthenticationModule { }
