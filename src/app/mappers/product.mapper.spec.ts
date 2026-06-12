import { mapProduct } from './product.mapper';
import { RawProduct } from '@models/product.interface';

describe('mapProduct', () => {
  const raw: RawProduct = {
    id: 1,
    title: 'Test Product',
    description: 'A description',
    category: 'test-category',
    price: 29.99,
    rating: 4.2,
    stock: 10,
    dimensions: { width: 10, height: 5, depth: 3 },
    reviews: [
      {
        rating: 5,
        comment: 'Great!',
        reviewerName: 'John',
        reviewerEmail: 'john@test.com',
        date: '2024-01-01T00:00:00Z',
      },
    ],
    images: ['https://example.com/img1.jpg'],
    thumbnail: 'https://example.com/thumb.jpg',
  };

  it('maps all fields correctly', () => {
    const result = mapProduct(raw);
    expect(result.id).toBe(1);
    expect(result.title).toBe('Test Product');
    expect(result.description).toBe('A description');
    expect(result.category).toBe('test-category');
    expect(result.price).toBe(29.99);
    expect(result.rating).toBe(4.2);
    expect(result.stock).toBe(10);
    expect(result.dimensions).toEqual({ width: 10, height: 5, depth: 3 });
    expect(result.images).toEqual(['https://example.com/img1.jpg']);
    expect(result.thumbnail).toBe('https://example.com/thumb.jpg');
  });

  it('strips reviewerEmail and date from reviews', () => {
    const result = mapProduct(raw);
    expect(result.reviews).toHaveLength(1);
    expect(result.reviews[0]).toEqual({
      rating: 5,
      comment: 'Great!',
      reviewerName: 'John',
    });
    expect((result.reviews[0] as any).reviewerEmail).toBeUndefined();
    expect((result.reviews[0] as any).date).toBeUndefined();
  });

  it('handles empty arrays', () => {
    const result = mapProduct({ ...raw, images: [], reviews: [] });
    expect(result.images).toEqual([]);
    expect(result.reviews).toEqual([]);
  });

  it('handles zero values', () => {
    const result = mapProduct({ ...raw, price: 0, rating: 0, stock: 0 });
    expect(result.price).toBe(0);
    expect(result.rating).toBe(0);
    expect(result.stock).toBe(0);
  });

  it('handles empty strings', () => {
    const result = mapProduct({ ...raw, title: '', description: '', category: '', thumbnail: '' });
    expect(result.title).toBe('');
    expect(result.description).toBe('');
    expect(result.category).toBe('');
    expect(result.thumbnail).toBe('');
  });
});
