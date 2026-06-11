import {Component, inject, OnInit, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {catchError, finalize, of} from 'rxjs';
import {ProductCard} from '@components/product-card.component';
import {Modal} from '@components/modal.component';
import {ProductService} from '@services/product.service';
import {Product} from '@models/product.interface';

@Component({
  selector: 'app-products',
  imports: [ProductCard, Modal, CurrencyPipe],
  templateUrl: 'products.page.html',
})
export class ProductsPage implements OnInit {
  private productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly modalOpen = signal(false);
  readonly selectedProduct = signal<Product | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService
      .getProducts()
      .pipe(
        catchError((err) => {
          this.error.set(err.message ?? 'Error al cargar productos');
          return of({products: [], total: 0, skip: 0, limit: 0});
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((res) => this.products.set(res.products));
  }

  openDetail(id: number): void {
    const product = this.products().find((p) => p.id === id);
    if (product) {
      this.selectedProduct.set(product);
      this.modalOpen.set(true);
    }
  }

  closeDetail(): void {
    this.modalOpen.set(false);
  }


}
