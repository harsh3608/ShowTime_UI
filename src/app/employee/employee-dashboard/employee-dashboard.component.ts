import { Component, OnInit } from '@angular/core';
import { PunchService } from '../shared/services/punch.service';
import { AuthService } from '../shared/authorization/auth.service';
import { Punch } from '../shared/models/punch-models';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  userId!:any;
  isPunchedIn: boolean = false;
  PunchRequest!: Punch;

  constructor(
    private punchService: PunchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
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

  AddPunch(){

  }

}
