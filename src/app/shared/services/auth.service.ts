import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable, BehaviorSubject } from 'rxjs'; // Use BehaviorSubject instead of Subject
import { map, take } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { UserService, UserI } from './user.service';

@Injectable({
  providedIn: 'root',
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
      console.log("1")
    });
  }

  // Sign up with email and password
  async signUp(email: string, password: string, name: string) {
    this.notification.startSpinner()
    let new_user: UserI = {
      name,
      id: this._user.generateUniqueID(),
      email,
      address: '',
      city: '',
      postalCode: '',
      phoneNumber: '',
      membership: null,
      referrals: null
    }
    return createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((credential) => {
        credential.user

        this._user.addUser(new_user).then(() => {
          this.userSubject.next(credential.user)
          this.router.navigate(["/me"])
          this.notification.hideSpinner()
          this.notification.successMessage(`Welcome on board ${name}`)

        })

      })
      .catch((error) => {
        this.notification.hideSpinner()
        this.notification.errorMessage(error.code);
        throw new Error(error.code);
      });
  }

  // Sign in with email and password
  async signIn(email: string, password: string) {
    this.notification.startSpinner();
    return signInWithEmailAndPassword(this.afAuth, email, password)
      .then((credential) => {
        this.notification.hideSpinner();
        console.log(credential.user, 'credential');
        this.userSubject.next(credential.user); // Manually emit the authenticated user
        this.router.navigate(['/me']);
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
        this.notification.hideSpinner();
        this.router.navigate(['/auth']);
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
