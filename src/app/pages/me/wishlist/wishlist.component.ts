import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/classes/product";
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  isLoading: boolean = true
  public products: Product[] = [];

  constructor(private router: Router,
    public productService: ProductService, private notification: NotificationService) {
    notification.startSpinner()
    setTimeout(() => {
      this.productService.wishlistItems.subscribe(response => {
        this.products = response
        notification.hideSpinner()
        this.isLoading = false
      });

    },3000)
  }

  ngOnInit(): void {
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if (status) {
      this.router.navigate(['/store/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

}
