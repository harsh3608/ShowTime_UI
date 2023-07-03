import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/employee/shared/authorization/auth.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit{
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
