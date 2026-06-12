export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  dimensions: Dimensions;
  reviews: Review[];
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface RawProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  dimensions: { width: number; height: number; depth: number };
  reviews: { rating: number; comment: string; reviewerName: string; reviewerEmail: string; date: string }[];
  images: string[];
  thumbnail: string;
}
