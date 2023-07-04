import { Component, OnInit } from '@angular/core';
import { PunchService } from '../shared/services/punch.service';
import { AuthService } from '../shared/authorization/auth.service';
import { Punch } from '../shared/models/punch-models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  userId!:any;
  userName!: string;
  isPunchedIn: boolean = false;
  punchedInUsers: Punch[] = [];
  punchesForToday: Punch[] = [];


  constructor(
    private punchService: PunchService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getPersonName();
    this.getUserStatus();
    this.GetAllPunchedUsers();
    this.GetAllPunchesForToday();
  }

  getUserStatus() {
    this.punchService.GetUserLatestPunchStatus(this.userId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.isPunchedIn = res.response;
        };
      }
    );
  }

  AddPunch(status: boolean){
    const punch: Punch = {
      id: this.userId,
      punchDateTime: '2023-07-03T11:52:55.378Z',
      userId: this.userId,
      userName: this.userName,
      punchStatus: status
    }
    this.punchService.AddPunch(punch).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.isPunchedIn = res.response.punchStatus;
          this.GetAllPunchedUsers();
          if(this.isPunchedIn){
            this.toastr.success( res.response.userName+' Punched In Successfully!', 'Punched In!',{
              timeOut: 2000,
            });
          }else{
            this.GetAllPunchedUsers();
            this.toastr.warning(res.response.userName+' Punched Out Successfully!', 'Punched Out!',{
              timeOut: 2000,
            });
          }
        }
      }
    );
    this.GetAllPunchedUsers();
  }


  GetAllPunchedUsers() {
    this.punchService.GetAllPunchedUsers().subscribe(
      (res) => {
        if(res.isSuccess){
          this.punchedInUsers = res.response;
        }
      }
    )
  }


  GetAllPunchesForToday() {
    this.punchService.GetAllUserPunchesForToday(this.userId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.punchesForToday = res.response;
          console.log(this.punchesForToday);
        }
      }
    )
  }
}
