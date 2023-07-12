import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    
  }

}
