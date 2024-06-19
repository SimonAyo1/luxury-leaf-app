import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../../shared/data/slider";
import { Product } from "../../../../shared/classes/product";
import { ProductService } from "../../../../shared/services/product.service";
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";

@Component({
  selector: "app-product-left-sidebar",
  templateUrl: "./product-left-sidebar.component.html",
  styleUrls: ["./product-left-sidebar.component.scss"],
})
export class ProductLeftSidebarComponent implements OnInit {
  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  private init_price: number = 0;
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  selectedColors: string[] = [];
  selectedSizes: { size: string; price: number }[] = [];

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService
  ) {
    this.route.data.subscribe((response) => {
      this.product = response.data;
      this.init_price = this.product?.price;
    });
  }

  ngOnInit(): void {}

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color);
      }
    }
    return uniqColor;
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size);
      }
    }
    return uniqSize;
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: Product) {
    console.log(
      product,
      "product................................................................"
    );
    console.log(
      this.selectedColors,
      "selectedColors................................................................"
    );
    console.log(
      this.selectedSizes,
      "selectedSize................................................................"
    );
    product.colors = this.selectedColors;
    product.sizes = this.selectedSizes;
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status) this.router.navigate(["/store/cart"]);
  }
  onColorChange(event: any) {
    const color = event.target.value;
    if (event.target.checked) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter((c) => c !== color);
    }
  }
  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status) this.router.navigate(["/store/checkout"]);
  }

  onSizeChange(event: any) {
    const size = event.target.value;
    if (event.target.checked) {
      const pr = this.product?.sizes?.filter((s) => s.size == size)[0];
      this.selectedSizes.push({
        price: Number(pr?.price),
        size: pr?.size,
      });
    } else {
      this.selectedSizes = this.selectedSizes.filter((s) => s.size != size);
    }
    this.product.price = 0;
    this.selectedSizes?.forEach((s) => (this.product.price += s.price));

    if (this.selectedSizes?.length == 0) {
      this.product.price = this.init_price;
    }
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  @HostListener("contextmenu", ["$event"])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener("mousedown", ["$event"])
  onMouseDown(event: MouseEvent) {
    if (event.button === 2) {
    }
  }
}
