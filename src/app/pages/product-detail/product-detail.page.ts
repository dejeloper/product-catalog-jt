import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError, finalize, of} from 'rxjs';
import {CurrencyPipe} from '@angular/common';
import {ProductService} from '@services/product.service';
import {Product} from '@models/product.interface';

@Component({
  selector: 'product-detail',
  imports: [CurrencyPipe],
  templateUrl: 'product-detail.page.html',
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  readonly product = signal<Product | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);

    this.productService
      .getProductById(id)
      .pipe(
        catchError((err) => {
          this.error.set(err.message ?? 'Error al cargar el producto');
          return of(null);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((res) => this.product.set(res));
  }

  get stars(): string[] {
    const rating = Math.round(this.product()?.rating ?? 0);
    return Array(5)
      .fill('')
      .map((_, i) => (i < rating ? '★' : '☆'));
  }
}
