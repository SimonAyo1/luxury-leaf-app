import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit {

  public orderDetails: Partial<Order> = {};
  isLoading: boolean = true
  constructor(public productService: ProductService,
    private orderService: OrderService, private route: ActivatedRoute, private notify: NotificationService) { }

  ngOnInit(): void {
    this.notify.startSpinner()
    this.route.params.subscribe((params) => {
      this.orderService.getOrderById(params.orderId).subscribe(response => {
      
        // if (!response) {
        //   this.router.navigate(['/'])
        //   return
        // }
        this.notify.hideSpinner()
        this.orderDetails = response
        console.log(this.orderDetails)
        this.isLoading = false
      });
    })
  }

  ngAfterViewInit() {

  }

}
