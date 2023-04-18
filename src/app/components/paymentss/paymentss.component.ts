import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ReqsService } from '../../services/reqs.service';
import { SharedService } from '../../services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stripe, StripeCardElement } from '@stripe/stripe-js'
// const stripePromise = Stripe('pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac');

@Component({
  selector: 'app-paymentss',
  templateUrl: './paymentss.component.html',
  styleUrls: ['./paymentss.component.scss']
})
export class PaymentssComponent implements OnInit {
  paymentHandler: any = null;
  token:any;
  userData: any;
  total: any;

  constructor(private ReqsService: ReqsService, private SharedService: SharedService) { }
  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
      this.subTotal();
    });
    this.invokeStripe()
  }
  removeFromCart(id: any) {
    this.ReqsService.removeFromCart(id).subscribe((data: any) => {
      console.log(data);

      if (data.message == 'removed') {
        this.SharedService.updateUserData();
      }
    });
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

    makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken })
        paymentStripe(stripeToken)
        alert('Stripe token generated!');
      }
    });

    const paymentStripe = (stripeToken:any) => {
      // if (localStorage.getItem('userToken')){
      //   this.token = localStorage.getItem('userToken')
      // }
      this.ReqsService.processPayment(stripeToken,this.total).subscribe((data:any) => {
        console.log(data ,  'rrr');
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

  //  async onSubmit() {
  //   const stripe = await stripePromise;
  //   const cardElement = stripe.elements().getElement('cardNumber');

  //   const { paymentMethod, error } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: cardElement,
  //     billing_details: {
  //       name: this.cardHolderName
  //     }
  //   });

  //   if (error) {
  //     console.error(error);
  //   } else {
  //     // Send payment method ID to backend
  //     this.ReqsService.processPayment(paymentMethod.id, this.amount)
  //       .subscribe((response:any) => {
  //         console.log(response);
  //       });
  //   }
  // }
