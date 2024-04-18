import { Injectable } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  user,
} from "@angular/fire/auth";
import { User } from "firebase/auth";
import { Observable, BehaviorSubject } from "rxjs"; // Use BehaviorSubject instead of Subject
import { map, take } from "rxjs/operators";
import { NotificationService } from "./notification.service";
import { Router } from "@angular/router";
import { UserService, UserI } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>; // Use BehaviorSubject
  user$: Observable<User | null>;

  constructor(
    private afAuth: Auth,
    private notification: NotificationService,
    private router: Router,
    private _user: UserService
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      this.userSubject = new BehaviorSubject<User | null>(user);
      this.user$ = this.userSubject.asObservable();
      console.log("1");
    });
  }

  // Sign up with email and password
  async signUp(form: any, refId: string, currentPoint: number) {
    this.notification.startSpinner();
    let new_user: UserI = {
      name: form?.name,
      id: "",
      email: form?.email,
      address: form?.address,
      birthdate: form?.birthdate,
      postalCode: form?.postal_code,
      phoneNumber: form?.phone_number,
      membership: null,
      referrals: null,
      referrer: refId,
      socialHandle: form?.social_handle,
      points: 0,
      wishlist: null,
      links: null,
      city: '',
      state: '',
    };
    return createUserWithEmailAndPassword(
      this.afAuth,
      form?.email,
      form?.password
    )
      .then((credential) => {
        new_user["id"] = credential?.user?.uid;
        this._user.addUser(new_user).then(() => {
          this.userSubject.next(credential?.user);
          let pointToGive = currentPoint ? currentPoint + 5 : 5;
          this._user.awardPoint(pointToGive, refId).then(() => {
            this.router.navigate(["/"]);
            this.notification.hideSpinner();
          });
        });
      })
      .catch((error) => {
        this.notification.hideSpinner();
        this.notification.errorMessage(error.code);
        throw new Error(error.code);
      });
  }

  //CHange password

  resetPassword(email) {
    this.notification.startSpinner();
    return sendPasswordResetEmail(this.afAuth, email)
      .then(() => {
        this.notification.hideSpinner();
        this.notification.successMessage(
          `Password reset link sent to ${email}`
        );
      })
      .catch((e) => {
        this.notification.hideSpinner();
        this.notification.errorMessage(e.code);
      });
  }
  changePassword(newPassword) {
    updatePassword(this._user.user[0], newPassword)
      .then(() => {
        this.notification.hideSpinner();
        this.notification.successMessage("Password updated!");
      })
      .catch((e) => {
        this.notification.hideSpinner();

        this.notification.errorMessage(e.code);
      });
  }
  // Sign in with email and password
  async signIn(email: string, password: string) {
    this.notification.startSpinner();
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((credential) => {
        this.notification.hideSpinner();
        this.userSubject.next(credential.user); // Manually emit the authenticated user
        this.router.navigate(["/store/collections"]);
      })
      .catch((error) => {
        this.notification.hideSpinner();
        this.notification.errorMessage(error.code);
        console.log(error.code);
        throw new Error(error.message);
      });
  }

  // Sign out
  signOut() {
    this.notification.startSpinner();
    this.afAuth
      .signOut()
      .then(() => {
        localStorage.clear();
        this.notification.hideSpinner();
        this.router.navigate(["/auth"]);
      })
      .catch((e) => {
        this.notification.hideSpinner();
      });
  }

  // Get the current authenticated user
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
