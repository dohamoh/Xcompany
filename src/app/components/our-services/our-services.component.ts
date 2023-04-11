import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent {
  ngOnInit(): void {
    setTimeout(() => {
      this.reveal()
    }, 1);
  }
  @HostListener('window:scroll', [])
  reveal() {



    var elements = document.querySelectorAll<HTMLElement>('.desc') ;
    var imgs = document.querySelectorAll<HTMLElement>('.img') ;



    for (var i = 0; i < elements.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = elements[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        elements[i].classList.add('descDef');
        imgs[i].classList.add('imgAni');


      } else {
        elements[i].classList.remove('descDef');
        imgs[i].classList.remove('imgAni');

      }
    }
  }
}
