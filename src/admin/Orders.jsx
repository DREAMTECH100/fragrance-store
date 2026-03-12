import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-luxury text-red-600 mb-8">Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Number of Products</th>
              <th className="p-3 text-left">Products & Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment Ref</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{order.fullName}</td>
                <td className="p-3">{order.email}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">{order.address}</td>
                <td className="p-3">{order.cartItems.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td className="p-3">
                  {order.cartItems.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <strong>{item.name}</strong> x {item.quantity}{" "}
                      {item.category ? `(${item.category})` : ""}
                    </div>
                  ))}
                </td>
                <td className="p-3">₦{order.totalAmount}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.paymentRef}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;