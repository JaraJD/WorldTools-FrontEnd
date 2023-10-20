import { Component } from '@angular/core';
import { UserQueryVm } from 'src/app/authentication/interfaces/user-query-vm.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 userName : UserQueryVm  = JSON.parse(localStorage.getItem('user')!);
}
