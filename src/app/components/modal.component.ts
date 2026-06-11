import {Component, input, output, HostListener} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
})
export class Modal {
  readonly open = input(false);
  readonly close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close.emit();
    }
  }
}
