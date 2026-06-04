import { useState } from "react";
import type { Product } from "../types/product";

export default function useProductForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCreate = () => {
    setSelectedProduct(null);
    setIsOpen(true);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeForm = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedProduct,
    openCreate,
    openEdit,
    closeForm,
  };
}
