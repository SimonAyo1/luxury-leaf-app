import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  public checkoutForm: FormGroup;
  public isLoading: boolean
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'paypal';
  public amount: any;
  public paying = false;

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService,
    private _notification: NotificationService,
    private _user: UserService,
    private modal: NgbModal
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      // lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      // country: ['', Validators.required],
      city: ['', Validators.required],
      userId: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],

    })
    this.initConfig()
  }

  @ViewChild("paymentModal", { static: false }) paymentModal: TemplateRef<any>;


  ngOnInit(): void {
    this.isLoading = true
    this.productService.cartItems.subscribe(response => this.products = response).unsubscribe()
    this.getTotal.subscribe(amount => this.amount = amount).unsubscribe()
    this._notification.startSpinner()
    setTimeout(() => {
      this._user?.user?.subscribe((data: UserI[]) => {
        const user = data[0]
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
        this.isLoading = false
      }, (error) => {
        this.isLoading = false
      })
    }, 2000);


  }
  ngOnDestroy() {

  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }
  handleModalClose(event) {
    this.modal.dismissAll()
  }
  handlePaymentStatus(isSuccess: boolean) {

    if (isSuccess) {
      this.modal.dismissAll()
      this._user.awardPoint((this.amount), this._user.userId).then(() => {
        this.orderService.createOrder(this.products, this.checkoutForm.value, this.productService.generateUniqueID(), this.amount, "success", this.payment)
      }).catch(() => {
        this.orderService.createOrder(this.products, this.checkoutForm.value, this.productService.generateUniqueID(), this.amount, "success", this.payment)
      })
    }
  }
  open() {

    this.modal.open(this.paymentModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {

      },
      (reason) => {

      },
    );
  }

  handlePaymentType() {
    if (this.payment == 'paypal') {
      this.open()
      return
    }
    this._notification.startSpinner()
    this._user.user.subscribe((user) => {
      if (user[0]?.points >= 100 && user[0]?.points < 250) {
        const val = (user[0]?.points / 100) * 10
        if (this.amount <= val) {
          this._user.awardPoint(user[0]?.points - this.amount, user[0]?.id).then(() => {
            this._notification.hideSpinner()
            this.orderService.createOrder(this.products, this.checkoutForm.value, this.productService.generateUniqueID(), this.amount, "success", this.payment)
          })
        }

      }
      else if (user[0]?.points >= 250) {
        const val = (user[0]?.points / 250) * 35
        if (this.amount <= val) {
          this._user.awardPoint(user[0]?.points - this.amount, user[0]?.id).then(() => {
            this._notification.hideSpinner()
            this.orderService.createOrder(this.products, this.checkoutForm.value, this.productService.generateUniqueID(), this.amount, "success", this.payment)
          })
        }
      }
      else {
        this._notification.hideSpinner()
        this._notification.errorMessage("You don't have enough points to make this purchase!")
      }
    })
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
