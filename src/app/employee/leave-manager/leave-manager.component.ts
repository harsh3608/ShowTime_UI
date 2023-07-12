import { Component, OnInit } from '@angular/core';
import { LeaveAddDialogComponent } from '../leave-add-dialog/leave-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authorization/auth.service';

@Component({
  selector: 'app-leave-manager',
  templateUrl: './leave-manager.component.html',
  styleUrls: ['./leave-manager.component.css']
})
export class LeaveManagerComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }


  OpenAddLeaveDialog(){
    const dialogRef = this.dialog.open(LeaveAddDialogComponent,
      {
        data: {  }
      }
    );
    dialogRef.addPanelClass('rounded-dialog-container');
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
