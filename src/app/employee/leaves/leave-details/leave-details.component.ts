import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveService } from '../../shared/services/leave.service';
import { LeaveDTO, ToggleLeaveStatusDTO } from '../../shared/models/leave-models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/authorization/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HalfDayShiftOptions, LeaveTypeOptions } from '../../shared/enums/leave-enums';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit{
  //#region variables
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
  userId: any;
  viewForm!: FormGroup;
  toggleData!: ToggleLeaveStatusDTO;
  halfDayShiftoptions: string[] = [] ;
  leaveTypeOptions: string[] = [] ;
  showToggle:boolean = false;
  showDeleteButton:boolean = false;
  isAdmin:boolean=false;
  currentDate:any = this.GetCurrentDateInISOFormat();
  isLeaveExpired: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LeaveDetailsComponent>,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if(this.authService.getUserRole() == 'Admin') { this.isAdmin = true; }
    this.GetLeaveDetails();


    this.halfDayShiftoptions = Object.keys(HalfDayShiftOptions)
    .filter(key => isNaN(Number(key))) // Exclude numeric keys, if any
    .map(key => HalfDayShiftOptions[key as keyof typeof HalfDayShiftOptions]);
    
    this.leaveTypeOptions = Object.keys(LeaveTypeOptions)
    .filter(key => isNaN(Number(key))) // Exclude numeric keys, if any
    .map(key => LeaveTypeOptions[key as keyof typeof LeaveTypeOptions]);

    this.viewForm = new FormGroup({
      id: new FormControl('' ),
      userId: new FormControl('' ),
      username: new FormControl(''),
      startDate: new FormControl('' ),
      endDate: new FormControl(''),
      reason: new FormControl(''),
      leaveType: new FormControl(''),
      status: new FormControl(0 ),
      isHalfDay: new FormControl(false, ),
      halfDayShift: new FormControl(5),
      isPaid: new FormControl(false),
      managerId: new FormControl('' ),
      managerName: new FormControl(''),
      leaveDays: new FormControl(0, ),
      dateOfRequest: new FormControl('')
    })

    

  }

  GetLeaveDetails(){
    this.leaveService.GetLeaveRequestById(this.data.leaveId).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.leave = res.response;
          this.viewForm.setValue(this.leave);
          this.ChangeFormControls();
          //console.log(this.leave);
          if( this.leave.endDate < this.currentDate){
            this.isLeaveExpired = true;
          };
          console.log(this.leave.endDate);
          console.log(this.currentDate);
          console.log(this.isLeaveExpired);
          if(this.leave.managerId == this.userId || this.isAdmin ){
            this.showToggle = true;
          };
          if(this.leave.userId == this.userId || this.isAdmin ){
            this.showDeleteButton = true;
          }
        }else{
          this.toastr.warning(res.message, 'Warning', {
            timeOut: 2000,
          });
        };
      }
    );
  }

  GetCurrentDateInISOFormat(): string {
    // Step 1: Get the current date using new Date()
    const currentDate: Date = new Date();
  
    // Step 2: Get the date components
    const year: number = currentDate.getFullYear();     // e.g., 2023
    const month: number = currentDate.getMonth() + 1;   // Months are zero-based, so add 1
    const day: number = currentDate.getDate();          // e.g., 26
  
    // Step 3: Pad single-digit values with a leading zero (if necessary)
    const formattedMonth: string = month < 10 ? `0${month}` : String(month);
    const formattedDay: string = day < 10 ? `0${day}` : String(day);
  
    // Step 4: Combine the components into the desired format
    const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}T00:00:00`;
  
    return formattedDate;
  }

  ToggleLeaveStatus(id: any, value: number) {
    this.toggleData = {
      leaveId : id,
      value: value
    };
    console.log(this.toggleData);
    this.leaveService.ToggleLeaveStatus(this.toggleData).subscribe(
      (res)=>{
        if(res.isSuccess){
          this.GetLeaveDetails();
          this.toastr.success(res.message, 'Success', {
            timeOut: 2000,
          })
        }else{
          this.toastr.error(res.message, 'Failure', {
            timeOut: 2000,
          } )
        }
      }
    );
    
  }

  ChangeFormControls() {
    var val1 = this.leave.isPaid;
    this.viewForm.controls['isPaid'].setValue(val1? 'Yes':'No');

    var val2 = this.leave.leaveType;
    this.viewForm.controls['leaveType'].setValue(this.leaveTypeOptions[val2]);
  }

  DeleteLeaveRequest(id: any){
    this.leaveService.DeleteLeaveRequest(id).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.toastr.success(res.message, 'Success', {
            timeOut:2000,
          });
          this.dialogRef.close();
        }else{
          this.toastr.warning(res.message, 'Failure', {
            timeOut:2000,
          });
        };
      }
    );
  }






}
