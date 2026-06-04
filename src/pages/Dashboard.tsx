import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../services/productApi";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  const totalStock = products.reduce((a, b) => a + b.stock, 0);
  const totalValue = products.reduce((a, b) => a + b.price * b.stock, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">Total Products</p>
          <h2 className="text-4xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">Total Stock</p>
          <h2 className="text-4xl font-bold">{totalStock}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">Inventory Value</p>
          <h2 className="text-4xl font-bold">₱{totalValue.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}
