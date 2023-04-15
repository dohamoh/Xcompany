import { ReqsService } from 'src/app/services/reqs.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent {
  allServices: any;
  edit: Boolean = false;
  name: any;
  brief: any;
  desc: any;
  price: any;
  id: any;
  file: any;
  loading: Boolean = false;
  editLoading: Boolean = false;
  constructor(
    private SharedService: SharedService,
    private ReqsService: ReqsService
  ) {}
  ngOnInit(): void {
    this.SharedService.currentServices.subscribe((data: any) => {
      this.allServices = data;
      console.log(data);

      setTimeout(() => {
        this.reveal();
      }, 10);
    });
  }
  @HostListener('window:scroll', [])
  reveal() {
    var elements = document.querySelectorAll<HTMLElement>('.desc');
    var imgs = document.querySelectorAll<HTMLElement>('.img');

    for (var i = 0; i < elements.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = elements[i].getBoundingClientRect().top;
      var elementVisible = 110;
      if (elementTop < windowHeight - elementVisible) {
        elements[i]?.classList.add('descDef');
        imgs[i]?.classList.add('imgAni');
      } else {
        elements[i].classList.remove('descDef');
        imgs[i]?.classList.remove('imgAni');
      }
    }
  }
  upload(event: any, i: any) {
    const { files } = event.target;
    this.file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event: any) => {
      this.allServices[i].image = reader.result;
    };
  }
  editServ(id: any, i: any) {
    let service = this.allServices[i];

    if (this.id != id) {
      this.name = service.servicesName;
      this.brief = service.servicesBrief;
      this.price = service.servicesPrice;
      this.edit = true;
      this.id = id;
    } else {
      this.editLoading = true;

      let data = new FormData();
      data.append('image', this.file);
      data.append('servicesName', this.name);
      data.append('servicesBrief', this.brief);
      data.append('servicesPrice', this.price);
      data.append('id', id);
      this.ReqsService.editServices(data).subscribe((Data: any) => {
        if (Data.message == 'DONE') {
          this.editLoading = false;

          this.id = '';
          this.edit = !this.edit;
          this.brief = '';
          this.name = '';
          this.price = '';
          this.file = '';
          this.SharedService.updateServices();
        }
      });
    }
  }
  deleteService(id: any) {
    this.ReqsService.deleteService(id).subscribe((data: any) => {
      if (data.message == 'deleted') {
        this.SharedService.updateServices();
      }
    });
  }
  showMore(data: any) {
    const Brief = document.querySelector('#Brief') as HTMLElement | any;
    const Desc = document.querySelector('#Desc') as HTMLElement | any;

    if (data.target.innerHTML == 'Show more') {
      Brief.classList.add('close');

      Desc.classList.remove('close');
    } else {
      Brief.classList.remove('close');

      Desc.classList.add('close');
    }
  }
addToCart(id:any){
  console.log(id);
  this.ReqsService.addToCart(id).subscribe((data:any)=>{
    console.log(data);

    if (data.message == 'added') {
this.SharedService.updateUserData()
    }
  })

}
}
