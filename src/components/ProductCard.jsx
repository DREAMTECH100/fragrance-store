import { Link } from "react-router-dom"
import { Heart, Star, ShoppingBag, MessageCircle } from "lucide-react"
import { useCart } from "../context/CartContext"

const CARD_STYLES = `
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

  /* ── Card shell ── */
  .pc-card {
    display: block;
    background: var(--cream);
    position: relative;
    text-decoration: none;
    color: var(--ink);
    transition: box-shadow 0.45s ease, transform 0.45s ease;
    border: 1px solid rgba(184,150,90,0.2);
    overflow: hidden;
  }
  .pc-card:hover {
    box-shadow: 0 24px 60px rgba(0,0,0,0.13), 0 0 0 1px rgba(184,150,90,0.3);
    transform: translateY(-4px);
  }

  /* ── Gold bottom line sweep ── */
  .pc-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
    z-index: 10;
  }
  .pc-card:hover::before { transform: scaleX(1); }

  /* ── Image zoom ── */
  .pc-img {
    transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .pc-card:hover .pc-img { transform: scale(1.07); }

  /* ── Hover overlay ── */
  .pc-overlay {
    position: absolute; inset: 0;
    background: rgba(14,12,10,0);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.4s ease;
    pointer-events: none;
  }
  .pc-card:hover .pc-overlay {
    background: rgba(14,12,10,0.28);
  }
  .pc-overlay-label {
    opacity: 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9.5px; letter-spacing: 0.4em; text-transform: uppercase;
    color: #fff;
    border: 1px solid rgba(212,175,114,0.8);
    padding: 10px 26px;
    background: rgba(14,12,10,0.25);
    backdrop-filter: blur(4px);
    transition: opacity 0.35s ease, transform 0.35s ease;
    transform: translateY(6px);
  }
  .pc-card:hover .pc-overlay-label {
    opacity: 1; transform: translateY(0);
  }

  /* ── Wishlist ── */
  .pc-wishlist {
    position: absolute; top: 12px; right: 12px; z-index: 20;
    width: 32px; height: 32px;
    background: rgba(253,250,245,0.92);
    border: 1px solid rgba(184,150,90,0.3);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.25s ease;
    backdrop-filter: blur(4px);
  }
  .pc-wishlist:hover {
    background: var(--red);
    border-color: var(--red);
    box-shadow: 0 4px 16px rgba(181,43,30,0.35);
  }
  .pc-wishlist:hover svg { stroke: #fff !important; }

  /* ── Pre-order badge ── */
  .pc-preorder-badge {
    position: absolute; top: 12px; left: 12px; z-index: 20;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 8.5px; letter-spacing: 0.28em; text-transform: uppercase;
    background: var(--red); color: #fff; padding: 4px 11px;
    box-shadow: 0 2px 8px rgba(181,43,30,0.3);
  }

  /* ── Rating ── */
  .pc-rating {
    position: absolute; bottom: 12px; left: 12px; z-index: 10;
    display: flex; align-items: center; gap: 4px;
    background: rgba(253,250,245,0.92);
    padding: 4px 9px;
    font-family: 'Tenor Sans', sans-serif; font-size: 10.5px; color: var(--ink);
    border: 1px solid rgba(184,150,90,0.25);
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }

  /* ── GOLD INFO PANEL ── */
  .pc-info {
    background: linear-gradient(160deg, #1a1108 0%, #2a1d0e 40%, #1e150a 100%);
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  /* Subtle gold shimmer line at top of panel */
  .pc-info::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  /* Decorative gold corner accent */
  .pc-info::after {
    content: '';
    position: absolute; bottom: -30px; right: -30px;
    width: 100px; height: 100px;
    background: radial-gradient(circle, rgba(184,150,90,0.12) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* Inner padding wrapper */
  .pc-info-inner {
    padding: 16px 16px 0;
    position: relative; z-index: 1;
  }

  .pc-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #f5ede0;
    line-height: 1.25; margin: 0 0 5px;
  }

  .pc-price {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 15px;
    color: var(--gold-light);
    letter-spacing: 0.04em;
    margin: 0 0 7px;
    display: flex; align-items: center; gap: 6px;
  }
  .pc-price::before {
    content: '';
    display: inline-block; width: 16px; height: 1px;
    background: var(--gold); opacity: 0.6;
  }

  .pc-desc {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12.5px; font-style: italic;
    color: rgba(245,237,224,0.5);
    line-height: 1.55; margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pc-preorder-note {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
    color: #e88; margin: 5px 0 0;
  }

  /* ── ADD TO BAG BUTTON — luxury treatment ── */
  .pc-btn-wrap {
    margin-top: 14px;
    position: relative;
    overflow: hidden;
  }

  .pc-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9.5px; letter-spacing: 0.35em; text-transform: uppercase;
    padding: 13px 0;
    background: transparent;
    border: none;
    border-top: 1px solid rgba(184,150,90,0.25);
    color: rgba(245,237,224,0.7);
    cursor: pointer;
    position: relative;
    transition: color 0.35s ease;
    text-decoration: none;
    overflow: hidden;
  }

  /* Gold fill slides up from bottom */
  .pc-btn::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    transition: top 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .pc-btn:hover::before { top: 0; }
  .pc-btn:hover { color: var(--ink); }
  .pc-btn > * { position: relative; z-index: 1; }

  /* Pre-order variant — red fill */
  .pc-btn-preorder {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9.5px; letter-spacing: 0.35em; text-transform: uppercase;
    padding: 13px 0;
    background: transparent;
    border: none;
    border-top: 1px solid rgba(184,150,90,0.2);
    color: rgba(245,237,224,0.55);
    cursor: pointer;
    position: relative;
    transition: color 0.35s ease;
    text-decoration: none;
    overflow: hidden;
  }
  .pc-btn-preorder::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: linear-gradient(135deg, var(--red), var(--red-deep));
    transition: top 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .pc-btn-preorder:hover::before { top: 0; }
  .pc-btn-preorder:hover { color: #fff; }
  .pc-btn-preorder > * { position: relative; z-index: 1; }

  /* Mobile hint */
  .pc-mobile-cta {
    position: absolute; bottom: 12px; right: 12px; z-index: 10;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 8.5px; letter-spacing: 0.22em; text-transform: uppercase;
    background: rgba(14,12,10,0.65); color: rgba(212,175,114,0.9);
    padding: 4px 10px; backdrop-filter: blur(4px);
    border: 1px solid rgba(184,150,90,0.2);
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

        {/* ── IMAGE SECTION ── */}
        <div style={{ position: "relative", overflow: "hidden", background: "#f9f6f1" }}>

          {product.isPreorder && (
            <div className="pc-preorder-badge">Pre-order</div>
          )}

          {addToWishlist && (
            <button onClick={handleWishlist} className="pc-wishlist" aria-label="Add to wishlist">
              <Heart size={13} style={{ color: "var(--gold)", transition: "color 0.2s" }} />
            </button>
          )}

          {/* Product image */}
          <div style={{
            width: "100%", aspectRatio: "1/1",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(145deg, #fdfaf5, #f5ede0)",
            overflow: "hidden",
          }}>
            <img
              src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
              alt={product.name}
              className="pc-img"
              style={{ maxHeight: "92%", maxWidth: "92%", objectFit: "contain" }}
            />
          </div>

          {/* Hover overlay */}
          <div className="pc-overlay">
            <span className="pc-overlay-label">View Product</span>
          </div>

          {/* Mobile CTA */}
          <div className="pc-mobile-cta md:hidden">View →</div>

          {/* Rating */}
          <div className="pc-rating">
            <Star size={11} fill="var(--gold)" stroke="none" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* ── GOLD DARK INFO PANEL ── */}
        <div className="pc-info">
          <div className="pc-info-inner">

            {/* Name */}
            <h3 className="pc-name">{product.name}</h3>

            {/* Price */}
            <p className="pc-price">₦{Number(product.price || 0).toLocaleString()}</p>

            {/* Pre-order note */}
            {product.isPreorder && (
              <p className="pc-preorder-note">Pre-order — chat admin to confirm availability</p>
            )}

            {/* Description */}
            {product.description && (
              <p className="pc-desc">{product.description}</p>
            )}
          </div>

          {/* ── ADD TO BAG ── */}
          <div className="pc-btn-wrap">
            {buttonLink ? (
              <Link
                to={buttonLink}
                onClick={(e) => e.stopPropagation()}
                className="pc-btn"
              >
                <ShoppingBag size={12} />
                <span>{buttonText}</span>
              </Link>
            ) : (
              <button
                onClick={handleCartClick}
                className={product.isPreorder ? "pc-btn-preorder" : "pc-btn"}
                style={{ width: "100%" }}
              >
                {product.isPreorder
                  ? <><MessageCircle size={12} /><span>Pre-order via WhatsApp</span></>
                  : <><ShoppingBag size={12} /><span>{buttonText}</span></>
                }
              </button>
            )}
          </div>

        </div>

      </Link>
    </>
  )
}

export default ProductCard
