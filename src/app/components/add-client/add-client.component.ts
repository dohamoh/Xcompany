import { ReqsService } from 'src/app/services/reqs.service';
import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  files: any = [];
  clientName: any;
  loading: Boolean = false;
  constructor(private ReqsService: ReqsService,private SharedService:SharedService) {}
  ngOnInit() {

    this.SharedService.currentServices.subscribe((data:any)=>{
      console.log(data);
// this.dropdownList = data
if (data.length !=0) {
  let arr =[]
  arr =data

  // for (let i = 0; i < data.length; i++) {
  //   const element = data[i];
  //   // console.log(element);

  // arr.push(element?.servicesName)
  // }
  this.dropdownList = arr
  this.dropdownSettings = {
    singleSelection: false,

    textField: 'servicesName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };
}




    })
    // this.dropdownList = [{id:'lkdhiols,name:'Mumbai'}, 'Bangaluru', 'Pune', 'Navsari', 'New Delhi'];

  }
  onItemSelect(item: any) {
    // console.log(item);
    // this.selectedItems.push(item.servicesName)
    // console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
  }
  upload(event: any) {
    const { files } = event.target;
    files[0].for = 'logo';
    this.files.push(files[0]);
  }
  servImg(event: any, name: any) {


    let arr1 = this.files;
    this.files = [];
    const { files } = event.target;
    this.files = files;
    const imgs: any[] = [];
    for (let i = 0; i < this.files.length; i++) {
      const element = this.files[i];
      element.for = name;
      imgs.push(element);
    }
    this.files = arr1.concat(imgs);
  }

  select(data: any) {


  }
  addClient() {
    let arr:any = []
    let formData = new FormData();
    if (this.loading) {
      this.loading = !this.loading;
    } else {
      this.loading = !this.loading;
      for (let i = 0; i < this.files.length; i++) {
        const element = this.files[i];
        formData.append(element.for, element);
      }
      for (let i = 0; i < this.selectedItems.length; i++) {
        const element = this.selectedItems[i];
      console.log(element);
arr.push(element.servicesName)
      }


      formData.append('clientName', this.clientName);
      formData.append('services', arr);
      this.ReqsService.addClient(formData).subscribe((data: any) => {
        if (data.message == 'added successfully') {
          this.loading = !this.loading;
        }
      });
    }
  }

}