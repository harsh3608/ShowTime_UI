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
  leaveTypeOptions: string[] = [ 
    LeaveTypeOptions[0], 
    LeaveTypeOptions[1],
    LeaveTypeOptions[2],
    LeaveTypeOptions[3],
    LeaveTypeOptions[4]
  ] ;

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
    

    this.addLeaveRequestForm = this.fb.group({
      userId: new FormControl(this.authService.getUserId(), [Validators.required]),
      username: new FormControl(this.authService.getPersonName(), [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      leaveType: new FormControl('', [Validators.required]),
      isApproved: new FormControl(false, [Validators.required]),
      isRejected: new FormControl(false, [Validators.required]),
      isHalfDay: new FormControl(false, [Validators.required]),
      halfDayShift: new FormControl('', [Validators.required]),
    });
    console.log(this.halfDayShiftoptions);
    console.log(this.leaveTypeOptions);
  }

  SubmitForm() {

  }

}
