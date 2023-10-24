import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/classes/order';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[]
  deliveryStatusOptions: string[] = ['Pending', 'Shipped', 'Delivered'];

  constructor(private orderService: OrderService, private _user: UserService, private notification: NotificationService) { }
  getStatusClass(deliveryStatus: string) {
    switch (deliveryStatus) {
      case 'Pending':
        return 'text-warning'; // CSS class for yellow text
      case 'Shipped':
        return 'text-info';    // CSS class for blue text
      case 'Delivered':
        return 'text-success'; // CSS class for green text
      default:
        return '';              // Default CSS class
    }
  }
  getUserOrders(userId: string) {
    this.notification.startSpinner()

    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders: any) => {
        this.orders = orders;
        console.log(orders)
        this.notification.hideSpinner()
      },
      error: (error: any) => {
        console.log(error);
        this.notification.hideSpinner()

      }
    })
  }

  ngOnInit(): void {
    this._user?.user?.subscribe((data: UserI[]) => {
      const user = data[0]
      this.getUserOrders(user.id)

    })
  }

}
