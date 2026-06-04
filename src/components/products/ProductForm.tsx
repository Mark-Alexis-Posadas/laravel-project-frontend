import { useState, useEffect } from "react";
import type { Product } from "../../types/product";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../../services/productApi";

interface Props {
  selectedProduct: Product | null;
  onClose: () => void;
  setProducts: (data: Product[]) => void;
}

export default function ProductForm({
  selectedProduct,
  onClose,
  setProducts,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  const isEdit = !!selectedProduct;

  // fill form when edit
  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
      });
    }
  }, [selectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEdit && selectedProduct) {
        await updateProduct(selectedProduct.id, form);
      } else {
        await createProduct(form);
      }

      const res = await getProducts();
      setProducts(res.data);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* MODAL */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {selectedProduct ? "Update Product" : "Add Product"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-2 rounded bg-zinc-800 border border-zinc-700"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg"
          >
            {submitting
              ? selectedProduct
                ? "Updating..."
                : "Adding..."
              : selectedProduct
                ? "Update Product"
                : "Add Product"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-red-400 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
