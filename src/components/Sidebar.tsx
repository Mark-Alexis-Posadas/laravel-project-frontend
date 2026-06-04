import { LayoutDashboard, Package, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400"
        : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-indigo-400">InventoryPro</h1>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/" end className={navClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/products" className={navClass}>
          <Package size={20} />
          Products
        </NavLink>

        <NavLink to="/suppliers" className={navClass}>
          <Users size={20} />
          Suppliers
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
