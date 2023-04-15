import { SharedService } from 'src/app/services/shared.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import * as AOS from 'aos';
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 300, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

@Component({
  selector: 'app-our-clients',
  templateUrl: './our-clients.component.html',
  styleUrls: ['./our-clients.component.scss'],
})
export class OurClientsComponent implements OnInit {
  displayClient: any = '';
  user: any = '';
  dataArr: any;
  openNum: any;

  constructor(private SharedService: SharedService) {}
  ngOnInit(): void {
    this.SharedService.currentClients.subscribe((data: any) => {
      this.dataArr = data;
    });
  }
  disClient(i: any) {
    this.openNum = i;

    setTimeout(() => {
      const div = document.querySelector(`#details${i}`) as HTMLElement | any;
      for (let i = 0; i < div.classList.length; i++) {
        const element = div.classList[i];
        if (element == 'close') {
        return div.classList.replace('close', 'details');
        }
      }
      div.classList.replace('details', 'close');
      this.openNum = '';
    }, 1);

  }
}
