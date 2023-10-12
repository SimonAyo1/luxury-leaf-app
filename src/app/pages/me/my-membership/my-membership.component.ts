import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-membership',
  templateUrl: './my-membership.component.html',
  styleUrls: ['./my-membership.component.scss']
})
export class MyMembershipComponent implements OnInit {
  @ViewChild("paymentModal", { static: false }) paymentModal: TemplateRef<any>;
  user: UserI
  checkoutForm: any
  successfullPayment: boolean = false
  constructor(private _user: UserService, private modal: NgbModal, private notify: NotificationService) {
    this._user?.user?.subscribe((e) => {
      this.user = e[0]
      console.log(this.user, "UEEEEEEEEEE")
      this.checkoutForm = {
        name: e[0].name,
        email: e[0].email,
        addrress: e[0].address,
        state: e[0].state,
        postalcode: e[0].postalCode
      }
    })
  }

  ngOnInit(): void {
  }
  isDateAboveOneMonth(dateToCheck) {
    if (!dateToCheck) {
      return true;
    }
    const dateToCheckFormatted = new Date(dateToCheck)
    dateToCheckFormatted.setMonth(dateToCheckFormatted.getMonth() + 1)
    const currentDate = new Date()

    // Convert both dates to the same format for comparison

    console.log(dateToCheckFormatted, currentDate)
    return dateToCheckFormatted < currentDate;
  }

  handleModalClose(event) {
    this.modal.dismissAll()
  }
  handlePaymentStatus(isSuccess: boolean) {
    if (isSuccess) {
      this.modal.dismissAll()
      this.notify.startSpinner()
      this._user.updateuser({
        ...this.user,
        membership: {
          date: new Date().toISOString().split('T')[0],
          type: "membership"
        },
      }).then(() => {
        this.notify.hideSpinner()
        this.notify.successMessage("Your membership status has been activated! Thank you.")
        this.successfullPayment = true

      }).catch(() => {
        this.notify.hideSpinner()
        this.notify.errorMessage("Payment received, but we encountered a problem while trying to update your data")
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
}
