import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: 'star-rating.component.html',
})
export class StarRating {
  readonly rating = input.required<number>();
  readonly size = input<'sm' | 'lg'>('sm');
}
