import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public openDashboard: boolean = false;
  user: UserI = null
  greeting: string = ""
  constructor(private _user: UserService, private _notification: NotificationService) { }

  ngOnInit(): void {
    this._notification.startSpinner()
    this.greeting = this.getGreeting()
    this._user.user.subscribe((data: UserI[]) => {
      this.user = data[0]
      this._notification.hideSpinner()
      console.log(this.user)
    })
  }
  getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

}
