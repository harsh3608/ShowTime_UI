import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword, LoginDTO, LoginResponse, PasswordReturnResponse, RegisterDTO } from '../models/employee-models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userBaseServerLink: string = 'https://localhost:7231/api/Account/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  LoginUser(login:LoginDTO): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userBaseServerLink+'Login', login);
  }

  RegisterUser(request:RegisterDTO): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userBaseServerLink+'Register', request);
  }

  ChangePassword(model:ChangePassword): Observable<PasswordReturnResponse> {
    return this.http.post<PasswordReturnResponse>(this.userBaseServerLink+'Change-Password', model, { headers: this.headers });
  }


}
