import { api } from "./api";
import type { Product, ProductInput } from "../types/product";
export const getProducts = () => api.get<Product[]>("/products");

export const createProduct = (data: ProductInput) =>
  api.post<Product>("/products", data);

export const updateProduct = (id: number, data: ProductInput) =>
  api.put<Product>(`/products/${id}`, data);

export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
