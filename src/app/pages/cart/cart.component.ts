import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 250,
        quantity: 2,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  mobileScreenSize = false;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private responsive: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      if (result.matches) {
        this.mobileScreenSize = true;
      } else {
        this.mobileScreenSize = false;
      }
    });

    this.invokeStripe();
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart() {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MgqC7GXNnCDnhTt8Pen7A388ePPccB87wL6OXB7EJuDbfvd16azqGEshYygSJniqHFK9gOnskqRw4KDDWIuQuks00in7lIVO6',
      locale: 'auto',
      token: function (stripeToken: any) {
        alert('Stripe token generated');
      },
    });

    paymentHandler.open({
      name: 'Ashop payment',
      description: `${this.cart.items.length} Products Added`,
      amount: this.cartService.getTotal(this.cart.items) * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
