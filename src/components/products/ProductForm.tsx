import { useState } from "react";
import type { Product } from "../../types/product";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../../services/productApi";

import type { Category } from "../../types/category";
interface Props {
  selectedProduct: Product | null;
  onClose: () => void;
  setProducts: (data: Product[]) => void;
  categories: Category[];
}

const ProductForm = ({
  selectedProduct,
  onClose,
  setProducts,
  categories,
}: Props) => {
  const getInitialForm = () => ({
    name: selectedProduct?.name ?? "",
    description: selectedProduct?.description ?? "",
    price: selectedProduct?.price ?? 0,
    stock: selectedProduct?.stock ?? 0,
    category_id: selectedProduct?.category_id ?? "",
  });

  const [form, setForm] = useState(getInitialForm);
  const [submitting, setSubmitting] = useState(false);

  const isEdit = !!selectedProduct;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? Number(value)
          : name === "category_id"
            ? value === ""
              ? null
              : Number(value)
            : value,
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

        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            Product Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Category</label>

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Price (₱)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            />
          </div>
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
};

export default ProductForm;
