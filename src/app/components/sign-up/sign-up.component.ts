import { ReqsService } from 'src/app/services/reqs.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  })
  emailErr: any;

  constructor(private router: Router, private Auth: ReqsService) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
    this.Auth.signUp(this.registerForm.value).subscribe(
      (data: any) => {
        console.log(data);
        if (data.message == 'added successfully') {
          this.router.navigate(['/logIn'])
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error.message == "this email already register") {
          this.emailErr = "this email already register";
        }
      }
    )
  }
}
