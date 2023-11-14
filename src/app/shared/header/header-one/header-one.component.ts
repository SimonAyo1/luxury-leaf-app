import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/logos/luxury-logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false

  public stick: boolean = false;
  isLoggedIn: boolean
  constructor(private afAuth: Auth) {
    this.afAuth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user
      console.log(this.isLoggedIn, user)
    });
  }

  ngOnInit(): void {


  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.screenY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

}
