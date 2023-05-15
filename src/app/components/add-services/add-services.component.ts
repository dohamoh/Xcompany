import { SharedService } from 'src/app/services/shared.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReqsService } from 'src/app/services/reqs.service';
@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss'],
})
export class AddServicesComponent {
  constructor(private ReqsService: ReqsService,private SharedService :SharedService) {}
  file: any;
  loading: Boolean = false;
  pointesNum: any;
  servicesForm: FormGroup = new FormGroup({
    servicesName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    servicesDescription: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    servicesBrief: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    servicesPrice: new FormControl(null, [Validators.required]),
  });
  pointesForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.handelPointesForm(1);
  }
  upload(event: any) {
    const { files } = event.target;
    this.file = files[0];
  }
  addServices(form: any) {
    let data = new FormData();
    for (let i = 1; i <= this.pointesNum; i++) {
      data.append(`title${i}`, this.pointesForm.value[`title${i}`]);
      data.append(`description${i}`, this.pointesForm.value[`description${i}`]);
    }
    if (this.loading) {
      this.loading = !this.loading;
    } else {
      this.loading = !this.loading;
      data.append('image', this.file);
      data.append('servicesName', form.servicesName);
      data.append('servicesDescription', form.servicesDescription);
      data.append('servicesBrief', form.servicesBrief);
      data.append('servicesPrice', form.servicesPrice);
      data.append('pointesNum', this.pointesNum);
      this.ReqsService.addServices(data).subscribe((data: any) => {
        if (data.message == 'added successfully') {
          this.SharedService.updateServices()
          this.loading = !this.loading;
          this.servicesForm.reset();
          this.pointesForm.reset();
          this.pointesNum = 1;
        }
      });
    }
  }
  handelPointesForm(data: any) {
    const input = document.querySelector('#numP') as HTMLElement | any;
    if (data == 1) {
      this.pointesNum = 1;
    } else {
      this.pointesNum = data.target?.value;
    }
    if (this.pointesNum >= 21) {
      this.pointesNum = 20;
      input.value = 20;
    }
    for (let i = 1; i <= this.pointesNum; i++) {
      this.pointesForm.addControl(
        `title${i}`,
        new FormControl(null, [Validators.required, Validators.minLength(2)])
      );
      this.pointesForm.addControl(
        `description${i}`,
        new FormControl(null, [Validators.required, Validators.minLength(3)])
      );
    }
  }
}
