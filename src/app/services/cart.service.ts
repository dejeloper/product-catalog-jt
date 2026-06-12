import {Injectable, signal, computed, effect} from '@angular/core';
import {Product} from '@models/product.interface';

const STORAGE_KEY = 'cart_items';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({providedIn: 'root'})
export class CartService {
  readonly items = signal<CartItem[]>([]);

  readonly removingItems = signal<Set<number>>(new Set());

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: CartItem[] = JSON.parse(saved);
        this.items.set(parsed.filter((i) => i.quantity > 0));
      } catch { /* ignore corrupt data */ }
    }

    effect(() => {
      const data = this.items();
      const clean = data.filter((i) => i.quantity > 0);
      if (clean.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
      }
    });
  }

  readonly stockLimitReached = computed<ReadonlyMap<number, boolean>>(() => {
    const result = new Map<number, boolean>();
    for (const item of this.items()) {
      if (item.quantity >= item.product.stock) {
        result.set(item.product.id, true);
      }
    }
    return result;
  });

  private pendingRemovals = new Map<number, ReturnType<typeof setTimeout>>();

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
    this.cancelRemoveTimer(product.id);
    this.items.update((list) => {
      const existing = list.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return list;
        return list.map((item) =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      if (product.stock <= 0) return list;
      return [...list, {product, quantity: 1}];
    });
  }

  updateQuantity(productId: number, delta: number): void {
    this.items.update((list) => {
      const item = list.find((i) => i.product.id === productId);
      if (!item) return list;

      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        this.startRemoveTimer(productId);
        return list.map((i) =>
          i.product.id === productId ? {...i, quantity: 0} : i,
        );
      }
      if (delta > 0 && newQty > item.product.stock) return list;
      this.cancelRemoveTimer(productId);
      return list.map((i) =>
        i.product.id === productId ? {...i, quantity: newQty} : i,
      );
    });
  }

  remove(productId: number): void {
    this.cancelRemoveTimer(productId);
    this.items.update((list) =>
      list.filter((item) => item.product.id !== productId),
    );
  }

  clear(): void {
    this.pendingRemovals.forEach((timer) => clearTimeout(timer));
    this.pendingRemovals.clear();
    this.removingItems.set(new Set());
    this.items.set([]);
  }

  private startRemoveTimer(productId: number): void {
    this.removingItems.update((s) => new Set(s).add(productId));
    const existing = this.pendingRemovals.get(productId);
    if (existing) clearTimeout(existing);
    const timer = setTimeout(() => {
      this.internalRemove(productId);
    }, 5000);
    this.pendingRemovals.set(productId, timer);
  }

  private cancelRemoveTimer(productId: number): void {
    const timer = this.pendingRemovals.get(productId);
    if (timer) {
      clearTimeout(timer);
      this.pendingRemovals.delete(productId);
    }
    this.removingItems.update((s) => {
      const next = new Set(s);
      next.delete(productId);
      return next;
    });
  }

  private internalRemove(productId: number): void {
    this.remove(productId);
  }
}
