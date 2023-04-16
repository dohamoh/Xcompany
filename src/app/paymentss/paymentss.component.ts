import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ReqsService } from '../services/reqs.service';
import { SharedService } from '../services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-paymentss',
  templateUrl: './paymentss.component.html',
  styleUrls: ['./paymentss.component.scss']
})
export class PaymentssComponent {
  paymentHandler: any = null;
  style: any;
  userData: any;
  total: any;

  constructor(private SharedService: SharedService,
    private ReqsService: ReqsService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PaymentssComponent>,
  ) { this._totalAmount = data['totalAmount']; }

  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  _totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: any;

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
  ngOnInit() {
    this.SharedService.currentUserData.subscribe((data: any) => {
      this.userData = data;
      this.subTotal();
    });
    // this.invokeStripe();
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }
  ngAfterViewInit() {
    this.initiateCardElement();
  }
  initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { cardStyle });
    // this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }
  onChange({ error }:any) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }
  async createStripeToken() {
    const { token, error } = await stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }
  onSuccess(token: any) {
    this.dialogRef.close({ token });
  }
  onError(error: any) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}

  // initializePayment(amount: number) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac',
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log({ stripeToken })
  //       alert('Stripe token generated!');
  //     }
  //   });

  //   paymentHandler.open({
  //     name: 'FreakyJolly',
  //     description: 'Buying a Hot Coffee',
  //     amount: amount * 100
  //   });
  // }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement("script");
  //     script.id = "stripe-script";
  //     script.type = "text/javascript";
  //     script.src = "https://checkout.stripe.com/checkout.js";
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken)
  //           alert('Payment has been successfull!');
  //         }
  //       });
  //     }
  //     window.document.body.appendChild(script);
  //   }
  // }
