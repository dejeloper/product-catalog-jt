import { Component, DestroyRef, ElementRef, effect, inject, input, output, viewChild, } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Modal {
  readonly open = input<boolean>(false);
  readonly close = output<void>();

  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly destroyRef = inject(DestroyRef);
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.unlockBody());

    effect(() => {
      const isOpen = this.open();
      if (typeof document === 'undefined') return;

      if (isOpen) {
        document.body.style.overflow = 'hidden';
        this.previouslyFocused = document.activeElement as HTMLElement | null;
        queueMicrotask(() => this.panel()?.nativeElement.focus());
      } else {
        this.unlockBody();
        this.previouslyFocused?.focus();
      }
    });
  }

  onEscape(): void {
    if (this.open()) this.close.emit();
  }

  private unlockBody(): void {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }
}
