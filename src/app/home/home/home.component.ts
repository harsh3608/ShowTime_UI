import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from 'src/app/employee/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private title: Title,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.title.setTitle('ShowTime');
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
