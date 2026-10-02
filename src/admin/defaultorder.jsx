import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Package, MapPin, Phone, Mail, Hash, Truck } from "lucide-react";

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

  .or-wrap { font-family: 'Montserrat', sans-serif; }

  /* ── Page header — exact match to AdminDashboard ── */
  .or-header {
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .or-header::after {
    content: '';
    position: absolute; bottom: -1px; left: 0;
    width: 60px; height: 1px;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .or-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); margin: 0 0 8px; display: block;
  }
  .or-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 6px; line-height: 1;
  }
  .or-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.05rem;
    color: var(--warm-grey); letter-spacing: 0.03em; margin: 0;
  }

  /* ── Summary stat strip ── */
  .or-stats {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3px; margin-bottom: 40px;
  }
  @media (min-width: 640px) { .or-stats { grid-template-columns: repeat(3, 1fr); } }

  .or-stat {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 24px 22px;
    position: relative; overflow: hidden;
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .or-stat::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s ease;
  }
  .or-stat::after {
    content: '';
    position: absolute; bottom: -20px; right: -20px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .or-stat:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.09); transform: translateY(-3px); }
  .or-stat:hover::before { transform: scaleX(1); }

  .or-stat-icon {
    width: 36px; height: 36px;
    border: 1px solid var(--border); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); margin-bottom: 14px;
    background: rgba(184,150,90,0.08);
  }
  .or-stat-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--warm-grey); margin: 0 0 6px; display: block;
  }
  .or-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 400;
    letter-spacing: 0.04em; color: var(--ink); line-height: 1; margin: 0;
  }
  .or-stat-sub {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin-top: 5px; display: block;
  }

  /* ── Section header ── */
  .or-sec-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .or-sec-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink); margin: 0;
  }
  .or-sec-count {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  /* ── Table wrapper ── */
  .or-table-wrap {
    background: var(--cream);
    border: 1px solid var(--border);
    overflow: hidden; overflow-x: auto;
  }
  .or-table {
    width: 100%; border-collapse: collapse; min-width: 900px;
  }

  /* Table head */
  .or-table thead tr {
    background: var(--offwhite);
    border-bottom: 1px solid var(--border);
  }
  .or-table thead th {
    padding: 13px 16px; text-align: left;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey); font-weight: normal;
    white-space: nowrap;
  }
  /* Gold shimmer line under header */
  .or-thead-rule {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.4;
  }

  /* Table body */
  .or-table tbody tr {
    border-bottom: 1px solid rgba(184,150,90,0.1);
    transition: background 0.2s;
  }
  .or-table tbody tr:last-child { border-bottom: none; }
  .or-table tbody tr:hover { background: var(--offwhite); }
  .or-table td {
    padding: 14px 16px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; color: var(--ink); letter-spacing: 0.01em;
    vertical-align: top;
  }

  /* Cell typography */
  .or-td-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink); display: block; margin-bottom: 2px;
  }
  .or-td-meta {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.12em;
    color: var(--warm-grey); display: flex; align-items: center; gap: 5px;
    margin-top: 3px;
  }
  .or-td-amount {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 14px; color: var(--gold); letter-spacing: 0.04em;
  }
  .or-td-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; color: var(--warm-grey);
    margin-top: 2px; display: block;
  }
  .or-td-ref {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; color: var(--warm-grey);
    letter-spacing: 0.04em; word-break: break-all;
  }

  /* Item list inside cell */
  .or-item { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid rgba(184,150,90,0.1); }
  .or-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .or-item-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink);
  }
  .or-item-detail {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9.5px; letter-spacing: 0.12em;
    color: var(--warm-grey); margin-top: 2px;
  }

  /* Zone badge */
  .or-zone {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 10px;
    background: var(--gold-dim);
    border: 1px solid rgba(184,150,90,0.3);
    color: var(--gold);
  }

  /* Status badges — exact match to AdminDashboard */
  .or-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 10px;
  }
  .or-badge.paid, .or-badge.success {
    background: rgba(45,122,79,0.1);
    border: 1px solid rgba(45,122,79,0.28);
    color: #2d7a4f;
  }
  .or-badge.pending {
    background: var(--gold-dim);
    border: 1px solid rgba(184,150,90,0.3);
    color: var(--gold);
  }
  .or-badge.failed {
    background: rgba(181,43,30,0.08);
    border: 1px solid rgba(181,43,30,0.25);
    color: var(--red);
  }

  /* Date cell */
  .or-date {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.08em;
    color: var(--ink); white-space: nowrap;
  }

  /* Empty state */
  .or-empty {
    text-align: center; padding: 56px 24px;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.15rem;
    color: var(--warm-grey);
  }
