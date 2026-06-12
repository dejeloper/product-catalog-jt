import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { ProductCard } from '@components/product-card.component';
import { ProductSort, SortField } from '@components/product-sort.component';
import { ProductDetail } from '@components/product-detail.component';
import { Modal } from '@components/modal.component';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product.interface';

@Component({
  selector: 'app-products',
  imports: [ProductCard, ProductSort, ProductDetail, Modal],
  templateUrl: 'products.page.html'
})
export class ProductsPage implements OnInit {
  private productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly modalOpen = signal(false);
  readonly selectedProduct = signal<Product | null>(null);

  readonly skeletons = Array.from({ length: 10 });

  readonly sortBy = signal<SortField>('id');
  readonly sortAsc = signal(true);

  readonly sortOptions: readonly { key: SortField; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Nombre' },
    { key: 'price', label: 'Precio' },
    { key: 'rating', label: 'Rating' },
  ];

  readonly sortedProducts = computed(() => {
    const list = this.products();
    const field = this.sortBy();
    const asc = this.sortAsc();

    return [...list].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      const cmp =
        typeof aVal === 'string'
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return asc ? cmp : -cmp;
    });
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService
      .getProducts()
      .pipe(
        catchError((err) => {
          this.error.set(err.message ?? 'Error al cargar productos');
          return of([] as Product[]);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((products) => this.products.set(products));
  }

  toggleSort(field: SortField): void {
    if (this.sortBy() === field) {
      this.sortAsc.update((v) => !v);
    } else {
      this.sortBy.set(field);
      this.sortAsc.set(true);
    }
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
