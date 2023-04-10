import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @HostListener('window:scroll', ['$event'])
  rotateImageOnScroll(event: Event) {
     const scrollPosition = window.scrollY;
     const rotation = scrollPosition * 0.1; // adjust this value as needed
     const image = document.querySelector('.bgImg2') as HTMLImageElement;
     const image2 = document.querySelector('.bgImg3') as HTMLImageElement;
     image.style.transform = `rotate(${rotation}deg)`;
     image2.style.top = `${scrollPosition * -0.10}px`; // adjust this value as needed
    //  image2.style
  }
}
