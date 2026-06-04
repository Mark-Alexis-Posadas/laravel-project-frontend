import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 sticky top-0">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
          M
        </div>
      </div>
    </header>
  );
}