`;

function StatusBadge({ status }) {
  const s = status?.toLowerCase();
  const icon =
    s === "paid" || s === "success" ? <CheckCircle size={10} /> :
    s === "failed" ? <XCircle size={10} /> :
    <Clock size={10} />;
  const cls = s === "paid" || s === "success" ? "paid" : s === "failed" ? "failed" : "pending";
  return <span className={`or-badge ${cls}`}>{icon} {status}</span>;
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/api/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.log(err));
  }, [baseURL]);

  const totalRevenue = orders
    .filter(o => o.status === "paid" || o.status === "success")
    .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

  const paidCount = orders.filter(o => o.status === "paid" || o.status === "success").length;

  return (
    <>
      <style>{STYLES}</style>
      <div className="or-wrap">

        {/* ── Header ── */}
        <div className="or-header">
          <span className="or-eyebrow">Control Centre</span>
          <h1 className="or-title">Orders</h1>
          <p className="or-sub">Every purchase, every client — all in one place.</p>
        </div>

        {/* ── Stats strip ── */}
        <div className="or-stats">
          <div className="or-stat">
            <div className="or-stat-icon"><Package size={16} /></div>
            <span className="or-stat-label">Total Orders</span>
            <p className="or-stat-val">{orders.length}</p>
            <span className="or-stat-sub">All time</span>
          </div>
          <div className="or-stat">
            <div className="or-stat-icon"><CheckCircle size={16} /></div>
            <span className="or-stat-label">Paid Orders</span>
            <p className="or-stat-val">{paidCount}</p>
            <span className="or-stat-sub">Confirmed payments</span>
          </div>
          <div className="or-stat">
            <div className="or-stat-icon"><Truck size={16} /></div>
            <span className="or-stat-label">Total Revenue</span>
            <p className="or-stat-val" style={{ fontSize: "1.7rem" }}>
              ₦{totalRevenue.toLocaleString()}
            </p>
            <span className="or-stat-sub">Paid orders only</span>
          </div>
        </div>

        {/* ── Orders table ── */}
        <div className="or-sec-head">
          <h2 className="or-sec-title">All Orders</h2>
          <span className="or-sec-count">{orders.length} total</span>
        </div>

        <div className="or-table-wrap">
          {orders.length === 0 ? (
            <p className="or-empty">No orders yet — check back soon.</p>
          ) : (
            <table className="or-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Zone</th>
                  <th>Items</th>
                  <th>Shipping</th>
                  <th>Subtotal</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Ref</th>
                </tr>
                <tr><td colSpan={11} style={{ padding: 0 }}><div className="or-thead-rule" /></td></tr>
              </thead>

              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>

                    {/* Customer */}
                    <td>
                      <span className="or-td-name">{order.fullName}</span>
                      <span className="or-td-meta"><Mail size={10} />{order.email}</span>
                    </td>

                    {/* Contact */}
                    <td>
                      <span className="or-td-meta"><Phone size={10} />{order.phone}</span>
                    </td>

                    {/* Location */}
                    <td>
                      <span className="or-td-meta" style={{ color: "var(--ink)" }}>
                        <MapPin size={10} />{order.address}
                      </span>
                      <span className="or-td-meta">{order.state}</span>
                    </td>

                    {/* Zone */}
                    <td>
                      <span className="or-zone">{order.deliveryZone || "—"}</span>
                    </td>

                    {/* Items */}
                    <td>
                      {(order.items || []).map((item, i) => (
                        <div key={i} className="or-item">
                          <p className="or-item-name">{item.name}</p>
                          <p className="or-item-detail">
                            Qty {item.quantity} · ₦{Number(item.price).toLocaleString()}
                          </p>
                          {(item.selectedSize || item.size) && (
                            <p className="or-item-detail">
                              Size: {item.selectedSize?.label || item.selectedSize || item.size}
                            </p>
                          )}
                        </div>
                      ))}
                    </td>

                    {/* Shipping */}
                    <td>
                      <span className="or-td-amount">₦{order.shippingFee?.toLocaleString()}</span>
                    </td>

                    {/* Subtotal */}
                    <td>
                      <span className="or-td-amount">₦{order.subtotal?.toLocaleString()}</span>
                    </td>

                    {/* Total */}
                    <td>
                      <span className="or-td-amount" style={{ color: "var(--ink)", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px" }}>
                        ₦{order.totalAmount?.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td><StatusBadge status={order.status} /></td>

                    {/* Date */}
                    <td>
                      <span className="or-date">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString("en-NG", {
                              day: "numeric", month: "short", year: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })
                          : "—"}
                      </span>
                    </td>

                    {/* Ref */}
                    <td>
                      <span className="or-td-ref">{order.paymentRef}</span>
                    </td>

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

export default Orders;
