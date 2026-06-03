// src/pages/ProductDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { ShoppingBag, MessageCircle, Star, X, ChevronLeft } from "lucide-react";

const PD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Tenor+Sans&display=swap');

  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-pale:  #f5ede0;
    --gold-dim:   rgba(184,150,90,0.18);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --warm-grey:  #7a7065;
  }

  /* ── Loading ── */
  .pd-loading {
    min-height: 60vh;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  @keyframes pd-pulse {
    0%, 100% { opacity: 0.4; } 50% { opacity: 1; }
  }
  .pd-loading span { animation: pd-pulse 1.8s ease infinite; }

  /* ── Breadcrumb ── */
  .pd-breadcrumb {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey);
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 40px;
  }
  .pd-breadcrumb a {
    color: var(--warm-grey); text-decoration: none;
    transition: color 0.2s;
  }
  .pd-breadcrumb a:hover { color: var(--red); }
  .pd-breadcrumb-sep { color: var(--gold); opacity: 0.5; font-size: 8px; }

  /* ── Image panel ── */
  .pd-img-wrap {
    background: linear-gradient(145deg, #fdfaf5, #f5ede0);
    border: 1px solid rgba(184,150,90,0.2);
    position: relative;
    overflow: hidden;
  }
  .pd-img-wrap::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .pd-preorder-ribbon {
    position: absolute; top: 20px; left: 20px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
    background: var(--red); color: #fff; padding: 5px 14px;
    box-shadow: 0 4px 12px rgba(181,43,30,0.3);
    z-index: 5;
  }

  /* ── Detail side ── */
  .pd-category-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--red); margin-bottom: 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .pd-category-label::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--red), transparent);
    opacity: 0.3;
  }

  .pd-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--ink); line-height: 1.1;
    margin: 0 0 16px;
  }

  /* Rating row */
  .pd-rating-row {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 20px;
  }
  .pd-rating-stars { display: flex; gap: 2px; }
  .pd-rating-count {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.15em; color: var(--warm-grey);
  }

  /* Gold divider */
  .pd-rule {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, var(--gold-dim), transparent);
    margin: 20px 0;
  }

  /* Price */
  .pd-price {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 26px; letter-spacing: 0.04em;
    color: var(--gold);
    display: flex; align-items: baseline; gap: 8px;
    margin-bottom: 4px;
  }
  .pd-price-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  /* Description */
  .pd-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-style: italic; font-weight: 300;
    color: var(--warm-grey); line-height: 1.8;
    margin: 0;
  }

  /* Sizes */
  .pd-size-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--ink); margin-bottom: 12px;
  }
  .pd-size-btn {
    padding: 9px 18px;
    border: 1px solid rgba(0,0,0,0.15);
    background: transparent;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink); cursor: pointer;
    transition: all 0.25s ease;
  }
  .pd-size-btn:hover { border-color: var(--gold); color: var(--gold); }
  .pd-size-btn.active {
    background: var(--ink); color: var(--gold-pale);
    border-color: var(--ink);
  }

  /* Quantity */
  .pd-qty-wrap {
    display: flex; align-items: center;
    border: 1px solid rgba(184,150,90,0.3);
    width: fit-content;
    overflow: hidden;
  }
  .pd-qty-btn {
    width: 42px; height: 42px;
    background: transparent; border: none;
    font-family: 'Tenor Sans', sans-serif; font-size: 18px;
    color: var(--ink); cursor: pointer;
    transition: background 0.2s, color 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .pd-qty-btn:hover { background: var(--gold-pale); color: var(--red); }
  .pd-qty-num {
    width: 48px; height: 42px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 18px;
    color: var(--ink); border-left: 1px solid rgba(184,150,90,0.25);
    border-right: 1px solid rgba(184,150,90,0.25);
    user-select: none;
  }

  /* Add to bag */
  .pd-atb {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    width: 100%; padding: 16px 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    background: var(--ink); color: var(--gold-pale);
    transition: color 0.4s ease;
  }
  .pd-atb::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    transform: translateX(-100%);
    transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .pd-atb:hover::before { transform: translateX(0); }
  .pd-atb:hover { color: var(--ink); }
  .pd-atb > * { position: relative; z-index: 1; }
  .pd-atb:disabled {
    background: #ccc; color: #888; cursor: not-allowed;
  }
  .pd-atb:disabled::before { display: none; }

  /* WhatsApp preorder */
  .pd-wa-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 14px 0; margin-top: 12px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    border: 1px solid rgba(37,211,102,0.4); color: #1a7a3c;
    background: rgba(37,211,102,0.06);
    cursor: pointer; text-decoration: none;
    transition: background 0.3s, border-color 0.3s;
  }
  .pd-wa-btn:hover { background: rgba(37,211,102,0.14); border-color: rgba(37,211,102,0.7); }

  /* Note under button */
  .pd-note {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px; font-style: italic;
    color: var(--warm-grey); text-align: center; margin-top: 12px;
    letter-spacing: 0.04em;
  }

  /* ── Reviews section ── */
  .pd-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 3vw, 32px); font-weight: 400;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--ink); margin: 0;
  }
  .pd-review-card {
    border: 1px solid rgba(184,150,90,0.18);
    padding: 20px 24px;
    background: var(--cream);
    transition: border-color 0.3s;
  }
  .pd-review-card:hover { border-color: rgba(184,150,90,0.4); }
  .pd-reviewer {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink); margin-bottom: 6px;
    display: flex; align-items: center; gap: 8px;
  }
  .pd-reviewer::before {
    content: ''; width: 16px; height: 1px; background: var(--gold); opacity: 0.6;
  }
  .pd-review-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-style: italic; font-weight: 300;
    color: var(--warm-grey); line-height: 1.7; margin: 0;
  }

  /* Write review button */
  .pd-write-btn {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    padding: 11px 28px;
    border: 1px solid var(--red); color: var(--red);
    background: transparent; cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  .pd-write-btn:hover { background: var(--red); color: #fff; }

  /* ── Modal ── */
  .pd-modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(14,12,10,0.6);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 50; padding: 20px;
  }
  .pd-modal {
    background: var(--cream);
    width: 100%; max-width: 460px;
    border: 1px solid rgba(184,150,90,0.25);
    box-shadow: 0 32px 80px rgba(0,0,0,0.25);
    position: relative;
    overflow: hidden;
  }
  .pd-modal::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
  }
  .pd-modal-header {
    padding: 28px 28px 0;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .pd-modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 400;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink);
  }
  .pd-modal-close {
    background: none; border: none; cursor: pointer;
    color: var(--warm-grey); transition: color 0.2s; padding: 0;
  }
  .pd-modal-close:hover { color: var(--red); }
  .pd-modal-body { padding: 24px 28px 28px; }
  .pd-input {
    width: 100%; padding: 12px 0;
    border: none; border-bottom: 1px solid rgba(0,0,0,0.12);
    background: transparent;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 300; letter-spacing: 0.03em;
    color: var(--ink); outline: none; margin-bottom: 20px;
    transition: border-color 0.3s;
  }
  .pd-input:focus { border-bottom-color: var(--gold); }
  .pd-input::placeholder { color: rgba(14,12,10,0.3); font-style: italic; }
  .pd-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 14px 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
    background: var(--ink); color: var(--gold-pale);
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.4s;
  }
  .pd-submit-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    transform: translateX(-100%);
    transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .pd-submit-btn:hover::before { transform: translateX(0); }
  .pd-submit-btn:hover { color: var(--ink); }
  .pd-submit-btn > * { position: relative; z-index: 1; }

  /* Related section */
  .pd-related-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 3vw, 32px); font-weight: 400;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink);
  }
  .pd-related-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--red); margin-bottom: 8px;
  }
