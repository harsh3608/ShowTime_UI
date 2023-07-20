import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../shared/services/account.service';
import { AuthService } from '../shared/authorization/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginDTO } from '../shared/models/employee-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  loginForm!: FormGroup;
  showPassword: boolean = false;
  loginRequest!: LoginDTO; 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private accountService: AccountService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.removeToken();
    this.loginForm = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')])
    });
  }

  SubmitloginForm(){
    this.isLoading = true;
    setTimeout(() => {
      this.loginForm.markAllAsTouched();
      this.loginRequest = this.loginForm.value;
    if(this.loginForm.valid){
      this.accountService.LoginUser(this.loginRequest).subscribe(
        (res)=>{
          if(res.isSuccess && res.statusCode == 200){
            if(res.response.userType == 'Employee'){
              this.authService.setToken(res.response.token);
              this.authService.storeManagerId(res.response.managerId);
              this.authService.storeManagerName(res.response.managerName);
              //
              this.toastr.success('Logged in Successfully!', 'Success!',{
                timeOut: 2000,
              });
              this.dialogRef.close();
              this.router.navigate(['/employee/home'])
            }
            else if(res.response.userType == 'Admin'){
              this.authService.setToken(res.response.token);
              this.toastr.success('Admin Logged in Successfully!', 'Success!',{
                timeOut: 2000,
              });
              this.dialogRef.close();
              this.router.navigate(['/admin/home']);
              this.authService.getUserMail();
              this.authService.getUserRole();
            }
          } else if(!res.isSuccess){
            this.toastr.error(res.message, 'Failure!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
          }
        }
      );
    }
    }, 1500);
   
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  CloseDialog() {
    this.dialogRef.close();
  }



  //Getter functions to get for-values from form-controls
  get Email(): FormControl {
    return this.loginForm.get("Email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("Password") as FormControl;
  }

}
