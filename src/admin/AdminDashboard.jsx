
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Package, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";
 
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500&display=swap');
 
  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-dim:   rgba(184,150,90,0.15);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --offwhite:   #faf7f2;
    --warm-grey:  #7a7065;
    --border:     rgba(184,150,90,0.22);
  }
 
  .ad-wrap {
    font-family: 'Montserrat', sans-serif;
  }
 
  /* ── Page header ── */
  .ad-header {
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .ad-header::after {
    content: '';
    position: absolute; bottom: -1px; left: 0;
    width: 60px; height: 1px;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .ad-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); margin: 0 0 8px; display: block;
  }
  .ad-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 6px; line-height: 1;
  }
  .ad-welcome {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.05rem;
    color: var(--warm-grey); letter-spacing: 0.03em; margin: 0;
  }
 
  /* ── Stat cards ── */
  .ad-stats {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3px;
    margin-bottom: 40px;
  }
  @media (min-width: 640px)  { .ad-stats { grid-template-columns: repeat(3, 1fr); } }
 
  .ad-stat {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 28px 24px;
    position: relative; overflow: hidden;
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .ad-stat::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s ease;
  }
  .ad-stat:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.09); transform: translateY(-3px); }
  .ad-stat:hover::before { transform: scaleX(1); }
 
  /* Radial glow accent */
  .ad-stat::after {
    content: '';
    position: absolute; bottom: -20px; right: -20px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
 
  .ad-stat-icon {
    width: 36px; height: 36px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); margin-bottom: 16px;
    background: rgba(184,150,90,0.08);
  }
  .ad-stat-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--warm-grey); margin: 0 0 8px; display: block;
  }
  .ad-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400; font-size: 2.4rem;
    letter-spacing: 0.05em; color: var(--ink);
    line-height: 1; margin: 0;
  }
  .ad-stat-sub {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin-top: 6px; display: block;
  }
 
  /* ── Section header ── */
  .ad-sec-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .ad-sec-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink); margin: 0;
  }
  .ad-sec-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey);
  }
 
  /* ── Orders table ── */
  .ad-table-wrap {
    background: var(--cream);
    border: 1px solid var(--border);
    overflow: hidden;
    overflow-x: auto;
  }
  .ad-table {
    width: 100%; border-collapse: collapse; min-width: 560px;
  }
  .ad-table thead tr {
    background: var(--offwhite);
    border-bottom: 1px solid var(--border);
  }
  .ad-table thead th {
    padding: 13px 18px; text-align: left;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey); font-weight: normal;
  }
  /* Gold shimmer under header */
  .ad-table thead tr::after {
    content: ''; display: block; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .ad-table tbody tr {
    border-bottom: 1px solid rgba(184,150,90,0.1);
    transition: background 0.2s ease;
  }
  .ad-table tbody tr:last-child { border-bottom: none; }
  .ad-table tbody tr:hover { background: var(--offwhite); }
  .ad-table td {
    padding: 14px 18px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; color: var(--ink); letter-spacing: 0.02em;
  }
  .ad-table .td-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .ad-table .td-email {
    color: var(--warm-grey); font-size: 11px;
  }
  .ad-table .td-amount {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 13px; color: var(--gold);
    letter-spacing: 0.04em;
  }
 
  /* Status badges */
  .ad-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 10px;
  }
  .ad-badge.paid {
    background: rgba(45,122,79,0.1);
    border: 1px solid rgba(45,122,79,0.28);
    color: #2d7a4f;
  }
  .ad-badge.success {
    background: rgba(45,122,79,0.1);
    border: 1px solid rgba(45,122,79,0.28);
    color: #2d7a4f;
  }
  .ad-badge.pending {
    background: var(--gold-dim);
    border: 1px solid rgba(184,150,90,0.3);
    color: var(--gold);
  }
  .ad-badge.failed {
    background: rgba(181,43,30,0.08);
    border: 1px solid rgba(181,43,30,0.25);
    color: var(--red);
  }
 
  /* Empty state */
  .ad-empty {
    text-align: center; padding: 48px 24px;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.1rem;
    color: var(--warm-grey);
  }
`;
 
function StatusBadge({ status }) {
  const s = status?.toLowerCase();
  const icon =
    s === "paid" || s === "success" ? <CheckCircle size={10} /> :
    s === "failed" ? <XCircle size={10} /> :
    <Clock size={10} />;
  return (
    <span className={`ad-badge ${s === "paid" || s === "success" ? "paid" : s === "failed" ? "failed" : "pending"}`}>
      {icon} {status}
    </span>
  );
}
 
function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;
 
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { navigate("/admin-login"); return; }
    fetch(`${baseURL}/api/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status !== 200) {
          localStorage.removeItem("adminToken");
          navigate("/admin-login");
        }
      })
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
      });
  }, [navigate, baseURL]);
 
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
 
    fetch(`${baseURL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin-login");
          return [];
        }
        return res.json();
      })
      .then(data => setOrders(data))
      .catch(err => console.error("Orders error:", err));
 
    fetch(`${baseURL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Products error:", err));
  }, [navigate, baseURL]);
 
  const totalRevenue = orders
    .filter(o => o.status === "paid" || o.status === "success")
    .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);
 
  return (
    <>
      <style>{STYLES}</style>
      <div className="ad-wrap">
 
        {/* Header */}
        <div className="ad-header">
          <span className="ad-eyebrow">Control Centre</span>
          <h1 className="ad-title">Dashboard</h1>
          <p className="ad-welcome">Welcome back, Madam Onyeka — what are we reviewing today?</p>
        </div>
 
        {/* Stats */}
        <div className="ad-stats">
          <div className="ad-stat">
            <div className="ad-stat-icon"><ShoppingBag size={16} /></div>
            <span className="ad-stat-label">Total Orders</span>
            <p className="ad-stat-val">{orders.length}</p>
            <span className="ad-stat-sub">All time</span>
          </div>
          <div className="ad-stat">
            <div className="ad-stat-icon"><Package size={16} /></div>
            <span className="ad-stat-label">Total Products</span>
            <p className="ad-stat-val">{products.length}</p>
            <span className="ad-stat-sub">In catalogue</span>
          </div>
          <div className="ad-stat">
            <div className="ad-stat-icon"><TrendingUp size={16} /></div>
            <span className="ad-stat-label">Total Revenue</span>
            <p className="ad-stat-val" style={{ fontSize: "1.9rem" }}>
              ₦{totalRevenue.toLocaleString()}
            </p>
            <span className="ad-stat-sub">Paid orders only</span>
          </div>
        </div>
 
        {/* Recent Orders */}
        <div className="ad-sec-head">
          <h2 className="ad-sec-title">Recent Orders</h2>
          <span className="ad-sec-label">Latest 5</span>
        </div>
 
        <div className="ad-table-wrap">
          {orders.length === 0 ? (
            <p className="ad-empty">No orders yet — check back soon.</p>
          ) : (
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order._id}>
                    <td className="td-name">{order.fullName}</td>
                    <td className="td-email">{order.email}</td>
                    <td className="td-amount">₦{Number(order.totalAmount).toLocaleString()}</td>
                    <td><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
 
      </div>
    </>
  );
}
 
export default AdminDashboard;