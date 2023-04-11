import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  switch(id:any){
  var elements = document.querySelectorAll<HTMLElement>('.page') ;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.classList.add('d-none')
  }
  id.classList.remove('d-none')
}
}
