import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../../interfaces/user-auth.interface';
import { UserQueryVm } from '../../interfaces/user-query-vm.interface';
import { Observable } from 'rxjs';
import { UserLogin } from '../../interfaces/user-login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlQuery : string = 'https://localhost:7063/api/v1/user';
  private apiUrlCommand : string = 'https://localhost:7031/api/v1/user';

  constructor(private http: HttpClient) { }


  registerUser(user : UserAuth): Observable<UserQueryVm> {
    const url = `${this.apiUrlCommand}/register`;
    return this.http.post<UserQueryVm>(url, user);
  }

  loginUser(user: UserLogin): Observable<UserQueryVm> {
    const url = `${this.apiUrlQuery}/login`;
    return this.http.post<UserQueryVm>(url, user);
  }
}
