import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: 'image-carousel.component.html',
})
export class ImageCarousel {
  readonly images = input.required<string[]>();
  readonly alt = input.required<string>();

  currentIndex = 0;

  get isSingle(): boolean {
    return this.images().length <= 1;
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex === 0
        ? this.images().length - 1
        : this.currentIndex - 1;
  }

  next(): void {
    this.currentIndex =
      this.currentIndex === this.images().length - 1
        ? 0
        : this.currentIndex + 1;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }
}
