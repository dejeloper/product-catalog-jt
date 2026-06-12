import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@models/product.interface';
import { ImageCarousel } from './image-carousel.component';
import { StarRating } from './star-rating.component';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [ImageCarousel, StarRating, CurrencyPipe],
  templateUrl: 'product-detail.component.html',
})
export class ProductDetail {
  private cartService = inject(CartService);

  readonly product = input.required<Product>();

  protected onAddToCart(): void {
    this.cartService.add(this.product());
  }
}
