import { Component, OnInit } from '@angular/core';

import { UserI, UserService } from "src/app/shared/services/user.service";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public isActivated: boolean = false;
  public isLoading: boolean = false;
  public accountStatus: string
  constructor( private _notification: NotificationService, private _user: UserService) { }

  ngOnInit(): void {
    this.isLoading = true
    this._notification.startSpinner()
    this._user?.user?.subscribe((data: UserI[]) => {
      this.isActivated = data[0].status === 'activated' || data[0].status === 'approved'

      this.accountStatus = data[0].status

      this._notification.hideSpinner()

      this.isLoading = false


    })
  }

}
