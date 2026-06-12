import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, RawProduct } from '@models/product.interface';
import { mapProduct } from '../mappers/product.mapper';
import { environment } from '@env/environment';

interface RawResponse {
  products: RawProduct[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<RawResponse>(environment.apiUrl).pipe(
      map((res) => res.products.map(mapProduct)),
    );
  }
}
