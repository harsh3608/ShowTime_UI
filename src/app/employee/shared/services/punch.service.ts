import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Punch, PunchAddResponse, PunchedInTimeResponse, PunchedUsersResponse, UserStatusResponse } from '../models/punch-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PunchService {
  punchBaseServerLink: string = 'https://localhost:7231/api/Punch/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  AddPunch(punch: Punch): Observable<PunchAddResponse>{
    return this.http.post<PunchAddResponse>(this.punchBaseServerLink+'AddPunch',punch, { headers: this.headers } )
  }

  GetUserLatestPunchStatus(userId: any): Observable<UserStatusResponse>{
    return this.http.get<UserStatusResponse>(this.punchBaseServerLink+'GetUserLatestPunchStatus/'+userId, { headers: this.headers } )
  }
  
  GetAllPunchedUsers(): Observable<PunchedUsersResponse> {
    return this.http.get<PunchedUsersResponse> (this.punchBaseServerLink + 'GetAllPunchedInUsers', { headers: this.headers })
  }

  GetAllUserPunchesForToday(userId: any): Observable<PunchedUsersResponse> {
    return this.http.get<PunchedUsersResponse> (this.punchBaseServerLink + 'GetAllUserPunchesForToday/'+userId, { headers: this.headers })
  }

  CalculateTotalPunchedInTime(userId: any): Observable<PunchedInTimeResponse> {
    return this.http.get<PunchedInTimeResponse> (this.punchBaseServerLink + 'CalculateTotalPunchedInTime/'+userId, { headers: this.headers })
  }

}
