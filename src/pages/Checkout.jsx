import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ChevronDown, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

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

  /* ─── Page ─── */
  .co-page {
    min-height: 100vh;
    background: var(--offwhite);
  }
  .co-top-rule { height: 3px; background: var(--red); }

  /* ─── Header ─── */
  .co-header {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 52px 24px 40px;
    text-align: center;
    position: relative;
  }
  .co-header::before {
    content: '';
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 80px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .co-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase;
    color: var(--red); margin: 0 0 12px; display: block;
  }
  .co-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2.4rem, 5.5vw, 4rem);
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink); line-height: 1; margin: 0 0 12px;
  }
  .co-secure-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  /* ─── Layout ─── */
  .co-body {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: start;
  }
  @media (min-width: 860px) {
    .co-body { grid-template-columns: 1fr 380px; gap: 36px; }
  }

  /* ─── Form panel ─── */
  .co-panel {
    background: #fff;
    border: 1px solid var(--border);
    overflow: hidden;
  }

  /* Section dividers inside panel */
  .co-section-head {
    display: flex; align-items: center; gap: 12px;
    padding: 15px 22px;
    border-bottom: 1px solid var(--border);
    background: var(--offwhite);
  }
  .co-section-num {
    width: 22px; height: 22px; flex-shrink: 0;
    border: 1px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; color: var(--gold);
  }
  .co-section-title {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  .co-form-body { padding: 26px 22px 10px; }

  /* ─── Fields ─── */
  .co-field { margin-bottom: 22px; }
  .co-field:last-child { margin-bottom: 0; }

  .co-label {
    display: block; margin-bottom: 7px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .co-input {
    width: 100%; box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 12px 14px;
    outline: none;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .co-input:focus {
    background: var(--cream);
    border-bottom-color: var(--gold);
  }
  .co-input::placeholder { color: rgba(122,112,101,0.45); font-size: 12px; }

  .co-grid-2 {
    display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
  }
  @media (max-width: 560px) {
    .co-grid-2 { grid-template-columns: 1fr; }
  }

  /* Select */
  .co-select-wrap { position: relative; }
  .co-select-icon {
    position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: var(--warm-grey);
  }
  .co-select {
    width: 100%; appearance: none; box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 12px 38px 12px 14px;
    outline: none; cursor: pointer;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .co-select:focus {
    background: var(--cream);
    border-bottom-color: var(--gold);
  }

  /* Delivery zone badge */
  .co-zone {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 14px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    padding: 6px 13px;
    border: 1px solid rgba(184,150,90,0.3);
    background: var(--gold-dim); color: var(--gold);
  }
  .co-zone-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
  }
  .co-zone-free {
    margin-left: 8px; padding-left: 8px;
    border-left: 1px solid rgba(184,150,90,0.3);
    color: #2d7a4f;
  }

  /* Submit area */
  .co-submit-wrap { padding: 22px; border-top: 1px solid var(--border); }

  .co-pay-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 16px 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    background: var(--ink); color: #f5ede0;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.35s ease;
  }
  .co-pay-btn::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: linear-gradient(135deg, var(--red), var(--red-deep));
    transition: top 0.42s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .co-pay-btn:hover::before { top: 0; }
  .co-pay-btn:hover { color: #fff; }
  .co-pay-btn > * { position: relative; z-index: 1; }

  .co-trust {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin-top: 13px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  /* ─── Summary panel ─── */
  .co-summary {
    background: #fff;
    border: 1px solid var(--border);
    overflow: hidden;
    position: sticky; top: 90px;
  }
  .co-summary-head {
    padding: 17px 22px;
    background: linear-gradient(160deg, #1a1108 0%, #2a1d0e 45%, #1e150a 100%);
    position: relative;
  }
  .co-summary-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .co-summary-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 400;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #f5ede0; margin: 0;
  }
  .co-summary-body { padding: 22px; }

  /* Order items */
  .co-item {
    display: flex; align-items: center; gap: 13px;
    padding-bottom: 14px; margin-bottom: 14px;
    border-bottom: 1px solid rgba(184,150,90,0.1);
  }
  .co-item:last-of-type { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }

  .co-item-img {
    width: 54px; height: 54px; flex-shrink: 0;
    background: linear-gradient(145deg, #fdfaf5, #f5ede0);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .co-item-img img { max-width: 86%; max-height: 86%; object-fit: contain; }

  .co-item-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: var(--ink); line-height: 1.2; flex: 1; min-width: 0;
  }
  .co-item-qty {
    display: block; margin-top: 3px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .co-item-price {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 12px; color: var(--gold);
    white-space: nowrap; flex-shrink: 0;
  }

  /* Totals */
  .sum-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 12px;
  }
  .sum-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .sum-val {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 13px; color: var(--ink);
  }
  .sum-free {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
    color: #2d7a4f; background: rgba(45,122,79,0.1);
    border: 1px solid rgba(45,122,79,0.25);
    padding: 2px 9px;
  }
  .sum-divider {
    height: 1px; margin: 16px 0;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .sum-total-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .sum-total-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 500;
    color: var(--gold); letter-spacing: 0.06em;
  }
`;

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
  "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
  "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe",
  "Zamfara","FCT"
];

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", address: "", state: ""
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity, 0
  );
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  );

 const calculateShipping = (address, state, total, quantity) => {
  if (!address || !state) return 0;

  const lowerAddress = address.toLowerCase();
  const lowerState = state.toLowerCase();

  if (total >= 1000000) return 0;
  if (lowerState === "lagos" && total >= 300000) return 0;

  const isLagos = lowerState === "lagos";

  const islandAreas = [
    "lekki",
    "lekki phase 1",
    "lekki phase 2",
    "ajah",
    "sangotedo",
    "abraham adesanya",
    "ikota",
    "vgc",
    "chevron",
    "jakande",
    "ikate",
    "oniru",
    "ikoyi",
    "banana island",
    "parkview",
    "victoria island",
    "vi",
    "eko atlantic",
    "marina",
    "cms",
    "apongbon",
    "lagos island",
    "obalende",
    "falomo"
  ];

  const mainlandAreas = [
    "ikeja",
    "maryland",
    "anthony",
    "gbagada",
    "ketu",
    "mile 12",
    "ojota",
    "yaba",
    "sabo",
    "surulere",
    "mushin",
    "oshodi",
    "isolo",
    "egbeda",
    "ipaja",
    "alimosho",
    "agege",
    "ogba",
    "berger",
    "ikorodu",
    "magodo",
    "omole",
    "ojodu",
    "abule egba",
    "iyana ipaja",
    "festac",
    "amuwo odofin",
    "trade fair",
    "orile",
    "ajegunle",
    "ebute metta",
    "bariga",
    "shomolu",
    "somolu",
    "akoka",
    "unilag",
    "ilupeju",
    "palmgrove",
    "fadeyi",
    "ikorodu road",
    "aguda",
    "ojuelegba",
    "dopemu"
  ];

  const isIsland = islandAreas.some(a =>
    lowerAddress.includes(a)
  );

  const isMainland = mainlandAreas.some(a =>
    lowerAddress.includes(a)
  );

  let baseByQty = 7000;

  if (quantity === 3) baseByQty = 8500;
  if (quantity >= 4) baseByQty = 9000;

  if (!isLagos) return 8000;

  if (isIsland) {
    if (quantity <= 2) return 5000;
    if (quantity === 3) return 5500;
    return 6000;
  }

  if (isMainland) {
    if (quantity <= 2) return 7000;
    if (quantity === 3) return 7500;
    return 8000;
  }

  return baseByQty;
};

  const shippingFee = calculateShipping(form.address, form.state, subtotal, totalQuantity);
  const totalAmount = subtotal + shippingFee;
  const isFreeShipping = !!form.state && shippingFee === 0;

  const getDeliveryZone = () => {
    if (!form.state) return "";
    const la = form.address.toLowerCase();
    const islandAreas = ["lekki", "ajah", "ikoyi", "victoria island", "vi"];
    const mainlandAreas = ["ikeja", "yaba", "surulere", "maryland"];
    if (form.state.toLowerCase() !== "lagos") return "Outside Lagos";
    if (islandAreas.some(a => la.includes(a))) return "Lagos Island";
    if (mainlandAreas.some(a => la.includes(a))) return "Lagos Mainland";
    return "Lagos";
  };
  const deliveryZone = getDeliveryZone();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("checkout", JSON.stringify(form));
      const response = await fetch(`${baseURL}/api/payment/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          state: form.state,
          items: cartItems.map(item => ({
            ...item,
            size: item.selectedSize?.label || item.size || null
          })),
          subtotal, shippingFee, totalAmount
        })
      });
      const data = await response.json();
      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="co-page">

        <div className="co-top-rule" />

        {/* Header */}
        <div className="co-header">
          <span className="co-eyebrow">Final Step</span>
          <h1 className="co-title">Secure Checkout</h1>
          <span className="co-secure-badge">
            <Lock size={11} /> SSL Encrypted · Powered by Paystack
          </span>
        </div>

        <div className="co-body">

          {/* ── Form ── */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="co-panel">

                {/* Contact */}
                <div className="co-section-head">
                  <span className="co-section-num">1</span>
                  <span className="co-section-title">Contact Information</span>
                </div>
                <div className="co-form-body">
                  <div className="co-grid-2">
                    <div className="co-field">
                      <label className="co-label">Full Name</label>
                      <input name="fullName" required onChange={handleChange} className="co-input" placeholder="Amaka Osei" />
                    </div>
                    <div className="co-field">
                      <label className="co-label">Email Address</label>
                      <input name="email" type="email" required onChange={handleChange} className="co-input" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="co-field">
                    <label className="co-label">Phone Number</label>
                    <input name="phone" required onChange={handleChange} className="co-input" placeholder="+234 000 000 0000" />
                  </div>
                </div>

                {/* Delivery */}
                <div className="co-section-head" style={{ borderTop: "1px solid var(--border)" }}>
                  <span className="co-section-num">2</span>
                  <span className="co-section-title">Delivery Address</span>
                </div>
                <div className="co-form-body" style={{ paddingBottom: "22px" }}>
                  <div className="co-field">
                    <label className="co-label">Street Address</label>
                    <input name="address" required onChange={handleChange} className="co-input" placeholder="House no., street, area" />
                  </div>
                  <div className="co-field">
                    <label className="co-label">State</label>
                    <div className="co-select-wrap">
                      <select name="state" required onChange={handleChange} className="co-select">
                        <option value="">Select State</option>
                        {NIGERIAN_STATES.map(s => (
                          <option key={s} value={s}>{s === "FCT" ? "FCT (Abuja)" : s}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="co-select-icon" />
                    </div>
                  </div>

                  {/* Zone badge */}
                  {deliveryZone && (
                    <div className="co-zone">
                      <MapPin size={11} />
                      {deliveryZone}
                      {isFreeShipping && (
                        <span className="co-zone-free">Free Delivery</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="co-submit-wrap">
                  <button type="submit" className="co-pay-btn">
                    <Lock size={12} />
                    <span>Proceed to Payment</span>
                    <ArrowRight size={12} />
                  </button>
                  <div className="co-trust">
                    <ShieldCheck size={11} />
                    Your information is encrypted and secure
                  </div>
                </div>

              </div>
            </form>
          </div>

          {/* ── Summary ── */}
          <div>
            <div className="co-summary">
              <div className="co-summary-head">
                <h2 className="co-summary-title">Order Summary</h2>
              </div>
              <div className="co-summary-body">

                {/* Items */}
                {cartItems.map((item, i) => (
                  <div key={i} className="co-item">
                    <div className="co-item-img">
                      <img
                        src={item?.image
                          ? (item.image.startsWith("http") ? item.image : `${baseURL}${item.image}`)
                          : "/images/placeholder.png"}
                        alt={item.name}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="co-item-name">{item.name}</p>
                      <span className="co-item-qty">
                        {item.selectedSize ? `${item.selectedSize.label} · ` : ""}Qty {item.quantity}
                      </span>
                    </div>
                    <span className="co-item-price">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="sum-divider" />

                <div className="sum-row">
                  <span className="sum-label">Subtotal</span>
                  <span className="sum-val">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="sum-row">
                  <span className="sum-label">Shipping</span>
                  {form.state
                    ? isFreeShipping
                      ? <span className="sum-free">Free</span>
                      : <span className="sum-val">₦{shippingFee.toLocaleString()}</span>
                    : <span style={{ fontFamily: "'Tenor Sans',sans-serif", fontSize: "10px", color: "var(--warm-grey)", fontStyle: "italic" }}>Enter address</span>
                  }
                </div>

                <div className="sum-divider" />

                <div className="sum-row" style={{ alignItems: "baseline", marginBottom: 0 }}>
                  <span className="sum-total-label">Total</span>
                  <span className="sum-total-val">₦{totalAmount.toLocaleString()}</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Checkout;
