import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '@models/product.interface';

const makeProduct = (id: number, stock = 10): Product => ({
  id,
  title: `Product ${id}`,
  description: '',
  category: 'test',
  price: 100,
  rating: 4,
  stock,
  dimensions: { width: 10, height: 5, depth: 3 },
  reviews: [],
  images: [],
  thumbnail: '',
});

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.configureTestingModule({}).inject(CartService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('add', () => {
    it('adds a new product', () => {
      service.add(makeProduct(1));
      expect(service.items().length).toBe(1);
      expect(service.items()[0].quantity).toBe(1);
    });

    it('increments quantity for existing product', () => {
      service.add(makeProduct(1));
      service.add(makeProduct(1));
      expect(service.items()[0].quantity).toBe(2);
    });

    it('does not exceed stock limit', () => {
      service.add(makeProduct(1, 1));
      service.add(makeProduct(1, 1));
      expect(service.items()[0].quantity).toBe(1);
    });

    it('does not add product with stock 0', () => {
      service.add(makeProduct(1, 0));
      expect(service.items().length).toBe(0);
    });

    it('cancels remove timer when adding existing product', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      expect(service.removingItems().has(1)).toBe(true);
      service.add(makeProduct(1));
      expect(service.removingItems().has(1)).toBe(false);
      expect(service.items()[0].quantity).toBe(1);
      vi.useRealTimers();
    });
  });

  describe('updateQuantity', () => {
    it('increments quantity', () => {
      service.add(makeProduct(1));
      service.updateQuantity(1, 1);
      expect(service.items()[0].quantity).toBe(2);
    });

    it('decrements quantity', () => {
      service.add(makeProduct(1));
      service.add(makeProduct(1));
      service.updateQuantity(1, -1);
      expect(service.items()[0].quantity).toBe(1);
    });

    it('sets quantity to 0 and starts remove timer when reaching 0', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      expect(service.items()[0].quantity).toBe(0);
      expect(service.removingItems().has(1)).toBe(true);
      vi.useRealTimers();
    });

    it('treats negative delta as 0 and starts timer', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -5);
      expect(service.items()[0].quantity).toBe(0);
      expect(service.removingItems().has(1)).toBe(true);
      vi.useRealTimers();
    });

    it('does nothing for unknown product', () => {
      service.updateQuantity(999, 1);
      expect(service.items().length).toBe(0);
    });

    it('does not exceed stock on increment', () => {
      service.add(makeProduct(1, 2));
      service.add(makeProduct(1));
      service.updateQuantity(1, 1);
      expect(service.items()[0].quantity).toBe(2);
    });

    it('cancels remove timer when incrementing from 0', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      expect(service.removingItems().has(1)).toBe(true);
      service.updateQuantity(1, 1);
      expect(service.removingItems().has(1)).toBe(false);
      expect(service.items()[0].quantity).toBe(1);
      vi.useRealTimers();
    });
  });

  describe('remove', () => {
    it('removes product from items', () => {
      service.add(makeProduct(1));
      service.remove(1);
      expect(service.items().length).toBe(0);
    });

    it('cancels pending remove timer', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      expect(service.removingItems().has(1)).toBe(true);
      service.remove(1);
      expect(service.removingItems().has(1)).toBe(false);
      expect(service.items().length).toBe(0);
      vi.useRealTimers();
    });

    it('does nothing for unknown id', () => {
      service.add(makeProduct(1));
      service.remove(999);
      expect(service.items().length).toBe(1);
    });
  });

  describe('clear', () => {
    it('empties the cart', () => {
      service.add(makeProduct(1));
      service.add(makeProduct(2));
      service.clear();
      expect(service.items().length).toBe(0);
    });

    it('does nothing when already empty', () => {
      service.clear();
      expect(service.items().length).toBe(0);
    });
  });

  describe('count', () => {
    it('returns total quantity', () => {
      service.add(makeProduct(1));
      service.add(makeProduct(1));
      service.add(makeProduct(2));
      expect(service.count()).toBe(3);
    });

    it('returns 0 when empty', () => {
      expect(service.count()).toBe(0);
    });
  });

  describe('total', () => {
    it('sums price * quantity', () => {
      service.add(makeProduct(1));
      service.add(makeProduct(1));
      service.add(makeProduct(2));
      expect(service.total()).toBe(300);
    });

    it('returns 0 when empty', () => {
      expect(service.total()).toBe(0);
    });
  });

  describe('stockLimitReached', () => {
    it('marks product when quantity >= stock', () => {
      service.add(makeProduct(1, 1));
      service.add(makeProduct(1));
      expect(service.stockLimitReached().get(1)).toBe(true);
    });

    it('does not mark product when below stock', () => {
      service.add(makeProduct(1, 5));
      expect(service.stockLimitReached().has(1)).toBe(false);
    });

    it('returns empty map when no items', () => {
      expect(service.stockLimitReached().size).toBe(0);
    });
  });

  describe('localStorage', () => {
    it('persists items on change', async () => {
      service.add(makeProduct(1));
      await new Promise(resolve => setTimeout(resolve));
      const saved = JSON.parse(localStorage.getItem('cart_items')!);
      expect(saved.length).toBe(1);
    });

    it('restores items on init', () => {
      const item = { product: makeProduct(1), quantity: 2 };
      localStorage.setItem('cart_items', JSON.stringify([item]));

      TestBed.resetTestingModule();
      const restored = TestBed.configureTestingModule({}).inject(CartService);
      expect(restored.items().length).toBe(1);
      expect(restored.items()[0].quantity).toBe(2);
    });

    it('ignores items with quantity 0 on restore', () => {
      const item = { product: makeProduct(1), quantity: 0 };
      localStorage.setItem('cart_items', JSON.stringify([item]));

      TestBed.resetTestingModule();
      const restored = TestBed.configureTestingModule({}).inject(CartService);
      expect(restored.items().length).toBe(0);
    });

    it('handles corrupt localStorage gracefully', () => {
      localStorage.setItem('cart_items', '{bad json');

      TestBed.resetTestingModule();
      const restored = TestBed.configureTestingModule({}).inject(CartService);
      expect(restored.items().length).toBe(0);
    });

    it('removes key from localStorage when cart is empty', async () => {
      service.add(makeProduct(1));
      await new Promise(resolve => setTimeout(resolve));
      expect(localStorage.getItem('cart_items')).toBeTruthy();
      service.clear();
      await new Promise(resolve => setTimeout(resolve));
      expect(localStorage.getItem('cart_items')).toBeNull();
    });
  });

  describe('removingItems / timer', () => {
    it('removes item after 5 seconds', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      expect(service.items()[0].quantity).toBe(0);
      vi.advanceTimersByTime(5000);
      expect(service.items().length).toBe(0);
      vi.useRealTimers();
    });

    it('cancels removal when incremented before timeout', () => {
      service.add(makeProduct(1));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      vi.advanceTimersByTime(3000);
      service.add(makeProduct(1));
      vi.advanceTimersByTime(5000);
      expect(service.items().length).toBe(1);
      expect(service.items()[0].quantity).toBe(1);
      vi.useRealTimers();
    });

    it('handles multiple simultaneous timers', () => {
      service.add(makeProduct(1));
      service.add(makeProduct(2));
      vi.useFakeTimers();
      service.updateQuantity(1, -1);
      service.updateQuantity(2, -1);
      expect(service.removingItems().size).toBe(2);
      vi.advanceTimersByTime(5000);
      expect(service.items().length).toBe(0);
      vi.useRealTimers();
    });
  });
});
