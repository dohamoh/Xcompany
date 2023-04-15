import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userLoggedIn:any;
  userData:any
  constructor(private SharedService:SharedService , private router:Router){}
  ngOnInit(): void {
    this.SharedService.isLoggedIn.subscribe((value) => {
      if (value == true) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    })
    this.SharedService.currentUserData.subscribe((data:any)=>{
this.userData = data
    })
  }
  logOut(){
    if (this.userLoggedIn == true) {
      localStorage.clear();
      this.userLoggedIn = false
      this.router.navigate(['/signUp'])
    }
  }
cart(){
  this.SharedService.switchCartValue()
}
}
