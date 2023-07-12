import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveAddRequest, MultipleLeaveResponse, SingleLeaveResponse } from '../models/leave-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  leaveBaseServerLink: string = 'https://localhost:7231/api/Leave/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  AddLeaveRequest(request: LeaveAddRequest) :Observable<SingleLeaveResponse> {
    return this.http.post<SingleLeaveResponse> (this.leaveBaseServerLink+'AddLeaveRequest', request, { headers: this.headers })
  }

  DeleteLeaveRequest(leaveId: any) :Observable<SingleLeaveResponse> {
    return this.http.delete<SingleLeaveResponse> (this.leaveBaseServerLink+'DeleteLeaveRequest/' + leaveId, { headers: this.headers })
  }

  GetAllLeaveRequests() :Observable<MultipleLeaveResponse> {
    return this.http.get<MultipleLeaveResponse> (this.leaveBaseServerLink+'GetAllLeaveRequests', { headers: this.headers })
  }

  GetLeaveRequestById(userId: any) :Observable<SingleLeaveResponse> {
    return this.http.get<SingleLeaveResponse> (this.leaveBaseServerLink+'GetLeaveRequestById/' + userId, { headers: this.headers })
  }

  GetUserAllLeaves(userId: any) :Observable<MultipleLeaveResponse> {
    return this.http.get<MultipleLeaveResponse> (this.leaveBaseServerLink+'GetUserAllLeaves/' + userId, { headers: this.headers })
  }


}
