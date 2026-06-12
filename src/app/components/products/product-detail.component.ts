import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@models/product.interface';
import { ImageCarousel } from '../shared/image-carousel.component';
import { StarRating } from '../shared/star-rating.component';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [ImageCarousel, StarRating, CurrencyPipe],
  templateUrl: 'product-detail.component.html',
})
export class ProductDetail {
  private cartService = inject(CartService);

  readonly product = input.required<Product>();

  protected readonly cartItem = computed(() =>
    this.cartService.items().find((item) => item.product.id === this.product().id),
  );

  protected readonly isRemoving = computed(() =>
    this.cartService.removingItems().has(this.product().id),
  );

  protected onAddToCart(): void {
    this.cartService.add(this.product());
  }

  protected onIncrement(): void {
    this.cartService.add(this.product());
  }

  protected onDecrement(): void {
    this.cartService.updateQuantity(this.product().id, -1);
  }
}
