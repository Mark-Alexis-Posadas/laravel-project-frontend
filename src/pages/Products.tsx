import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts, deleteProduct } from "../services/productApi";
import ProductForm from "../components/products/ProductForm";
import useProductForm from "../hooks/useProductForm";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { isOpen, selectedProduct, openCreate, openEdit, closeForm } =
    useProductForm();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await deleteProduct(deleteTarget.id);

      const res = await getProducts();
      setProducts(res.data);

      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          onClick={openCreate}
          className="bg-indigo-500 px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">Total Products</p>
          <h2 className="text-4xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">Total Stock</p>
          <h2 className="text-4xl font-bold mt-2">
            {products.reduce((sum, item) => sum + item.stock, 0)}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">Inventory Value</p>
          <h2 className="text-4xl font-bold mt-2">
            ₱
            {products
              .reduce((sum, item) => sum + item.price * item.stock, 0)
              .toLocaleString()}
          </h2>
        </div>
      </div>

      {isOpen && (
        <ProductForm
          selectedProduct={selectedProduct}
          onClose={closeForm}
          setProducts={setProducts}
        />
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setDeleteTarget(null)}
          />

          {/* MODAL */}
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-red-400">Delete Product</h2>

            <p className="text-zinc-300">
              Are you sure you want to delete{" "}
              <span className="text-white font-bold">{deleteTarget.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-indigo-500 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full">
                Product
              </span>

              <div className="flex gap-3 items-center">
                <span className="text-zinc-500 text-sm">#{product.id}</span>

                <button
                  onClick={() => openEdit(product)}
                  className="text-indigo-400 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(product)}
                  className="text-red-400 text-sm hover:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              {product.name}
            </h3>

            <p className="text-zinc-400 text-sm mb-5">{product.description}</p>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-zinc-500 text-xs">Price</p>
                <p className="text-green-400 font-bold">
                  ₱{product.price.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs">Stock</p>
                <p className="text-white font-bold">{product.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
