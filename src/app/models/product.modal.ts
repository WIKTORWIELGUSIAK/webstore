export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

export interface Products {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
