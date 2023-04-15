import { SharedService } from 'src/app/services/shared.service';
import { ReqsService } from 'src/app/services/reqs.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent {

constructor(private ReqsService:ReqsService,private SharedService:SharedService){}
  name:any
  allUser:any
  userData:any
  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data:any)=>{
      this.userData = data
    })
  }
  search() {

    // this.loaded = '';
    // this.messageErr = '';
    let data = {
      name: this.name,
    };
console.log(data);

    if (data.name == '') {
      this.allUser = [];
      // this.messageErr = '';
      // this.loaded = 'd-none';
    } else {
      this.ReqsService.searchUser(data).subscribe((data: any) => {
        console.log(data);

        if (data.message == 'users') {
          this.allUser = data.allUser;
          // this.loaded = 'd-none';
          // this.loading = 'd-none'
        } else {
          // this.loaded = 'd-none';
          // this.loading = 'd-none'
          // if (this.name == '') {
          //   this.messageErr = '';
          // } else {
          //   this.messageErr = data.message;
          // }
        }
      });
    }
  }
  addAdmin(id:any){
    let data={
      id
    }
    this.ReqsService.addAdmin(data).subscribe((data:any)=>{
      console.log(data);
      if (data.message == 'Done') {
        this.name = ''
        this.search()
              }
    })
  }
  addSuperAdmin(id:any){
    let data={
      id
    }
    this.ReqsService.addSuperAdmin(data).subscribe((data:any)=>{
      console.log(data);
      if (data.message == 'Done') {
this.name = ''
this.search()
      }

    })
  }
  removeAdmin(id:any){
    let data={
      id
    }
    this.ReqsService.removeAdmin(data).subscribe((data:any)=>{
      console.log(data);
      if (data.message == 'Done') {
        this.name = ''
        this.search()
              }
    })
  }
}
