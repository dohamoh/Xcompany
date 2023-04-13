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
  styleUrls: ['./our-clients.component.scss']
})
export class OurClientsComponent implements OnInit {
  displayClient:any = ''
  user:any = ''
  dataArr = [
    {
      title: "Saudi Ministry Of Education",
      img1: "../../../assets/images/clients/education-website2.png",
      img2: "../../../assets/images/clients/education-remove-bg.png",
      dir: "right"
    },
    {
      title: "Alba",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/alba-removebg-preview.png",
      dir: "left"
    },
    {
      title: "Amcan",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/amcan.png",
      dir: "right"
    },
    {
      title: "Avalon",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/avalon-removebg-preview.png",
      dir: "left"
    },
    {
      title: "Batal",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/batal-removebg-preview.png",
      dir: "right"
    },
    {
      title: "Bon-Appetit",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/bon-appetit-removebg-preview.png",
      dir: "left"
    },
    {
      title: "ffff",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/future-removebg-preview.png",
      dir: "right"
    },
    {
      title: "gggg",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/jamjoom-remove-bg.png",
      dir: "left"
    },
    {
      title: "bbbbb",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/jason-removebg-preview.png",
      dir: "right"
    },
    {
      title: "ffff",
      img1: "../../../assets/images/clients/education-website1.png",
      img2: "../../../assets/images/clients/life-time-heal-removebg-preview.png",
      dir: "left"
    },
  ];
  ngOnInit(): void {
    // console.log(1 % 9);
    // this.SharedService.currentAllHalls.subscribe((data: any) => {
    //   console.log(data);
    //   this.allHalls = data

    //   this.SharedService.currentUserData.subscribe((data: any) => {
    //     this.userData = data;
    //     console.log(data);
    //   });
    // })
  }
}
