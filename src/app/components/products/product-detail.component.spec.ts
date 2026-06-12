import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {CartService} from '@services/cart.service';
import {Product} from '@models/product.interface';
import {ProductDetail} from './product-detail.component';

const makeProduct = (id: number): Product => ({
  id,
  title: `Product ${id}`,
  description: 'A great product',
  category: 'electronics',
  price: 199.99,
  rating: 4.5,
  stock: 10,
  dimensions: {width: 10, height: 5, depth: 3},
  reviews: [
    {rating: 5, comment: 'Excellent', reviewerName: 'Alice'},
  ],
  images: ['img1.jpg', 'img2.jpg'],
  thumbnail: 'thumb.jpg',
});

describe('ProductDetail', () => {
  let fixture: ComponentFixture<ProductDetail>;
  let cartService: CartService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(ProductDetail);
    cartService = TestBed.inject(CartService);
    fixture.componentRef.setInput('product', makeProduct(1));
    await fixture.whenStable();
  });

  it('computes cartItem from cart service', () => {
    cartService.add(makeProduct(1));
    expect((fixture.componentInstance as any).cartItem()).toBeTruthy();
  });

  it('returns undefined cartItem when not in cart', () => {
    expect((fixture.componentInstance as any).cartItem()).toBeUndefined();
  });

  it('calls cartService.add on onAddToCart', () => {
    const spy = vi.spyOn(cartService, 'add');
    (fixture.componentInstance as any).onAddToCart();
    expect(spy).toHaveBeenCalledWith(makeProduct(1));
  });

  it('calls cartService.add on onIncrement', () => {
    const spy = vi.spyOn(cartService, 'add');
    (fixture.componentInstance as any).onIncrement();
    expect(spy).toHaveBeenCalledWith(makeProduct(1));
  });

  it('calls cartService.updateQuantity on onDecrement', () => {
    const spy = vi.spyOn(cartService, 'updateQuantity');
    (fixture.componentInstance as any).onDecrement();
    expect(spy).toHaveBeenCalledWith(1, -1);
  });

  it('computes isRemoving when product is removing', () => {
    cartService.add(makeProduct(1));
    vi.useFakeTimers();
    cartService.updateQuantity(1, -1);
    expect((fixture.componentInstance as any).isRemoving()).toBe(true);
    vi.useRealTimers();
  });

  it('computes isRemoving false when not removing', () => {
    expect((fixture.componentInstance as any).isRemoving()).toBe(false);
  });
});
