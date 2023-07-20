import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/authorization/auth.service';
import { HalfDayShiftOptions, LeaveTypeOptions } from '../shared/enums/leave-enums';
import { LeaveAddRequest } from '../shared/models/leave-models';
import { LeaveService } from '../shared/services/leave.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-add-dialog',
  templateUrl: './leave-add-dialog.component.html',
  styleUrls: ['./leave-add-dialog.component.css']
})
export class LeaveAddDialogComponent implements OnInit{
  addLeaveRequestForm!: FormGroup;
  halfDayShiftoptions: string[] = [] ;
  leaveTypeOptions: string[] = [] ;
  currentDate = new Date();
  disableHalfDay: boolean = true;
  isLoading: boolean = false;
  leaveRequest!: LeaveAddRequest;
  managerId:any;
  managerName!:string;


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LeaveAddDialogComponent>,
  ){}

  ngOnInit(): void {
    this.managerId = this.authService.getManagerId();
    this.managerName = this.authService.getManagerName();

    this.halfDayShiftoptions = Object.keys(HalfDayShiftOptions)
    .filter(key => isNaN(Number(key))) // Exclude numeric keys, if any
    .map(key => HalfDayShiftOptions[key as keyof typeof HalfDayShiftOptions]);
    
    this.leaveTypeOptions = Object.keys(LeaveTypeOptions)
    .filter(key => isNaN(Number(key))) // Exclude numeric keys, if any
    .map(key => LeaveTypeOptions[key as keyof typeof LeaveTypeOptions]);

    this.addLeaveRequestForm = this.fb.group({
      userId: new FormControl(this.authService.getUserId() ),
      username: new FormControl(this.authService.getPersonName(), [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      leaveType: new FormControl('', [Validators.required]),
      isApproved: new FormControl(false, ),
      isRejected: new FormControl(false, ),
      isHalfDay: new FormControl(false, ),
      halfDayShift: new FormControl(''),
      isPaid: new FormControl(false, [Validators.required]),
      managerId: new FormControl(this.managerId ),
      managerName: new FormControl(this.managerName, [Validators.required]),
      leaveDays: new FormControl(0, )
    });
    
  }

  SubmitForm() {
    //debugger;
    this.isLoading = true;
    setTimeout(() => {
      this.addLeaveRequestForm.markAllAsTouched();
      console.log(this.addLeaveRequestForm.value);
      this.leaveRequest = this.addLeaveRequestForm.value;
      this.leaveService.AddLeaveRequest(this.leaveRequest).subscribe(
        (res) => {
          if(res.isSuccess){
            this.toastr.success(res.message, 'Success!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
          }else{
            this.toastr.warning(res.message, 'Failed!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
          }
        }
      );

    }, 2000);
    
  }


  onDateChange() {
    const startDate = this.addLeaveRequestForm.get('startDate')?.value;
    const endDate = this.addLeaveRequestForm.get('endDate')?.value;

    if(startDate == endDate){
      this.disableHalfDay = false;
      this.addLeaveRequestForm.controls['isHalfDay'].setValue(true);
    }else{
      this.disableHalfDay = true;
      this.addLeaveRequestForm.controls['isHalfDay'].setValue(false);
      this.addLeaveRequestForm.controls['halfDayShift'].setValue('');
    }

    
  }














  get startDate(): FormControl {
    return this.addLeaveRequestForm.get("startDate") as FormControl;
  }

  get endDate(): FormControl {
    return this.addLeaveRequestForm.get("endDate") as FormControl;
  }

  get leaveType(): FormControl {
    return this.addLeaveRequestForm.get("leaveType") as FormControl;
  }

  get reason(): FormControl {
    return this.addLeaveRequestForm.get("reason") as FormControl;
  }
}
