import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
