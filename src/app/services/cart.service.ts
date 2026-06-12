import { Injectable, signal, computed } from '@angular/core';
import { Product } from '@models/product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  readonly count = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly total = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  );

  add(product: Product): void {
    this.items.update((list) => {
      const existing = list.find((item) => item.product.id === product.id);
      if (existing) {
        return list.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...list, { product, quantity: 1 }];
    });
  }

  remove(productId: number): void {
    this.items.update((list) =>
      list.filter((item) => item.product.id !== productId),
    );
  }

  clear(): void {
    this.items.set([]);
  }
}
