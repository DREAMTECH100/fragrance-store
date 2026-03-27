import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL; // 🔑 from .env.production

  useEffect(() => {
    fetch(`${baseURL}/api/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.log(err));
  }, [baseURL]);

  return (
    <div className="p-10 max-w-7xl mx-auto">

      <h1 className="text-3xl font-luxury mb-8 text-red-600">
        Orders Dashboard
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-white shadow rounded-lg">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Location</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Items</th>
              <th className="p-3">Shipping</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ref</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b">

                {/* CUSTOMER */}
                <td className="p-3">
                  <p className="font-semibold">{order.fullName}</p>
                  <p className="text-xs">{order.email}</p>
                </td>

                {/* CONTACT */}
                <td className="p-3">{order.phone}</td>

                {/* LOCATION */}
                <td className="p-3">
                  <p>{order.address}</p>
                  <p className="text-xs text-gray-500">{order.state}</p>
                </td>

                {/* ZONE */}
                <td className="p-3">
                  <span className="px-2 py-1 text-xs bg-black text-white rounded">
                    {order.deliveryZone}
                  </span>
                </td>

                {/* ITEMS */}
                <td className="p-3">
                  {(order.items || []).map((item, i) => (
                    <div key={i} className="mb-2 text-sm">

                      <p className="font-medium">{item.name}</p>

                      <p className="text-xs text-gray-500">
                        {item.quantity} × ₦{item.price}
                      </p>

                      {/* ✅ SIZE FIX (handles everything) */}
                      {(item.selectedSize || item.size) && (
                        <p className="text-xs text-gray-400">
                          Size: {
                            item.selectedSize?.label || 
                            item.selectedSize || 
                            item.size
                          }
                        </p>
                      )}

                    </div>
                  ))}
                </td>

                {/* SHIPPING */}
                <td className="p-3">
                  ₦{order.shippingFee?.toLocaleString()}
                </td>

                {/* SUBTOTAL */}
                <td className="p-3">
                  ₦{order.subtotal?.toLocaleString()}
                </td>

                {/* TOTAL */}
                <td className="p-3 font-bold">
                  ₦{order.totalAmount?.toLocaleString()}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span className="text-green-600 text-sm">
                    {order.status}
                  </span>
                </td>

                {/* REF */}
                <td className="p-3 text-xs">
                  {order.paymentRef}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Orders;