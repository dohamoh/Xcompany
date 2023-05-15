import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userLoggedIn: any;
  userData: any
  role:Boolean=false
  constructor(private SharedService: SharedService, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem('role')) {
this.role = true
    }
    this.SharedService.isLoggedIn.subscribe((value) => {
      if (value == true) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    })
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data
    })
    $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse show");
      if (_opened === true && !clickover.hasClass("navbar-toggler") && !clickover.hasClass("form-control")) {
          $("button.navbar-toggler").click();
      }
  });
  }
  logOut() {
    if (this.userLoggedIn == true) {
      localStorage.clear();
      this.userLoggedIn = false
      this.router.navigate(['/signUp'])
    }
  }
  cart() {
    this.SharedService.switchCartValue()
  }
}
// declare var module : NodeModule;
// declare var stripe : any;
// declare var elements : any;

// interface NodeModule {
//   id: string
// }
