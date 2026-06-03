import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

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
  .cart-page {
    min-height: 100vh;
    background: var(--offwhite);
  }
  .cart-top-rule { height: 3px; background: var(--red); }

  /* ─── Header ─── */
  .cart-header {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 52px 24px 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cart-header::before {
    content: '';
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 80px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .cart-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase;
    color: var(--red); margin: 0 0 12px; display: block;
  }
  .cart-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2.6rem, 6vw, 4.5rem);
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink); line-height: 1; margin: 0;
  }

  /* ─── Layout ─── */
  .cart-body {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: start;
  }
  @media (min-width: 860px) {
    .cart-body { grid-template-columns: 1fr 340px; gap: 36px; }
  }

  /* ─── Empty ─── */
  .cart-empty {
    text-align: center; padding: 80px 24px; max-width: 400px; margin: 0 auto;
  }
  .cart-empty-icon {
    width: 60px; height: 60px; margin: 0 auto 22px;
    border: 1px solid var(--border); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold);
  }
  .cart-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: 1.9rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--warm-grey); margin: 0 0 6px;
  }
  .cart-empty-sub {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(122,112,101,0.6); margin: 0 0 32px;
  }

  /* ─── Items panel ─── */
  .cart-panel {
    background: #fff;
    border: 1px solid var(--border);
    overflow: hidden;
  }
  .cart-panel-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 15px 22px;
    border-bottom: 1px solid var(--border);
  }
  .cart-panel-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .cart-count-chip {
    font-family: 'Tenor Sans', sans-serif; font-size: 9px;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: var(--gold-dim); color: var(--gold);
    border: 1px solid rgba(184,150,90,0.28);
    padding: 3px 11px;
  }

  /* ─── Cart row ─── */
  .cart-row {
    display: grid;
    grid-template-columns: 96px 1fr 28px;
    gap: 18px;
    padding: 22px;
    border-bottom: 1px solid rgba(184,150,90,0.1);
    align-items: start;
    transition: background 0.25s ease;
  }
  .cart-row:last-child { border-bottom: none; }
  .cart-row:hover { background: var(--offwhite); }

  .cart-img {
    width: 96px; height: 96px; flex-shrink: 0;
    background: linear-gradient(145deg, #fdfaf5, #f5ede0);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .cart-img img {
    max-width: 88%; max-height: 88%; object-fit: contain;
    transition: transform 0.65s ease;
  }
  .cart-row:hover .cart-img img { transform: scale(1.07); }

  .cart-item-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 4px; line-height: 1.2;
  }
  .cart-item-meta {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--warm-grey); margin-bottom: 8px;
  }
  .cart-item-unit {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.08em; color: var(--warm-grey);
  }
  .cart-item-total {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 14px; color: var(--gold);
    letter-spacing: 0.05em; margin-top: 5px;
  }

  /* Qty controls */
  .cart-qty {
    display: inline-flex; align-items: center;
    border: 1px solid var(--border); margin-top: 14px;
  }
  .cart-qty-btn {
    width: 30px; height: 30px;
    background: transparent; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--warm-grey); transition: background 0.2s, color 0.2s;
  }
  .cart-qty-btn:hover { background: var(--ink); color: #fff; }
  .cart-qty-val {
    width: 34px; text-align: center; line-height: 30px;
    font-family: 'Tenor Sans', sans-serif; font-size: 12px;
    color: var(--ink); letter-spacing: 0.1em;
    border-left: 1px solid var(--border); border-right: 1px solid var(--border);
  }

  /* Remove btn */
  .cart-remove {
    background: none; border: none; cursor: pointer; padding: 3px;
    color: rgba(184,150,90,0.45); transition: color 0.25s;
    margin-top: 2px;
  }
  .cart-remove:hover { color: var(--red); }

  /* ─── Summary panel ─── */
  .cart-summary {
    background: #fff;
    border: 1px solid var(--border);
    overflow: hidden;
    position: sticky; top: 90px;
  }
  .cart-summary-head {
    padding: 17px 22px;
    background: linear-gradient(160deg, #1a1108 0%, #2a1d0e 45%, #1e150a 100%);
    position: relative;
  }
  .cart-summary-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .cart-summary-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 400;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #f5ede0; margin: 0;
  }
  .cart-summary-body { padding: 22px; }

  .sum-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 13px;
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
  .sum-note {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; color: var(--warm-grey); font-style: italic;
    line-height: 1.6;
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

  /* ─── Buttons ─── */
  .btn-checkout {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 15px 0; margin-top: 20px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    background: var(--ink); color: #f5ede0;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.35s ease;
  }
  .btn-checkout::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: linear-gradient(135deg, var(--red), var(--red-deep));
    transition: top 0.42s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .btn-checkout:hover::before { top: 0; }
  .btn-checkout:hover { color: #fff; }
  .btn-checkout > * { position: relative; z-index: 1; }

  .btn-continue {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px 0; margin-top: 10px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase;
    background: transparent; color: var(--warm-grey);
    border: 1px solid var(--border); cursor: pointer;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
  }
  .btn-continue:hover {
    border-color: var(--gold); color: var(--gold);
    background: var(--gold-dim);
  }
`;

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity, 0
  );
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <style>{STYLES}</style>
      <div className="cart-page">

        <div className="cart-top-rule" />

        {/* Header */}
        <div className="cart-header">
          <span className="cart-eyebrow">Your Selection</span>
          <h1 className="cart-title">The Bag</h1>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty" style={{ margin: "0 auto" }}>
            <div className="cart-empty-icon">
              <ShoppingBag size={22} />
            </div>
            <h2 className="cart-empty-title">Your bag is empty</h2>
            <p className="cart-empty-sub">No pieces added yet</p>
            <button className="btn-continue" onClick={() => navigate("/fragrances")}>
              Explore the Collection
            </button>
          </div>
        ) : (
          <div className="cart-body">

            {/* ── Items ── */}
            <div>
              <div className="cart-panel">
                <div className="cart-panel-head">
                  <span className="cart-panel-label">Items in your bag</span>
                  <span className="cart-count-chip">{totalQty} {totalQty === 1 ? "piece" : "pieces"}</span>
                </div>

                {cart.map((item) => {
                  const sizeKey = item.selectedSize?.label || "default";
                  return (
                    <div key={`${item._id}-${sizeKey}`} className="cart-row">

                      {/* Image */}
                      <div className="cart-img">
                        <img
                          src={item?.image
                            ? (item.image.startsWith("http") ? item.image : `${baseURL}${item.image}`)
                            : "/images/placeholder.png"}
                          alt={item.name}
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        {item.selectedSize && (
                          <p className="cart-item-meta">Size: {item.selectedSize.label}</p>
                        )}
                        <p className="cart-item-unit">
                          ₦{Number(item.price).toLocaleString()} each
                        </p>
                        <p className="cart-item-total">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>

                        {/* Qty */}
                        <div className="cart-qty">
                          <button className="cart-qty-btn" onClick={() => decreaseQty(item._id, sizeKey)}>
                            <Minus size={11} />
                          </button>
                          <span className="cart-qty-val">{item.quantity}</span>
                          <button className="cart-qty-btn" onClick={() => increaseQty(item._id, sizeKey)}>
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button className="cart-remove" onClick={() => removeFromCart(item._id, sizeKey)} aria-label="Remove item">
                        <Trash2 size={15} />
                      </button>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Summary ── */}
            <div>
              <div className="cart-summary">
                <div className="cart-summary-head">
                  <h2 className="cart-summary-title">Order Summary</h2>
                </div>
                <div className="cart-summary-body">

                  <div className="sum-row">
                    <span className="sum-label">Subtotal</span>
                    <span className="sum-val">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="sum-row" style={{ marginBottom: 0 }}>
                    <span className="sum-label">Shipping</span>
                    <span className="sum-val" style={{ fontSize: "11px", color: "var(--warm-grey)", fontStyle: "italic" }}>
                      At checkout
                    </span>
                  </div>

                  <div className="sum-divider" />

                  <div className="sum-row" style={{ alignItems: "baseline", marginBottom: 4 }}>
                    <span className="sum-total-label">Estimated Total</span>
                    <span className="sum-total-val">₦{total.toLocaleString()}</span>
                  </div>
                  <p className="sum-note">Shipping calculated at checkout.</p>

                  <button className="btn-checkout" onClick={() => navigate("/checkout")}>
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={13} />
                  </button>
                  <button className="btn-continue" onClick={() => navigate("/fragrances")}>
                    Continue Shopping
                  </button>

                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
