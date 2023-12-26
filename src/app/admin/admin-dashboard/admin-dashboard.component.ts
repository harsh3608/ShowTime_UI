import { Component, OnInit } from '@angular/core';
import { Punch } from 'src/app/employee/shared/models/punch-models';
import { PunchService } from 'src/app/employee/shared/services/punch.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  punchedInUsers: Punch[] = [];

  constructor(
    private punchService: PunchService,
  ) {}

  ngOnInit(): void {
    this.CallCommonFunctions();
  }

  CallCommonFunctions() {
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

}
