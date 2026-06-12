import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {CartService} from '@services/cart.service';
import {Product} from '@models/product.interface';
import {ProductCard} from './product-card.component';

const makeProduct = (id: number, stock = 10): Product => ({
  id,
  title: `Product ${id}`,
  description: '',
  category: 'test',
  price: 100,
  rating: 4,
  stock,
  dimensions: {width: 10, height: 5, depth: 3},
  reviews: [],
  images: [],
  thumbnail: '',
});

describe('ProductCard', () => {
  let fixture: ComponentFixture<ProductCard>;
  let cartService: CartService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(ProductCard);
    cartService = TestBed.inject(CartService);
    fixture.componentRef.setInput('product', makeProduct(1));
    await fixture.whenStable();
  });

  it('emits clicked on click', () => {
    const spy = vi.fn();
    fixture.componentInstance.clicked.subscribe(spy);

    fixture.nativeElement.querySelector('article').click();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('emits clicked on Enter key', () => {
    const spy = vi.fn();
    fixture.componentInstance.clicked.subscribe(spy);

    fixture.nativeElement.querySelector('article').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('emits clicked on Space key', () => {
    const spy = vi.fn();
    fixture.componentInstance.clicked.subscribe(spy);

    fixture.nativeElement.querySelector('article').dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('calls cartService.add on button click', () => {
    const spy = vi.spyOn(cartService, 'add');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalledWith(makeProduct(1));
  });

  it('shows "Sin stock" when stock limit reached', () => {
    cartService.add(makeProduct(1, 1));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sin stock');
  });
});
