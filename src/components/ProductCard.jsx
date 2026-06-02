import { Link } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import { useCart } from "../context/CartContext"

const CARD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&display=swap');

  :root {
    --red: #c0392b;
    --gold: #b8965a;
    --ink: #0e0c0a;
    --warm-grey: #8a8178;
  }

  .pc-card {
    display: block;
    background: #fff;
    position: relative;
    text-decoration: none;
    color: var(--ink);
    transition: box-shadow 0.4s ease, transform 0.4s ease;
    border: 1px solid rgba(0,0,0,0.07);
    overflow: hidden;
  }
  .pc-card:hover {
    box-shadow: 0 20px 50px rgba(0,0,0,0.11);
    transform: translateY(-3px);
  }

  /* Thin red bottom sweep on hover */
  .pc-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--red);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.45s ease;
  }
  .pc-card:hover::after { transform: scaleX(1); }

  /* Image zoom */
  .pc-img {
    transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .pc-card:hover .pc-img { transform: scale(1.06); }

  /* Overlay */
  .pc-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.35s ease;
    pointer-events: none;
  }
  .pc-card:hover .pc-overlay { background: rgba(0,0,0,0.32); }

  .pc-overlay-label {
    opacity: 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.75);
    padding: 10px 24px;
    transition: opacity 0.3s ease;
  }
  .pc-card:hover .pc-overlay-label { opacity: 1; }

  /* Wishlist */
  .pc-wishlist {
    position: absolute; top: 12px; right: 12px; z-index: 20;
    width: 32px; height: 32px;
    background: #fff;
    border: 1px solid rgba(0,0,0,0.09);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: background 0.25s, border-color 0.25s;
  }
  .pc-wishlist:hover { background: var(--red); border-color: var(--red); }
  .pc-wishlist:hover svg { stroke: #fff !important; }

  /* Pre-order badge */
  .pc-preorder-badge {
    position: absolute; top: 12px; left: 12px; z-index: 20;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    background: var(--red); color: #fff;
    padding: 4px 10px;
  }

  /* Rating */
  .pc-rating {
    position: absolute; bottom: 12px; left: 12px; z-index: 10;
    display: flex; align-items: center; gap: 4px;
    background: #fff; padding: 4px 8px;
    font-family: 'Tenor Sans', sans-serif; font-size: 11px; color: var(--ink);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.06);
  }

  /* Info */
  .pc-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--ink); line-height: 1.3; margin: 0 0 6px;
  }
  .pc-price {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 13px; color: var(--gold);
    letter-spacing: 0.06em; margin: 0 0 6px;
  }
  .pc-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-style: italic;
    color: var(--warm-grey); line-height: 1.6; margin: 0 0 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .pc-preorder-note {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--red); margin: 4px 0 12px;
  }

  /* Buttons */
  .pc-btn {
    display: block; width: 100%; text-align: center;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    padding: 11px 0;
    border: 1px solid var(--red); color: var(--red);
    background: transparent; cursor: pointer;
    transition: background 0.3s, color 0.3s;
    text-decoration: none;
  }
  .pc-btn:hover { background: var(--red); color: #fff; }

  .pc-btn-preorder {
    display: block; width: 100%; text-align: center;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    padding: 11px 0;
    border: 1px solid rgba(0,0,0,0.18); color: var(--warm-grey);
    background: transparent; cursor: pointer;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
    text-decoration: none;
  }
  .pc-btn-preorder:hover { background: var(--ink); color: #fff; border-color: var(--ink); }

  .pc-mobile-cta {
    position: absolute; bottom: 12px; right: 12px; z-index: 10;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    background: rgba(0,0,0,0.6); color: #fff;
    padding: 4px 10px;
  }
`

function ProductCard({ product, addToWishlist, buttonText = "ADD TO BAG", buttonLink }) {
  const { addToCart } = useCart()
  const baseURL = import.meta.env.VITE_API_URL
  const WHATSAPP_NUMBER = "2348062392555"

  const handleWishlist = (e) => {
    e.preventDefault()
    if (addToWishlist) addToWishlist(product)
  }

  const rating = Number(product.rating || product.averageRating || 4)

  const handleCartClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.isPreorder) {
      const message = `Hi, I want to confirm preorder for: ${product.name}`
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
      return
    }
    addToCart(product)
  }

  return (
    <>
      <style>{CARD_STYLES}</style>

      <Link to={`/product/${product._id}`} className="pc-card">

        {/* ── IMAGE ── */}
        <div style={{ position: "relative", overflow: "hidden", background: "#fff" }}>

          {product.isPreorder && (
            <div className="pc-preorder-badge">Pre-order</div>
          )}

          {addToWishlist && (
            <button onClick={handleWishlist} className="pc-wishlist" aria-label="Add to wishlist">
              <Heart size={14} style={{ color: "var(--ink)" }} />
            </button>
          )}

          <div style={{ width: "100%", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", overflow: "hidden" }}>
            <img
              src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
              alt={product.name}
              className="pc-img"
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          </div>

          <div className="pc-overlay">
            <span className="pc-overlay-label">View Product</span>
          </div>

          <div className="pc-mobile-cta md:hidden">View →</div>

          <div className="pc-rating">
            <Star size={12} fill="#b8965a" stroke="none" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* ── INFO ── */}
        <div style={{ padding: "16px 16px 20px" }}>

          {/* Red accent rule */}
          <div style={{ width: "24px", height: "1px", background: "var(--red)", marginBottom: "10px", opacity: 0.65 }} />

          <h3 className="pc-name">{product.name}</h3>
          <p className="pc-price">₦{Number(product.price || 0).toLocaleString()}</p>

          {product.isPreorder && (
            <p className="pc-preorder-note">Pre-order — chat admin to confirm availability</p>
          )}

          {product.description && (
            <p className="pc-desc">{product.description}</p>
          )}

          {buttonLink ? (
            <Link
              to={buttonLink}
              onClick={(e) => e.stopPropagation()}
              className="pc-btn"
            >
              {buttonText}
            </Link>
          ) : (
            <button
              onClick={handleCartClick}
              className={product.isPreorder ? "pc-btn-preorder" : "pc-btn"}
              style={{ width: "100%" }}
            >
              {product.isPreorder ? "Pre-order via WhatsApp" : buttonText}
            </button>
          )}
        </div>

      </Link>
    </>
  )
}

export default ProductCard
