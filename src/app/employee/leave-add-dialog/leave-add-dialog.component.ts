import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authorization/auth.service';

@Component({
  selector: 'app-leave-add-dialog',
  templateUrl: './leave-add-dialog.component.html',
  styleUrls: ['./leave-add-dialog.component.css']
})
export class LeaveAddDialogComponent implements OnInit{
  AddLeaveRequestForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.AddLeaveRequestForm = this.fb.group({
      userId: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    leaveType: new FormControl('', [Validators.required]),
    isApproved: new FormControl('', [Validators.required]),
    isRejected: new FormControl('', [Validators.required]),
    isHalfDay: new FormControl('', [Validators.required]),
    halfDayShift: new FormControl('', [Validators.required]),
    });
  }

  SubmitForm() {

  }

}
