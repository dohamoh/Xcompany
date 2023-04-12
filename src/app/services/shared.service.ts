import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReqsService } from './reqs.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private ReqsService:ReqsService) { }


  private services = new BehaviorSubject<any>([]);
  currentServices = this.services.asObservable();

  updateServices() {
    console.log('f');

    this.ReqsService.getAllServices().subscribe((data: any) => {
      console.log(data);

      this.services.next(data.allServices);
    });
  }
}
