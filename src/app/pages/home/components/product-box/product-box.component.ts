import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.modal';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  mobileScreenSize = false;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      if (result.matches) {
        this.mobileScreenSize = true;
      } else {
        this.mobileScreenSize = false;
      }
    });
  }
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
