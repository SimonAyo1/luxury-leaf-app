import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  email: string
  constructor(private _auth: AuthService, private notification: NotificationService) { }
  changePass() {
    if (!this.email) {
      this.notification.errorMessage("Please enter your email address")
      return
    }
    this._auth.resetPassword(this.email)
  }
  ngOnInit(): void {
  }

}
