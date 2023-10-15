import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserAuth } from '../../interfaces/user-auth.interface';
import { UserQueryVm } from '../../interfaces/user-query-vm.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuarioForm: FormGroup;
  usertocreate : UserAuth | undefined;
  userResponse : UserQueryVm | undefined;

  constructor(private readonly authService: AuthService){
    this.usuarioForm = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl<string>('', Validators.required)
    });
  }


  enter(){

  }
}
