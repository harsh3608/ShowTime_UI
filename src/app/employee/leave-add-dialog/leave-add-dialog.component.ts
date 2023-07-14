import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authorization/auth.service';
import { HalfDayShiftOptions, LeaveTypeOptions } from '../shared/enums/leave-enums';

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



  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.authService.getPersonName();
    this.authService.getUserId();

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
      isHalfDay: new FormControl({ value: false, disabled: true }),
      halfDayShift: new FormControl(''),
      isPaid: new FormControl(false, [Validators.required])
    });
    
  }

  SubmitForm() {
    debugger;
    console.log(this.addLeaveRequestForm.value);
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















  get isHalfDay(): FormControl {
    return this.addLeaveRequestForm.get("isHalfDay") as FormControl;
  }
  get startDate(): FormControl {
    return this.addLeaveRequestForm.get("startDate") as FormControl;
  }

  get endDate(): FormControl {
    return this.addLeaveRequestForm.get("endDate") as FormControl;
  }


}
