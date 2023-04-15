import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReqsService } from './reqs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private ReqsService: ReqsService, private router: Router) { }

  private userData = new BehaviorSubject<any>([]);
  currentUserData = this.userData.asObservable();

  private cart = new BehaviorSubject<any>([]);
  cartValue = this.cart.asObservable();

  // private userRole = new BehaviorSubject<any>([]);
  // currentUserRole = this.userRole.asObservable();


  private LoggedIn = new BehaviorSubject<any>([]);
  isLoggedIn = this.LoggedIn.asObservable();

  private services = new BehaviorSubject<any>([]);
  currentServices = this.services.asObservable();

  private clients = new BehaviorSubject<any>([]);
  currentClients = this.clients.asObservable();

  private clientServices = new BehaviorSubject<any>([]);
  currentClientServices = this.clientServices.asObservable();

  updateUserData() {
    if (localStorage.getItem('userToken')) {
      this.ReqsService.getUserRole(localStorage.getItem('userToken')).subscribe(
        (data: any) => {
          if (data.user) {
            localStorage.setItem('role', data.user.role);
            this.userData.next(data.user);
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
  isLoggedInFun() {
    if (localStorage.getItem('userToken')) {
      this.LoggedIn.next(true);
    } else {
      this.LoggedIn.next(false);
    }
  }
  updateServices() {
    this.ReqsService.getAllServices().subscribe((data: any) => {
      this.services.next(data.allServices);
    });
  }
  updateClients() {
    this.ReqsService.getAllClients().subscribe((data: any) => {
      this.clients.next(data.allClients);
    });
  }

  updateClientServices() {
    
  }

  switchCartValue() {
    this.cart.next(!this.cart.value);
    console.log(this.cart.value);
  }
  updateAllData() {
    this.updateUserData()
    this.updateClients()
    this.updateServices()
    this.isLoggedInFun()
  }
}
