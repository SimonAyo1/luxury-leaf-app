import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions,
  // PaymentIntent
} from '@stripe/stripe-js';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  // @ViewChild(StripePaymentElementComponent, { static: false })
  // paymentElement: StripePaymentElementComponent;
  @Input() amount: number
  @Input() checkoutForm: any
  @Input() description: string
  @Output() closeEvent = new EventEmitter<string>()
  @Output() paymentStatus = new EventEmitter<boolean>()


  // elementsOptions: StripeElementsOptions = {
  //   locale: 'en'
  // };
  paying: boolean
  public payPalConfig ? : IPayPalConfig;

  constructor(private stripeService: StripeService, private orderService: OrderService, private notify: NotificationService) { }

  ngOnInit(): void {
      this.initConfig();
  
    // this.orderService.checkoutSession(this.amount, this.description).subscribe((pi) => {
    //   this.elementsOptions.clientSecret = pi.client_secret;
   

    // })
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.amount.toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.amount.toString()
                        }
                    }
                },
                // items: [{
                //     name: 'Enterprise Subscription',
                //     quantity: '1',
                //     category: 'DIGITAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'EUR',
                //         value: '9.99',
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                // console.log('onApprove - you can get full order details inside onApprove: ', details);
                 
              });

        },
        onClientAuthorization: (data) => {
          this.paymentStatus.emit(true)

            // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.paymentStatus.emit(false)

        },
        onError: err => {
            // console.log('OnError', err);
            this.paymentStatus.emit(false)
            this.notify.errorMessage(err)

        },
        onClick: (data, actions) => {
            // console.log('onClick', data, actions);
        }
    };
}
  handleModalClose() {
    this.closeEvent.emit("close")
  }

  // Stripe Payment Gateway
  // stripeCheckout() {
  //   this.notify.startSpinner()
  //   this.paying = true;
  //   this.stripeService.confirmPayment({
  //     elements: this.paymentElement.elements,
  //     confirmParams: {
  //       payment_method_data: {
  //         billing_details: {
  //           name: this.checkoutForm.name,
  //           email: this.checkoutForm.email,
  //           address: {
  //             line1: this.checkoutForm.address || '',
  //             postal_code: this.checkoutForm.postalcode || '',
  //             city: this.checkoutForm.state || '',
  //           }
  //         }
  //       }
  //     },
  //     redirect: 'if_required'
  //   })
  //     .subscribe(result => {
  //       this.paying = false;
  //       console.log('Result', result);
  //       if (result.error) {
  //         // Show error to your customer (e.g., insufficient funds)
  //         this.paymentStatus.emit(false)
  //         console.log({ success: false, error: result.error.message });
  //         this.notify.hideSpinner()
  //         this.notify.warningMessage(result.error.message)
  //       } else {
  //         // The payment has been processed!
  //         if (result.paymentIntent.status === 'succeeded') {
          
  //           this.notify.hideSpinner()
  //           this.paymentStatus.emit(true)
  //         }
  //       }
  //     })
  // }

}

