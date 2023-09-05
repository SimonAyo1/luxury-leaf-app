import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

import { UserI, UserService } from "src/app/shared/services/user.service";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.scss"],
})
export class MeComponent implements OnInit {
  public url: any;
  public openDashboard: boolean = false;
  public isActivated: boolean = false;
  public isLoading: boolean = false;
  public accountStatus: string
  constructor(private router: Router, private _auth: AuthService, private _notification: NotificationService, private _user: UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true
    this._notification.startSpinner()
    this._user?.user?.subscribe((data: UserI[]) => {
      this.isActivated = data[0]?.status == 'activated' || data[0]?.status == 'approved'
      this.accountStatus = data[0]?.status

      this._notification.hideSpinner()
      this.isLoading = false

    })
  }
  logout() {
    this._auth.signOut()
  }
  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }
}
