import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO, LoginResponse } from '../models/employee-models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userBaseServerLink: string = 'https://localhost:7231/api/Account/';

  constructor(
    private http: HttpClient
  ) { }

  loginUser(login:LoginDTO): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.userBaseServerLink+'Login', login);
  }
}
