import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.modal';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/header.service';
import { StoreService } from 'src/app/services/store.service';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 250, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;
  idDrawerOpen = true;
  opened = false;

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private headerService: HeaderService,
    private responsive: BreakpointObserver
  ) {
    headerService.getHideSideMenu().subscribe((value) => {
      this.opened = value;
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      if (result.matches) {
        this.cols = 1;
      }
    });
    this.responsive.observe(Breakpoints.TabletPortrait).subscribe((result) => {
      if (result.matches) {
        this.cols = 3;
      }
    });
    this.responsive.observe(Breakpoints.Large).subscribe((result) => {
      if (result.matches) {
        this.cols = 5;
      }
    });
  }
  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products.products;
        this.sortProducts(_products.products);
      });
  }

  onColumnsCountChange(conslNum: number): void {
    this.cols = conslNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.images[0],
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  sortProducts(_products: Product[]) {
    if (this.sort === 'asc') {
      return _products.sort((a, b) => a.price - b.price);
    } else {
      return _products.sort((a, b) => b.price - a.price);
    }
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
