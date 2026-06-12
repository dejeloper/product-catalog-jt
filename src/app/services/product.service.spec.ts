import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { environment } from '@env/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('fetches and maps products', () => {
    const rawResponse = {
      products: [
        {
          id: 1,
          title: 'Test',
          description: 'Desc',
          category: 'cat',
          price: 10,
          rating: 4,
          stock: 5,
          dimensions: { width: 1, height: 2, depth: 3 },
          reviews: [
            {
              rating: 5,
              comment: 'Nice',
              reviewerName: 'John',
              reviewerEmail: 'j@t.com',
              date: '2024-01-01',
            },
          ],
          images: ['img.jpg'],
          thumbnail: 'thumb.jpg',
        },
      ],
    };

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].id).toBe(1);
      expect((products[0].reviews[0] as any).reviewerEmail).toBeUndefined();
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(rawResponse);
  });

  it('handles empty product list', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(0);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    req.flush({ products: [] });
  });

  it('propagates HTTP errors', () => {
    const onError = vi.fn();
    service.getProducts().subscribe({ error: onError });

    const req = httpMock.expectOne(environment.apiUrl);
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(onError).toHaveBeenCalled();
  });
});
