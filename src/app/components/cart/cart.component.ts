import { SharedService } from 'src/app/services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  style: any;
  constructor(private SharedService: SharedService) {
    this.SharedService.cartValue.subscribe((data: any) => {
      this.style = data;
    });
  }
  close(){
    this.SharedService.switchCartValue()
  }
}
