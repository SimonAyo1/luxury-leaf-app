import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  DocumentData,
} from '@angular/fire/firestore';


import { Observable } from 'rxjs';

// user model
export interface UserI {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  membership: {
    date: Date,
    type: string
  }
  referrals: {
    userId: string;
    name: string
    email: string
  }[]
}


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: Observable<UserI[]>;
  private firestore: Firestore = inject(Firestore);
  public userId: any = null
  private userCollection: CollectionReference<DocumentData>;

  constructor(private _auth: Auth) {

    this.userCollection = collection(this.firestore, 'users');
    this._auth.onAuthStateChanged((user) => {
      this.userId = user.uid
      this.user = this.getUserById(user.uid)
    });
  }


  // Get user by ID
  getUserById(userId: string): Observable<any> {
    return collectionData(this.userCollection, { idField: userId });
  }

  // Add a new user
  addUser(user: UserI): Promise<any> {
    const { id, ...userData } = user;
    const userDocRef = doc(this.userCollection, id);
    return setDoc(userDocRef, user);
  }

  // Update a user
  updateuser(user: UserI): Promise<void> {
    const { id, ...userData } = user;
    const userDocRef = doc(this.userCollection, id);
    return updateDoc(userDocRef, { ...userData });
  }

  // Delete a user
  deleteuser(userId: string): Promise<void> {
    const userDocRef = doc(this.userCollection, userId);
    return deleteDoc(userDocRef);
  }





  generateUniqueID(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;

    let uniqueID = '';

    // Add random characters to the uniqueID
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters.charAt(randomIndex);
    }

    // Add timestamp to ensure uniqueness
    const timestamp = Date.now().toString();
    uniqueID += timestamp;

    return uniqueID;
  }


}
