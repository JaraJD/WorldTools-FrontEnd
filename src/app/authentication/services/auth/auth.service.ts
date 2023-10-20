import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../../interfaces/user-auth.interface';
import { UserQueryVm } from '../../interfaces/user-query-vm.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserLogin } from '../../interfaces/user-login-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlQuery : string = 'https://localhost:7063/api/v1/user';
  private apiUrlCommand : string = 'https://localhost:7031/api/v1/user';
  private userSubject!: BehaviorSubject<UserQueryVm | null>;

  public get userData(): UserQueryVm | null{
    return this.userSubject.value;
  }

  constructor(private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<UserQueryVm | null>(JSON.parse(localStorage.getItem('user')!) || null);
  }

  registerUser(user : UserAuth): Observable<UserQueryVm> {
    const url = `${this.apiUrlCommand}/register`;
    return this.http.post<UserQueryVm>(url, user);
  }

  loginUser(user: UserLogin): Observable<UserQueryVm> {
    const url = `${this.apiUrlQuery}/Login`;
    return this.http.post<UserQueryVm>(url, user).pipe(
      map(res => {
        if (res.status === 1){
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('token', res.token)
          this.userSubject.next(res);
          /* localStorage.setItem('email', res.userEmail);
          localStorage.setItem('branchId', res.branchId ?? '');
          localStorage.setItem('role', res.role);
          localStorage.setItem('userId', res.userId); */
        }
        return res;
      })
    );
  }

  logOut(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
