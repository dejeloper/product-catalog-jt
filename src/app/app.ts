import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDropdown } from '@components/cart/cart-dropdown.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartDropdown],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private doc = inject(DOCUMENT);
  private readonly STORAGE_KEY = 'dark-mode';

  readonly darkMode = signal(this.loadInitial());

  constructor() {
    effect(() => {
      this.doc.documentElement.classList.toggle('dark', this.darkMode());
    });
  }

  toggleDark(): void {
    this.darkMode.update(v => {
      const next = !v;
      localStorage.setItem(this.STORAGE_KEY, String(next));
      return next;
    });
  }

  private loadInitial(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
