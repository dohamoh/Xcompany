import { ReqsService } from './../../services/reqs.service';
import { SharedService } from 'src/app/services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  style: any;
  userData: any;
  total: any;
  constructor(
    private SharedService: SharedService,
    private ReqsService: ReqsService
  ) {
    this.SharedService.cartValue.subscribe((data: any) => {
      this.style = data;
    });
  }
  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
      this.subTotal();
    });
  }
  close() {
    this.SharedService.switchCartValue();
  }
  subTotal() {
    let total = 0;
    for (let i = 0; i < this.userData.cartSchema?.length; i++) {
      const element = this.userData.cartSchema[i].productId.servicesPrice;
      console.log(element);

      total += element;
    }
    this.total = total;
  }
  removeFromCart(id: any) {
    this.ReqsService.removeFromCart(id).subscribe((data: any) => {
      console.log(data);

      if (data.message == 'removed') {
        this.SharedService.updateUserData();
      }
    });
  }
  clearCart() {
    this.ReqsService.clearCart().subscribe((data: any) => {
      console.log(data);

      if (data.message == 'cleared') {
        this.SharedService.updateUserData();
      }
    });
  }
  checkOut() {
    let userId = this.userData._id
    let cart = this.userData.cartSchema
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      console.log(element);
      let data = {
        clientId: userId,
        service: element.productId?._id
      }
      this.ReqsService.addOrder(data).subscribe((data: any) => {
        console.log(data);
      })
    }

  }
}
