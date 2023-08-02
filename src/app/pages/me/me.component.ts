import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd,  } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.scss"],
})
export class MeComponent implements OnInit {
  public url: any;
  public openDashboard: boolean = false;

  constructor(private router: Router, private _auth: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit(): void {}
  logout() {
    this._auth.signOut()
  }
  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }
}
