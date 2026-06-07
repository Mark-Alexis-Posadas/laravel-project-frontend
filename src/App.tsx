import DashboardLayout from "./layout/DashboardLayout";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";

const App = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
