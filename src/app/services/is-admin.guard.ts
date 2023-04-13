import { SharedService } from 'src/app/services/shared.service';
import { ReqsService } from 'src/app/services/reqs.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  userData:any;
  constructor(private router:Router , private ReqsService:ReqsService , private SharedService:SharedService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('role') == 'Admin') {
        return true
      }
      this.router.navigate(['/home'])
    return false;
  }

}
