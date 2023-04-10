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
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required,Validators.minLength(4)]),
  })
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
    // this.SendEmailService.sendEmail(this.formData.value).subscribe((Data: any) => {
    //   if (Data.message == 'sended') {
    //     this.router.navigate(['/home'])
    //   }
    // })
  }
}
