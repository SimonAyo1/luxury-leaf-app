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
  query,
  where,
  getDocs,
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
  state: string;
  points: number;
  status?: string;
  membership: {
    date: Date,
    type: string
  }
  referrals: {
    userId: string;
    name: string
    email: string
  }[],
  referrer?: string;
  links: {
    url: string;
    activated: boolean
  }[]
  wishlist: any[]
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
      this.userId = user?.uid
      console.log(user.uid)
      this.user = user?.uid ? this.getUserById(user.uid) : null
    });
  }


  // Get user by ID
  getUserById(userId: string): Observable<UserI[] | undefined> {
    const userQuery = query(this.userCollection, where('id', '==', userId));
    return new Observable(observer => {
      getDocs(userQuery).then(querySnapshot => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const userData = doc.data() as UserI;
          observer.next([userData]);
        } else {
          observer.next([]); // No matching document found
        }
      }).catch(error => {
        observer.error(error);
      });
    });
    // return collectionData(this.userCollection, { idField: userId });
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


  awardPoint(points: number, id: string) {
    console.log(points, "AWARD POINTS")
    const userDocRef = doc(this.userCollection, id);
    return updateDoc(userDocRef, { points });
  }
  encrypt(text, shift) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char.match(/[a-z]/i)) {
        let asciiOffset = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        let encryptedChar = String.fromCharCode((char.charCodeAt(0) - asciiOffset + shift) % 26 + asciiOffset);
        encryptedText += encryptedChar;
      } else {
        encryptedText += char; // Keep non-alphabetic characters as they are
      }
    }
    return encryptedText;
  }

  decrypt(encryptedText, shift) {
    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
      let char = encryptedText[i];
      if (char.match(/[a-z]/i)) {
        let asciiOffset = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        let decryptedChar = String.fromCharCode((char.charCodeAt(0) - asciiOffset - shift + 26) % 26 + asciiOffset);
        decryptedText += decryptedChar;
      } else {
        decryptedText += char; // Keep non-alphabetic characters as they are
      }
    }
    return decryptedText;
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
