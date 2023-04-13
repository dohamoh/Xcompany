import { ReqsService } from 'src/app/services/reqs.service';
import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  constructor(private ReqsService: ReqsService) {}
  ngOnInit() {
    this.dropdownList = ['Mumbai', 'Bangaluru', 'Pune', 'Navsari', 'New Delhi'];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  upload(event: any) {
    const { files } = event.target;
    files[0].for = 'logo';
    this.files.push(files[0]);
  }
  servImg(event: any, name: any) {
    console.log(name);

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
    let formData = new FormData();
    if (this.loading) {
      this.loading = !this.loading;
    } else {
      this.loading = !this.loading;
      for (let i = 0; i < this.files.length; i++) {
        const element = this.files[i];
        formData.append(element.for, element);
      }
      formData.append('clientName', this.clientName);
      formData.append('services', this.selectedItems);
      this.ReqsService.addClient(formData).subscribe((data: any) => {
        if (data.message == 'added successfully') {
          this.loading = !this.loading;
        }
      });
    }
  }
}
