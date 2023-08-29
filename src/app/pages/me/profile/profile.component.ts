import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup

  user: UserI = null
  constructor(private formBuilder: FormBuilder, private _user: UserService, private _notification: NotificationService) {
    this.initiateForm()
  }
  initiateForm() {
    this.profileForm = this.formBuilder.group({
      id: [null],
      name: [null],
      phoneNumber: [null],
      address: [null],
      postalCode: [null],
      city: [null],
      state: [null]
    })
  }

  updateProfile() {
    this._notification.startSpinner()
    console.log(this.profileForm.value)
    this._user.updateuser(this.profileForm.value).then(() => {
      this._notification.hideSpinner()
      this._notification.successMessage("Updated succesfully!")
    }).catch((e) => {
      this._notification.hideSpinner()
      this._notification.errorMessage(e.code)
    })
  }
  // getUser() {
  //   this._userService.getUserById()
  // }
  ngOnInit(): void {
    this._notification.startSpinner()
    this._user?.user?.subscribe((data: UserI[]) => {
      const user = data[0]
      this.profileForm.patchValue({
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        state: user.state
      })

      this._notification.hideSpinner()
    })
  }

}
