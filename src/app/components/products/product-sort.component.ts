import { Component, input, output } from '@angular/core';

export type SortField = 'id' | 'title' | 'price' | 'rating';

export interface SortOption {
  key: SortField;
  label: string;
}

@Component({
  selector: 'app-product-sort',
  templateUrl: 'product-sort.component.html',
})
export class ProductSort {
  readonly activeKey = input.required<SortField>();
  readonly ascending = input.required<boolean>();
  readonly options = input.required<readonly SortOption[]>();
  readonly toggleSort = output<SortField>();
}
