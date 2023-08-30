import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserI, UserService } from "src/app/shared/services/user.service";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public isActivated: boolean = false;
  public isLoading: boolean = false;
  public accountStatus: string

  public url: any;

  constructor(private router: Router, private _notification: NotificationService, private _user: UserService) {
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
      this.isActivated = data[0].status === 'activated' || data[0].status === 'approved'

      this.accountStatus = data[0].status

      this._notification.hideSpinner()

      this.isLoading = false


    })
  }

}
