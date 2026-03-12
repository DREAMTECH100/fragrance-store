import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Footer from "../components/Footer"; // existing footer

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Add Product", path: "/admin/add-product" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-softwhite">

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 top-0 left-0 bg-white border-r border-gray-200 shadow-md h-full transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
        >
          <div className="px-6 py-8">
            <h2 className="text-2xl font-luxury text-red-600 mb-10">Admin Panel</h2>
            <nav className="flex flex-col gap-4">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 font-medium hover:text-red-600 transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-white rounded shadow"
          >
            <Menu className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 md:ml-64 p-6">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AdminLayout;