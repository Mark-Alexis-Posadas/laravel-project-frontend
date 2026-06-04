import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getProducts = () => api.get("/products");

export const createProduct = (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
}) => api.post("/products", [data]);

export const updateProduct = (
  id: number,
  data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
  },
) => api.put(`/products/${id}`, data);

export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
