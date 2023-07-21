import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveService } from '../../shared/services/leave.service';
import { LeaveDTO } from '../../shared/models/leave-models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit{
  leave: LeaveDTO = {
    id: '',
  userId: '',
  username: '',
  startDate: '',
  endDate: '',
  reason: '',
  leaveType: 99,
  status: 99,
  isHalfDay: false,
  halfDayShift: 99,
  isPaid: false,
  managerId: '',
  managerName: '',
  dateOfRequest: '',
  leaveDays: 99,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leaveService: LeaveService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetLeaveDetails();
    
  }

  GetLeaveDetails(){
    this.leaveService.GetLeaveRequestById(this.data.leaveId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.leave = res.response;
          console.log(this.leave);
        }else{
          this.toastr.warning(res.message, 'Warning', {
            timeOut: 2000,
          });
        };
      }
    );
  }


}
