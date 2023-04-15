import { ReqsService } from 'src/app/services/reqs.service';
import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  userLoggedIn:any;
  constructor(private SharedService:SharedService , private router:Router,private ReqsService:ReqsService){}
  ngOnInit(): void {
    this.SharedService.isLoggedIn.subscribe((value) => {
      if (value == true) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    })
  }
  logOut(){
    if (this.userLoggedIn == true) {
      localStorage.clear();
      this.userLoggedIn = false
      this.router.navigate(['/signUp'])
    }
  }

  switch(id:any){
  var elements = document.querySelectorAll<HTMLElement>('.page') ;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.classList.add('d-none')
  }
  id.classList.remove('d-none')
}


}
