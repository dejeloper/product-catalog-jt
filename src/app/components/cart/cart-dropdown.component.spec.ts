import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {provideRouter, Router} from '@angular/router';
import {CartService} from '@services/cart.service';
import {Product} from '@models/product.interface';
import {CartDropdown} from './cart-dropdown.component';

const routes = [
  {path: 'cart', component: class {}},
];

const makeProduct = (id: number): Product => ({
  id,
  title: `Product ${id}`,
  description: '',
  category: 'test',
  price: 100,
  rating: 4,
  stock: 10,
  dimensions: {width: 10, height: 5, depth: 3},
  reviews: [],
  images: [],
  thumbnail: '',
});

describe('CartDropdown', () => {
  let fixture: ComponentFixture<CartDropdown>;
  let cartService: CartService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter(routes)],
    });
    fixture = TestBed.createComponent(CartDropdown);
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('toggles open on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(fixture.componentInstance.open()).toBe(true);

    button.click();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('does not open when on /cart page', async () => {
    await router.navigateByUrl('/cart');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('shows badge with item count', () => {
    cartService.add(makeProduct(1));
    cartService.add(makeProduct(1));
    cartService.add(makeProduct(2));
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.bg-blue-600');
    expect(badge).toBeTruthy();
    expect(badge.textContent.trim()).toBe('3');
  });

  it('closes on escape', () => {
    fixture.componentInstance.open.set(true);

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('closes when clicking outside', () => {
    fixture.componentInstance.open.set(true);
    document.body.click();
    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('does nothing on outside click when already closed', () => {
    document.body.click();
    expect(fixture.componentInstance.open()).toBe(false);
  });
});
