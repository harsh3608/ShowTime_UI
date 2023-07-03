import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../shared/authorization/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent implements OnInit{
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  data: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  

  openLogOutDialog(){
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      this.dialogTemplate ,
      {
        width: '500px',
        height: '200px',
        data: {
          message: 'Are you sure you want to log out?'
        }
      }
    );
  }

  LogOut() {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }

  getPersonName(){
    return this.authService.getPersonName();
  }

}