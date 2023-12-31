import { Component, OnInit } from '@angular/core';
import { LeaveAddDialogComponent } from '../leave-add-dialog/leave-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/authorization/auth.service';
import { LeaveService } from '../../shared/services/leave.service';
import { LeaveDTO } from '../../shared/models/leave-models';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { LeaveTypeOptions } from '../../shared/enums/leave-enums';
import { LeaveDetailsComponent } from '../leave-details/leave-details.component';
import { SelfLeaveCalendarComponent } from '../self-leave-calendar/self-leave-calendar.component';

@Component({
  selector: 'app-leave-manager',
  templateUrl: './leave-manager.component.html',
  styleUrls: ['./leave-manager.component.css']
})
export class LeaveManagerComponent implements OnInit{
  employeeId:any;
  employeeName!:string;
  allLeaveRequests:LeaveDTO[]=[];
  userLeaveRequests:LeaveDTO[]=[];
  leaveTypeOptions: string[] = [] ;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private leaveService: LeaveService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if(this.authService.getUserRole() == 'Admin') { this.isAdmin = true; }

    this.leaveTypeOptions = Object.keys(LeaveTypeOptions)
    .filter(key => isNaN(Number(key))) // Exclude numeric keys, if any
    .map(key => LeaveTypeOptions[key as keyof typeof LeaveTypeOptions]);

    this.employeeId = this.authService.getUserId();
    this.GetAllEmpLeaves();
    this.GetEmpLeaves();
  }


  OpenAddLeaveDialog(){
    const dialogRef = this.dialog.open(LeaveAddDialogComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.GetAllEmpLeaves();
      this.GetEmpLeaves();
    });
  }

  GetAllEmpLeaves() {
    this.leaveService.GetAllLeaveRequests().subscribe(
      (res) => {
        if(res.isSuccess){
          this.allLeaveRequests = res.response;
          //console.log(this.allLeaveRequests);
          
        }else{
          this.toastr.warning(res.message, 'Failed',{
            timeOut:3000,
          });
        };
      }
    );
  }

  GetEmpLeaves() {
    this.leaveService.GetUserAllLeaves(this.employeeId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.userLeaveRequests = res.response;
          //console.log(this.userLeaveRequests);
          
        }else{
          this.toastr.warning(res.message, 'Failed',{
            timeOut:3000,
          });
        };
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  GetLeaveType(index: number): string {
    return this.leaveTypeOptions[index];
  }

  OpenLeaveDetailsDialog(id:any){
    const dialogRef = this.dialog.open(LeaveDetailsComponent,
      {
        data: { leaveId: id }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.GetAllEmpLeaves();
      this.GetEmpLeaves();
    });
  }


  OpenCalendarDialog() {
    const dialogRef = this.dialog.open(SelfLeaveCalendarComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.GetAllEmpLeaves();
      this.GetEmpLeaves();
    });
  }



}