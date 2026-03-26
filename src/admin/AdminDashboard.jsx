import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  // 🔐 1. VERIFY TOKEN FIRST (SECURITY GATE)
  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      navigate("/admin-login")
      return
    }

    fetch("http://localhost:5000/api/auth/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200) {
          localStorage.removeItem("adminToken")
          navigate("/admin-login")
        }
      })
      .catch(() => {
        localStorage.removeItem("adminToken")
        navigate("/admin-login")
      })

  }, [navigate])


  // 📊 2. FETCH DATA (ONLY IF TOKEN EXISTS)
  useEffect(() => {
    const token = localStorage.getItem("adminToken")

    if (!token) return

    // ORDERS (PROTECTED)
    fetch("http://localhost:5000/api/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem("adminToken")
          navigate("/admin-login")
          return []
        }
        return res.json()
      })
      .then(data => setOrders(data))
      .catch(err => console.error("Orders error:", err))

    // PRODUCTS (PUBLIC)
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Products error:", err))

  }, [navigate])


  // 💰 TOTAL REVENUE (FIXED)
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  )


  return (
    <div>
      <h1 className="text-3xl font-luxury text-red-600 mb-8">
        Dashboard
      </h1>

      <h2 className="text-xl font-luxury text-gray-700 mb-4">
        Welcome Madam Onyeka 👋 What are we checking today?
      </h2>

      {/* SUMMARY */}
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

      {/* RECENT ORDERS */}
      <h2 className="text-xl font-luxury text-red-600 mb-4">
        Recent Orders
      </h2>

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
            {orders.slice(0, 5).map(order => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
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
  )
}

export default AdminDashboard