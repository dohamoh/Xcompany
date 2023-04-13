import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReqsService } from './reqs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private ReqsService:ReqsService , private router:Router) { }

  private userData = new BehaviorSubject<any>([]);
  currentUserData = this.userData.asObservable();

  // private LoggedIn = new BehaviorSubject<any>([]);
  // isLoggedIn = this.LoggedIn.asObservable();

  private services = new BehaviorSubject<any>([]);
  currentServices = this.services.asObservable();

  updateUserData() {
    if (localStorage.getItem('userToken')) {
      this.ReqsService.getUser(localStorage.getItem('userToken')).subscribe(
        (data: any) => {
          if (data.userData) {
            this.userData.next(data.userData);
          }
        },
        (err: HttpErrorResponse) => {
          if (
            err.error.message == 'jwt expired' ||
            err.error.message == 'jwt malformed'
          ) {
            localStorage.removeItem('userToken');
            this.router.navigate([`/signUp`]);
          }
        }
      );
    }
  }
  // isLoggedInFun() {
  //   if (localStorage.getItem('userToken')) {
  //     this.LoggedIn.next(true);
  //   } else {
  //     this.LoggedIn.next(false);
  //   }
  // }

  updateServices() {
    console.log('f');
    this.ReqsService.getAllServices().subscribe((data: any) => {
      console.log(data);
      this.services.next(data.allServices);
    });
  }
}
