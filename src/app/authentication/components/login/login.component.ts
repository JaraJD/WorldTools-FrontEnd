import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserAuth } from '../../interfaces/user-auth.interface';
import { UserQueryVm } from '../../interfaces/user-query-vm.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuarioForm: FormGroup;
  usertocreate : UserAuth | undefined;
  userResponse : UserQueryVm | undefined;

  constructor(private readonly authService: AuthService, private router: Router){
    this.usuarioForm = new FormGroup({
      userEmail: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl<string>('', Validators.required)
    });
    if(this.authService.userData){
      this.router.navigate(["/inventory"]);
    }
  }


  enter(){
    console.log(this.usuarioForm.value);

    this.authService.loginUser(this.usuarioForm.value).subscribe({
        next: user => {
          console.log(user);
          if(user.status === 1){
            this.router.navigate(["/inventory"]);
          };
          Swal.fire(
            'Ok',
            'Session stared',
            'success'
          )
        },
        error:err => console.log(err.error),
        complete: () => {
          console.log('Complete');
        }
      });
  }
}
