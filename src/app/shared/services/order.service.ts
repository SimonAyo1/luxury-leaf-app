import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../classes/order';
import { collection, setDoc, doc, Firestore, CollectionReference, DocumentData, getDocs, query, where } from '@angular/fire/firestore';
import { NotificationService } from './notification.service';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);
  private orderCollection: CollectionReference<DocumentData>;
  BASE_URL = "http://localhost:3000"

  constructor(private router: Router, private notify: NotificationService, private product_service: ProductService, private http: HttpClient) {
    this.orderCollection = collection(this.firestore, 'orders');

  }
  public getOrderById(orderId: string): Observable<Order | undefined> {
    const orderQuery = query(this.orderCollection, where('orderId', '==', orderId));
    return new Observable(observer => {
      getDocs(orderQuery).then(querySnapshot => {
        if (!querySnapshot.empty) {
          const orderDoc = querySnapshot.docs[0];
          const orderData = orderDoc.data() as Order;
          observer.next(orderData);
        } else {
          observer.next(undefined); // No matching document found
        }
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  public getOrdersByUserId(userId: string): Observable<Order[] | undefined> {
    const orderQuery = query(this.orderCollection, where('userId', '==', userId));
    return new Observable(observer => {
      getDocs(orderQuery).then(querySnapshot => {
        if (!querySnapshot.empty) {
          const orderDoc = querySnapshot.docs;
          const orderData = orderDoc.map((doc) => {
            return doc.data() as Order;
          })
          observer.next(orderData);
        } else {
          observer.next(undefined); // No matching document found
        }
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }



  // Get Checkout Items
  public get checkoutItems(): Observable<any> {

    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any, paymentStatus: string, paymentMethod) {
    this.notify.startSpinner()
    var item: Order = {
      shippingDetails: details,
      product: product,
      orderId: orderId,
      totalAmount: amount,
      delivery_date: new Date(new Date().setDate(new Date().getDate() + 2)).toDateString(),
      time: new Date().toUTCString(),
      userId: details.userId,
      status: 'pending',
      deliveryStatus: 'pending',
      paymentStatus,
      paymentMethod
    };
    const orderDocRef = doc(this.orderCollection, orderId);

    return setDoc(orderDocRef, item).then((response) => {
      state.checkoutItems = item;
      this.http.post("https://luxuryleaf-api.vercel.app/api/order-mail", { email: details?.email, orderLink: `https://luxury-leaf-v2.vercel.app/store/checkout/success/${orderId}` }).subscribe({
        next: () => {
          this.router.navigate(['/store/checkout/success', orderId]);
          this.product_service.deleteCart()
          this.notify.hideSpinner()
        },
        error: () => {
          this.router.navigate(['/store/checkout/success', orderId]);
          this.product_service.deleteCart()
          this.notify.hideSpinner()
        }
      })
    }).catch((err) => {
      this.notify.hideSpinner()
    })

  }

  public checkoutSession(price: number, description: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/create-checkout-session`, {
      amount: price,
      description
    })
  }
}
