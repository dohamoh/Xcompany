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
  paymentHandler: any = null;
  success: boolean = false;
  failure: boolean = false;

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
    this.invokeStripe()
  }
  close() {
    this.SharedService.switchCartValue();
  }
  subTotal() {
    let total = 0;
    for (let i = 0; i < this.userData.cartSchema?.length; i++) {
      const element = this.userData.cartSchema[i].productId.servicesPrice;


      total += element;
    }
    this.total = total
  }
  removeFromCart(id: any) {
    this.ReqsService.removeFromCart(id).subscribe((data: any) => {


      if (data.message == 'removed') {
        this.SharedService.updateUserData();
      }
    });
  }
  clearCart() {
    this.ReqsService.clearCart().subscribe((data: any) => {


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

      let data = {
        clientId: userId,
        service: element.productId?._id
      }
      this.ReqsService.addOrder(data).subscribe((data: any) => {
      })
    }

  }
  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken })
        let email = stripeToken.stripeToken
        paymentStripe(stripeToken, email)
      }
    });
    const paymentStripe = (stripeToken: any, email: any) => {
      this.ReqsService.processPayment(stripeToken, (this.total * 100), email).subscribe((data: any) => {
        console.log(data);
        if (data.data == "success") {
          this.checkOut()
          this.success = true
        } else {
          this.failure = true
        }
      })
    }
    paymentHandler.open({
      name: 'velocity services',
      description: 'buying a service',
      amount: amount * 100
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }
}
