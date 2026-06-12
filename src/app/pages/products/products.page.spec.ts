import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProductsPage } from '@pages/products/products.page';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product.interface';
import { environment } from '@env/environment';

const makeProduct = (id: number, category = 'cat-a'): Product => ({
  id,
  title: `Product ${id}`,
  description: '',
  category,
  price: 100 + id,
  rating: 4,
  stock: 10,
  dimensions: { width: 10, height: 5, depth: 3 },
  reviews: [],
  images: [],
  thumbnail: '',
});

describe('ProductsPage', () => {
  let fixture: ComponentFixture<ProductsPage>;
  let productService: ProductService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    fixture = TestBed.createComponent(ProductsPage);
    productService = TestBed.inject(ProductService);
    await fixture.whenStable();
  });

  describe('toggleSort', () => {
    it('reverses direction when same field', () => {
      fixture.componentInstance.sortBy.set('price');
      fixture.componentInstance.sortAsc.set(true);
      fixture.componentInstance.toggleSort('price');
      expect(fixture.componentInstance.sortAsc()).toBe(false);
    });

    it('changes field and resets to ascending when different', () => {
      fixture.componentInstance.toggleSort('title');
      expect(fixture.componentInstance.sortBy()).toBe('title');
      expect(fixture.componentInstance.sortAsc()).toBe(true);
    });
  });

  describe('openDetail', () => {
    it('sets selectedProduct and opens modal', () => {
      fixture.componentInstance.products.set([makeProduct(1)]);
      fixture.componentInstance.openDetail(1);
      expect(fixture.componentInstance.selectedProduct()).toBeTruthy();
      expect(fixture.componentInstance.modalOpen()).toBe(true);
    });

    it('does nothing for unknown id', () => {
      fixture.componentInstance.openDetail(999);
      expect(fixture.componentInstance.modalOpen()).toBe(false);
    });
  });

  describe('closeDetail', () => {
    it('closes modal', () => {
      fixture.componentInstance.modalOpen.set(true);
      fixture.componentInstance.closeDetail();
      expect(fixture.componentInstance.modalOpen()).toBe(false);
    });
  });

  describe('categories', () => {
    it('returns sorted unique categories', () => {
      fixture.componentInstance.products.set([
        makeProduct(1, 'cat-b'),
        makeProduct(2, 'cat-a'),
        makeProduct(3, 'cat-b'),
      ]);
      expect(fixture.componentInstance.categories()).toEqual(['cat-a', 'cat-b']);
    });

    it('returns empty when no products', () => {
      fixture.componentInstance.products.set([]);
      expect(fixture.componentInstance.categories()).toEqual([]);
    });

    it('filters empty category strings', () => {
      fixture.componentInstance.products.set([
        makeProduct(1, ''),
        makeProduct(2, 'cat-a'),
      ]);
      expect(fixture.componentInstance.categories()).toEqual(['cat-a']);
    });
  });

  describe('filteredProducts', () => {
    beforeEach(() => {
      fixture.componentInstance.products.set([
        makeProduct(1, 'cat-a'),
        makeProduct(2, 'cat-b'),
      ]);
    });

    it('returns all when no filters', () => {
      expect(fixture.componentInstance.filteredProducts().length).toBe(2);
    });

    it('filters by search', () => {
      fixture.componentInstance.search.set('product 1');
      expect(fixture.componentInstance.filteredProducts().length).toBe(1);
      expect(fixture.componentInstance.filteredProducts()[0].id).toBe(1);
    });

    it('filters by category', () => {
      fixture.componentInstance.selectedCategory.set('cat-a');
      expect(fixture.componentInstance.filteredProducts().length).toBe(1);
    });

    it('combines search and category filters', () => {
      fixture.componentInstance.products.set([
        makeProduct(1, 'cat-a'),
        makeProduct(2, 'cat-b'),
        makeProduct(3, 'cat-a'),
      ]);
      fixture.componentInstance.search.set('product');
      fixture.componentInstance.selectedCategory.set('cat-a');
      expect(fixture.componentInstance.filteredProducts().length).toBe(2);
    });

    it('returns empty when no match', () => {
      fixture.componentInstance.search.set('nonexistent');
      expect(fixture.componentInstance.filteredProducts().length).toBe(0);
    });
  });

  describe('sortedProducts', () => {
    beforeEach(() => {
      fixture.componentInstance.products.set([
        makeProduct(3, 'cat-a'),
        makeProduct(1, 'cat-b'),
        makeProduct(2, 'cat-a'),
      ]);
    });

    it('sorts ascending by default', () => {
      const sorted = fixture.componentInstance.sortedProducts();
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(2);
      expect(sorted[2].id).toBe(3);
    });

    it('sorts descending', () => {
      fixture.componentInstance.sortBy.set('id');
      fixture.componentInstance.sortAsc.set(false);
      const sorted = fixture.componentInstance.sortedProducts();
      expect(sorted[0].id).toBe(3);
      expect(sorted[2].id).toBe(1);
    });

    it('sorts by string field', () => {
      fixture.componentInstance.sortBy.set('title');
      fixture.componentInstance.sortAsc.set(true);
      const sorted = fixture.componentInstance.sortedProducts();
      expect(sorted[0].title).toBe('Product 1');
      expect(sorted[2].title).toBe('Product 3');
    });

    it('sorts by numeric field', () => {
      fixture.componentInstance.sortBy.set('price');
      fixture.componentInstance.sortAsc.set(true);
      const sorted = fixture.componentInstance.sortedProducts();
      expect(sorted[0].price).toBe(101);
      expect(sorted[2].price).toBe(103);
    });

    it('returns empty for empty list', () => {
      fixture.componentInstance.products.set([]);
      expect(fixture.componentInstance.sortedProducts()).toEqual([]);
    });
  });
});

describe('ProductsPage ngOnInit', () => {
  let fixture: ComponentFixture<ProductsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    fixture = TestBed.createComponent(ProductsPage);
  });

  it('sets loading to true on init, false after successful load', () => {
    fixture.detectChanges();
    const httpMock = TestBed.inject(HttpTestingController);
    expect(fixture.componentInstance.loading()).toBe(true);
    const req = httpMock.expectOne(environment.apiUrl);
    req.flush({ products: [] });
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.products().length).toBe(0);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('sets error on HTTP failure', () => {
    fixture.detectChanges();
    const httpMock = TestBed.inject(HttpTestingController);
    const req = httpMock.expectOne(environment.apiUrl);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.products().length).toBe(0);
    expect(fixture.componentInstance.error()).toBeTruthy();
  });
});
