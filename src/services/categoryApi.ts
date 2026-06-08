import type { Category, CategoryInput } from "../types/category";
import { api } from "./api";

export const getCategories = () => api.get<Category[]>("/categories");

export const createCategory = (data: CategoryInput) =>
  api.post<Category>("/categories", data);

export const updateCategory = (id: number, data: CategoryInput) =>
  api.put<Category>(`/categories/${id}`, data);

export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);
