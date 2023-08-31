import { SharedService } from 'src/app/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReqsService } from 'src/app/services/reqs.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  })
  emailErr: any;
  passErr: any;
  constructor(private router: Router, private auth: ReqsService, private SharedService: SharedService) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
    this.auth.logIn(this.logInForm.value).subscribe(
      (resData: any) => {

        if (resData.token) {
          localStorage.setItem('userToken', resData.token);
          this.SharedService.updateUserData()
          this.SharedService.isLoggedInFun();
          this.router.navigate(['/home']);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);

        if (err.error.message == 'in valid password') {
          this.passErr = 'Invalid Password';
          this.emailErr = '';
        } else if (err.error.message == 'You have to register first') {
          this.passErr = '';
          this.emailErr = 'You have to register first';
        } else if (err.error.message == 'You have to confirm email first') {
          this.passErr = '';
          this.emailErr = 'You Have To Confirm Your Email First...Please Check Your Email'
        }
      }
    );

  }
}
