import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.minLength(4)]),
  })
  constructor(private router: Router , private Auth:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
    this.Auth.signUp(this.registerForm.value).subscribe((res:any) => {
      console.log(res);
      if (res.message == 'added successfully') {
        this.router.navigate(['/logIn'])
      }

    })
  }
}
