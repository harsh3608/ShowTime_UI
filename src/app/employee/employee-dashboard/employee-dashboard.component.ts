import { Component, OnInit } from '@angular/core';
import { PunchService } from '../shared/services/punch.service';
import { AuthService } from '../shared/authorization/auth.service';
import { Punch, TimeSpan, WorkingTime } from '../shared/models/punch-models';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ChartOptions, ChartDataset } from 'chart.js';
import Chart from 'chart.js/auto';
import * as $ from 'jquery';
import 'bootstrap';

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
  punchedinTime!: TimeSpan;
  formattedPunchedinTime!: string;
  workingTimes: WorkingTime[] = [];


  wt1: number = 0;
  wt2: number = 0;
  wt3: number = 0;
  wt4: number = 0;
  wt5: number = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
  };
  barChartLabels: string[] = []
  barChartData: ChartDataset[] = [
    { data: [], label: 'Working Hours' },
  ];
  elementRef: any;


  constructor(
    private punchService: PunchService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    Chart.register({});
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getPersonName();
    this.CallCommonFunctions();


  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = document.getElementById(
      'barChart'
    ) as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    
    if (context) {
      new Chart(context, {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: this.barChartData,
        },
        options: this.barChartOptions,
      });
    }

    

  }


  CallCommonFunctions() {
    this.GetPunchedInTime();
    this.GetUserStatus();
    this.GetAllPunchedUsers();
    this.GetAllPunchesForToday();
    this.GetFiveDaysWorkingTime();
  }


  GetFiveDaysWorkingTime() {
    this.punchService.GetFiveDaysWorkingTime(this.userId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.workingTimes = res.response;

          this.wt1 = Number(res.response[0].workingTime.toFixed(2)); 
          this.wt2 = Number(res.response[1].workingTime.toFixed(2)); 
          this.wt3 = Number(res.response[2].workingTime.toFixed(2)); 
          this.wt4 = Number(res.response[3].workingTime.toFixed(2)); 
          //this.wt5 = moment.duration(res.response[4].workingTime).hours();

          //console.log(this.wt1, this.wt2, this.wt3, this.wt4, this.wt5);
          //this.barChartData[0].data.push(Number(res.response[0].workingTime.toFixed(2)),Number(res.response[1].workingTime.toFixed(2)),Number(res.response[2].workingTime.toFixed(2)))

          this.barChartData[0].data.push(this.wt1, this.wt2, this.wt3)



          console.log(res.response);
          
          res.response.forEach(element => {
            this.barChartLabels.push(element.date.split('T')[0]);
          });
        }
      }
    );
  }

  GetUserStatus() {
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
          this.CallCommonFunctions();
          if(this.isPunchedIn){
            this.toastr.success( res.response.userName+' Punched In Successfully!', 'Punched In!',{
              timeOut: 2000,
            });
          }else{
            this.CallCommonFunctions();
            this.toastr.warning(res.response.userName+' Punched Out Successfully!', 'Punched Out!',{
              timeOut: 2000,
            });
          }
        }
      }
    );
    this.CallCommonFunctions();
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

  GetPunchedInTime() {
    this.punchService.CalculateTotalPunchedInTime(this.userId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.punchedinTime = res.response; 

          // const hours = moment.duration(this.punchedinTime).hours();
          // const minutes = moment.duration(this.punchedinTime).minutes();
          // const seconds = moment.duration(this.punchedinTime).seconds();
          this.formattedPunchedinTime = (
            moment.duration(this.punchedinTime).hours() +'h :'+
            moment.duration(this.punchedinTime).minutes()+'m'
          );
          
        }
      }
    ); 
  }

  GetAllPunchesForToday() {
    this.punchService.GetAllUserPunchesForToday(this.userId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.punchesForToday = res.response;
        }
      }
    )
  }


}
