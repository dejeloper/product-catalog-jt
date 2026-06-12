import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@models/product.interface';
import { ImageCarousel } from './image-carousel.component';
import { StarRating } from './star-rating.component';

@Component({
  selector: 'app-product-detail',
  imports: [ImageCarousel, StarRating, CurrencyPipe],
  templateUrl: 'product-detail.component.html',
})
export class ProductDetail {
  readonly product = input.required<Product>();
}
