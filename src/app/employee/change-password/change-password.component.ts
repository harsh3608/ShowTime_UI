import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/authorization/auth.service';
import { ChangePassword } from '../shared/models/employee-models';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassForm!: FormGroup;
  public showPassword: boolean = false;
  public showCurrentPassword: boolean = false;
  ChangePasswordRequest!: ChangePassword;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      email: new FormControl(this.authService.getUserMail()),
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl('')
    })
  }

  //Validator Function to check password match in password and confirm-password fields
  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('password')?.value
    let confirmPass = control.get('confirmPassword')?.value
    return pass == confirmPass ? null : { notSame: true }
  }

  //Function to toggle password visibility in password fields
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleCurrentPasswordVisibility(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }


  submitForm() {
    this.changePassForm.markAllAsTouched();
    if (this.changePassForm.valid) {
      this.ChangePasswordRequest = this.changePassForm.value;
      this.accountService.ChangePassword(this.ChangePasswordRequest).subscribe(
        (res)=>{
          if(res.isSuccess){
            this.toastr.success(res.message, 'Success!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
          }else{
            this.toastr.error(res.message, 'Failure!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
          }
        }
      )
    }
  }

  get currentPassword(): FormControl {
    return this.changePassForm.get("currentPassword") as FormControl;
  }

  get newPassword(): FormControl {
    return this.changePassForm.get("newPassword") as FormControl;
  }

  get confirmNewPassword(): FormControl {
    return this.changePassForm.get("confirmNewPassword") as FormControl;
  }
}