`;

function ProductDetails({ addToWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewName, setReviewName] = useState("");

  const baseURL = import.meta.env.VITE_API_URL;
  const WHATSAPP_NUMBER = "2348062392555";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetch(`${baseURL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p._id === id);
        setProduct(found);
        if (found?.sizes?.length > 0) setSelectedSize(found.sizes[0]);
        const filtered = data.filter((p) => p.category === found.category && p._id !== found._id);
        setRelated(filtered);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${baseURL}/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => setReviews([]));
  }, [id]);

  if (!product) {
    return (
      <div className="pd-loading">
        <style>{PD_STYLES}</style>
        <span>Loading…</span>
      </div>
    );
  }

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => { if (quantity > 1) setQuantity((q) => q - 1); };
  const activePrice = selectedSize?.price || product.price;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedSize, price: activePrice });
    navigate("/cart");
  };

  const submitReview = async () => {
    if (!reviewText || !reviewName) return;
    const res = await fetch(`${baseURL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id, name: reviewName, comment: reviewText }),
    });
    const data = await res.json();
    setReviews((prev) => [data, ...prev]);
    setReviewText(""); setReviewName(""); setShowReviewModal(false);
  };

  const avgRating = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + (r.rating || 4), 0) / reviews.length)
    : Number(product.rating || 4);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <style>{PD_STYLES}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── Breadcrumb ── */}
        <div className="pd-breadcrumb">
          <a href="/">Home</a>
          <span className="pd-breadcrumb-sep">✦</span>
          <a href={`/${product.category}`}>{product.category}</a>
          <span className="pd-breadcrumb-sep">✦</span>
          <span style={{ color: "var(--ink)" }}>{product.name}</span>
        </div>

        {/* ── TOP: Image + Details ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}
          className="block md:grid">

          {/* IMAGE */}
          <div className="pd-img-wrap" style={{ width: "100%", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {product.isPreorder && <div className="pd-preorder-ribbon">Pre-order</div>}
            <img
              src={product?.image
                ? product.image.startsWith("http") ? product.image : `${baseURL}${product.image}`
                : "/images/placeholder.png"}
              alt={product.name}
              style={{ maxWidth: "88%", maxHeight: "88%", objectFit: "contain" }}
            />
          </div>

          {/* DETAILS */}
          <div style={{ paddingTop: "8px" }}>

            {/* Category label */}
            <div className="pd-category-label">{product.category}</div>

            {/* Title */}
            <h1 className="pd-title">{product.name}</h1>

            {/* Stars */}
            <div className="pd-rating-row">
              <div className="pd-rating-stars">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13}
                    fill={s <= avgRating ? "#b8965a" : "none"}
                    stroke={s <= avgRating ? "#b8965a" : "#ccc"}
                  />
                ))}
              </div>
              <span className="pd-rating-count">
                {reviews.length > 0 ? `${reviews.length} review${reviews.length > 1 ? "s" : ""}` : "Be the first to review"}
              </span>
            </div>

            {/* Gold rule */}
            <div className="pd-rule" />

            {/* Price */}
            <div className="pd-price-label">Price</div>
            <div className="pd-price">₦{activePrice?.toLocaleString()}</div>

            {/* Pre-order notice */}
            {product.isPreorder && (
              <p style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginTop: "4px", marginBottom: "12px" }}>
                Pre-order item — confirm availability before purchase
              </p>
            )}

            <div className="pd-rule" />

            {/* Description */}
            <p className="pd-desc">{product.description}</p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div style={{ marginTop: "28px" }}>
                <p className="pd-size-label">Select Size</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`pd-size-btn${selectedSize?.label === size.label ? " active" : ""}`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginTop: "28px" }}>
              <p className="pd-size-label" style={{ marginBottom: "12px" }}>Quantity</p>
              <div className="pd-qty-wrap">
                <button className="pd-qty-btn" onClick={decrease}>−</button>
                <div className="pd-qty-num">{quantity}</div>
                <button className="pd-qty-btn" onClick={increase}>+</button>
              </div>
            </div>

            {/* Add to Bag */}
            <div style={{ marginTop: "28px" }}>
              <button
                onClick={handleAddToCart}
                disabled={product.isPreorder}
                className="pd-atb"
              >
                <ShoppingBag size={15} />
                <span>{product.isPreorder ? "Pre-order — Contact Admin" : "Add to Bag"}</span>
              </button>

              {/* WhatsApp for preorder */}
              {product.isPreorder && (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I want to confirm preorder availability for ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-wa-btn"
                >
                  <MessageCircle size={14} />
                  <span>Chat Admin on WhatsApp</span>
                </a>
              )}

              <p className="pd-note">Authentic luxury — delivered to your door.</p>
            </div>
          </div>
        </div>

        {/* ── Gold section rule ── */}
        <div style={{ margin: "72px 0 0", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold-dim), var(--gold), var(--gold-dim), transparent)" }} />

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <p className="pd-related-label">You May Also Love</p>
            <h2 className="pd-related-title">Similar Products</h2>
            <div style={{ height: "1px", width: "48px", background: "var(--red)", margin: "12px 0 36px", opacity: 0.7 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              {related.slice(0, 4).map((item) => (
                <ProductCard key={item._id} product={item} addToWishlist={addToWishlist} />
              ))}
            </div>
          </div>
        )}

        {/* ── Gold section rule ── */}
        <div style={{ margin: "72px 0 0", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold-dim), var(--gold), var(--gold-dim), transparent)" }} />

        {/* ── REVIEWS ── */}
        <div style={{ marginTop: "64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p className="pd-related-label">What Clients Say</p>
              <h2 className="pd-section-title">Customer Reviews</h2>
              <div style={{ height: "1px", width: "48px", background: "var(--red)", marginTop: "10px", opacity: 0.7 }} />
            </div>
            <button onClick={() => setShowReviewModal(true)} className="pd-write-btn">
              Write a Review
            </button>
          </div>

          {reviews.length === 0 ? (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontStyle: "italic", color: "var(--warm-grey)" }}>
              No reviews yet — be the first to share your experience.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {reviews.map((r, i) => (
                <div key={i} className="pd-review-card">
                  <p className="pd-reviewer">{r.name}</p>
                  <p className="pd-review-text">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── REVIEW MODAL ── */}
      {showReviewModal && (
        <div className="pd-modal-backdrop" onClick={() => setShowReviewModal(false)}>
          <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3 className="pd-modal-title">Write a Review</h3>
              <button className="pd-modal-close" onClick={() => setShowReviewModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="pd-modal-body">
              <div style={{ height: "1px", background: "linear-gradient(90deg, var(--gold-dim), transparent)", marginBottom: "24px" }} />
              <input
                className="pd-input"
                placeholder="Your name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
              />
              <textarea
                className="pd-input"
                placeholder="Share your experience…"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                style={{ resize: "none", minHeight: "100px" }}
              />
              <button onClick={submitReview} className="pd-submit-btn">
                <Star size={13} />
                <span>Submit Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
