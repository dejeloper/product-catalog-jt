import { Product, RawProduct } from '@models/product.interface';

export function mapProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    price: raw.price,
    rating: raw.rating,
    stock: raw.stock,
    dimensions: raw.dimensions,
    reviews: raw.reviews.map((r) => ({
      rating: r.rating,
      comment: r.comment,
      reviewerName: r.reviewerName,
    })),
    images: raw.images,
    thumbnail: raw.thumbnail,
  };
}
