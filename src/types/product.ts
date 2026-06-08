export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number | null;
  created_at: string;
  updated_at: string;
}
export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id: number | null;
};
