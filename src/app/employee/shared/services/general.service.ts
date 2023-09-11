import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  DobResponse } from '../models/employee-models';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  userBaseServerLink: string = 'https://localhost:7231/api/General/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  GetAllUsersDob() : Observable<DobResponse>{
    return this.http.get<DobResponse>(this.userBaseServerLink+"GetAllUsersDob",{ headers: this.headers });
  }
  
}
