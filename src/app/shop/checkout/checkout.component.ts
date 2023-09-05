import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'Stripe';
  public amount: any;

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService,
    private _notification: NotificationService,
    private _user: UserService) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      // lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(300)]],
      // country: ['', Validators.required],
      city: ['', Validators.required],
      userId: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this._notification.startSpinner()
    setTimeout(() => {
      this._user?.user?.subscribe((data: UserI[]) => {
        const user = data[0]
        console.log(user, "CHECKOUT")
        this.checkoutForm.patchValue({
          userId: user.id,
          name: user.name,
          phone: user.phoneNumber,
          address: user.address,
          email: user.email,
          postalcode: user.postalCode,
          city: user.city,
          state: user.state
        })
        this._notification.hideSpinner()
      }, (error) => {
        console.log(error, "CHECKOUT")
      })
    }, 2000);

    this.initConfig();


  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    // var handler = (<any>window).StripeCheckout.configure({
    //   key: environment.stripe_token, // publishble key
    //   locale: 'auto',
    //   token: (token: any) => {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    this.orderService.createOrder(this.products, this.checkoutForm.value, this.productService.generateUniqueID(), this.amount, "success", this.payment)
    //   }
    // });
    // handler.open({
    //   name: 'LuxryLeafM',
    //   description: 'LLM Store',
    //   amount: this.amount * 100
    // }) 
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    // this.payPalConfig = {
    //     currency: this.productService.Currency.currency,
    //     clientId: environment.paypal_token,
    //     createOrderOnClient: (data) => < ICreateOrderRequest > {
    //       intent: 'CAPTURE',
    //       purchase_units: [{
    //           amount: {
    //             currency_code: this.productService.Currency.currency,
    //             value: this.amount,
    //             breakdown: {
    //                 item_total: {
    //                     currency_code: this.productService.Currency.currency,
    //                     value: this.amount
    //                 }
    //             }
    //           }
    //       }]
    //   },
    //     advanced: {
    //         commit: 'true'
    //     },
    //     style: {
    //         label: 'paypal',
    //         size:  'small', // small | medium | large | responsive
    //         shape: 'rect', // pill | rect
    //     },
    //     onApprove: (data, actions) => {
    //         this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
    //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
    //         actions.order.get().then(details => {
    //             console.log('onApprove - you can get full order details inside onApprove: ', details);
    //         });
    //     },
    //     onClientAuthorization: (data) => {
    //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //     },
    //     onCancel: (data, actions) => {
    //         console.log('OnCancel', data, actions);
    //     },
    //     onError: err => {
    //         console.log('OnError', err);
    //     },
    //     onClick: (data, actions) => {
    //         console.log('onClick', data, actions);
    //     }
    // };
  }

}
