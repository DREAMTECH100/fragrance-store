import { useEffect, useState } from "react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div>
      <h1 className="text-3xl font-luxury text-red-600 mb-8">Dashboard</h1>
    <h2 className="text-xl font-luxury text-gray-700 mb-4">
  Welcome Madam Onyeka 👋 What are we checking today?
</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
          <h3 className="text-gray-500 mb-2">Total Orders</h3>
          <h2 className="text-2xl font-bold">{orders.length}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
          <h3 className="text-gray-500 mb-2">Total Products</h3>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
          <h3 className="text-gray-500 mb-2">Total Revenue</h3>
          <h2 className="text-2xl font-bold">₦{totalRevenue}</h2>
        </div>
      </div>

      {/* Recent Orders */}
      <h2 className="text-xl font-luxury text-red-600 mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0,5).map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{order.fullName}</td>
                <td className="p-3">{order.email}</td>
                <td className="p-3">₦{order.totalAmount}</td>
                <td className="p-3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;