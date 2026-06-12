import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CartPage } from '@pages/cart/cart.page';
import { CartService } from '@services/cart.service';

describe('CartPage', () => {
  let fixture: ComponentFixture<CartPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    fixture = TestBed.createComponent(CartPage);
    TestBed.inject(CartService).clear();
    await fixture.whenStable();
  });

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders empty state when no items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Tu carrito está vacío');
  });
});
