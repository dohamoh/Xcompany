import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReqsService } from 'src/app/services/reqs.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss'],
})
export class AddServicesComponent {
  constructor(private ReqsService: ReqsService) {}
  file: any;
  loading: Boolean = false;
  servicesForm: FormGroup = new FormGroup({
    servicesName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    servicesDescription: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    servicesPrice: new FormControl(null, [Validators.required]),
  });

  upload(event: any) {
    const { files } = event.target;
    this.file = files[0];
  }
  addServices(form: any) {
    if (this.loading) {

      this.loading = !this.loading;
    } else {

      this.loading = !this.loading;
      let data = new FormData();
      data.append('image', this.file);
      data.append('servicesName', form.servicesName);
      data.append('servicesDescription', form.servicesDescription);
      data.append('servicesPrice', form.servicesPrice);

      this.ReqsService.addServices(data).subscribe((data: any) => {

        if (data.message == 'added successfully') {
          this.loading = !this.loading;
          this.servicesForm.reset();
        }
      });
    }
  }
}
