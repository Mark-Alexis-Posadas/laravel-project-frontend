import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../services/productApi";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Inventory Dashboard</h1>

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
              {products.reduce((sum, item) => sum + item.price * item.stock, 0)}
            </h2>
          </div>
        </div>
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

                <span className="text-zinc-500 text-sm">#{product.id}</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {product.name}
              </h3>

              <p className="text-zinc-400 text-sm mb-5">
                {product.description}
              </p>

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
    </div>
  );
}
