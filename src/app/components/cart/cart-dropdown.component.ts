import { Component, ElementRef, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-cart-dropdown',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: 'cart-dropdown.component.html',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class CartDropdown {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  protected readonly cartService = inject(CartService);

  readonly open = signal(false);

  protected readonly isCartPage = (): boolean =>
    this.router.url === '/cart';

  toggle(event: Event): void {
    if (this.isCartPage()) return;
    event.stopPropagation();
    this.open.update((v) => !v);
  }

  close(): void {
    this.open.set(false);
  }

  protected onDocumentClick(event: Event): void {
    if (!this.open()) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
