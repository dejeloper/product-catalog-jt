import {Component, input, output} from '@angular/core';
import {Product} from '@models/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly clicked = output<number>();
}
