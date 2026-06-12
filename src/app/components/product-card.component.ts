import { Component, inject, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@models/product.interface';
import { StarRating } from './star-rating.component';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [StarRating, CurrencyPipe],
  templateUrl: 'product-card.component.html',
})
export class ProductCard {
  private cartService = inject(CartService);

  readonly product = input.required<Product>();
  readonly clicked = output<number>();

  protected onActivate(event: Event): void {
    event.preventDefault();
    this.clicked.emit(this.product().id);
  }

  protected onAddToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.add(this.product());
  }
}
