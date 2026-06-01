import { Link } from "react-router-dom"
import { Heart, Star, ShoppingBag, MessageCircle } from "lucide-react"
import { useCart } from "../context/CartContext"

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
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      )
      return
    }

    addToCart(product)
  }

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block relative cursor-pointer"
      style={{ fontFamily: "inherit" }}
    >
      <div
        className="relative bg-[#faf9f7] overflow-hidden"
        style={{
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
          transition: "box-shadow 0.35s ease, transform 0.35s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(0,0,0,0.13)"
          e.currentTarget.style.transform = "translateY(-3px)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "0 2px 8px 0 rgba(0,0,0,0.06)"
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        {/* ── IMAGE AREA ── */}
        <div className="relative overflow-hidden bg-[#f4f2ef]" style={{ aspectRatio: "1 / 1" }}>

          {/* PREORDER BADGE */}
          {product.isPreorder && (
            <div
              className="absolute top-0 left-0 z-20 text-white text-[9px] px-3 py-[5px] uppercase tracking-[0.18em] font-semibold"
              style={{ background: "#b91c1c", letterSpacing: "0.18em" }}
            >
              Pre-order
            </div>
          )}

          {/* WISHLIST */}
          {addToWishlist && (
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 z-20 rounded-full p-2 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                color: "#9ca3af",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#dc2626"; e.currentTarget.style.transform = "scale(1.12)" }}
              onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.transform = "scale(1)" }}
            >
              <Heart size={16} />
            </button>
          )}

          {/* PRODUCT IMAGE */}
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `${baseURL}${product.image}`
            }
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ padding: "12px" }}
          />

          {/* HOVER OVERLAY */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-5 transition-all duration-300"
            style={{ background: "rgba(0,0,0,0)", pointerEvents: "none" }}
          >
            <span
              className="text-white text-[11px] tracking-[0.22em] uppercase border border-white/80 px-5 py-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(2px)", transform: "translateY(8px)" }}
            >
              View Product
            </span>
          </div>
          {/* Fix pointer events on overlay above (CSS-only trick via group) */}
          <style>{`
            .group:hover .hover-overlay { background: rgba(0,0,0,0.28); }
            .group:hover .hover-label { opacity: 1; transform: translateY(0); }
          `}</style>

          {/* RATING BADGE */}
          <div
            className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold"
            style={{
              background: "rgba(255,255,255,0.96)",
              padding: "3px 8px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
              letterSpacing: "0.04em",
            }}
          >
            <Star size={11} fill="#1a1a1a" strokeWidth={0} />
            <span style={{ color: "#1a1a1a" }}>{rating.toFixed(1)}</span>
          </div>

          {/* MOBILE CTA DOT */}
          <div className="absolute bottom-3 right-3 md:hidden">
            <span className="block w-2 h-2 bg-white rounded-full animate-ping"></span>
          </div>
        </div>

        {/* ── INFO AREA ── */}
        <div
          className="p-4 pb-5"
          style={{ borderTop: "1px solid #ede9e3", background: "#fff" }}
        >
          {/* NAME */}
          <h3
            className="text-[13px] uppercase font-bold tracking-[0.12em] leading-tight font-playfair"
            style={{ color: "#1a1a1a" }}
          >
            {product.name}
          </h3>

          {/* PRICE */}
          <p
            className="mt-1 text-[15px] font-semibold font-playfair"
            style={{ color: "#1a1a1a", letterSpacing: "0.02em" }}
          >
            ₦{Number(product.price || 0).toLocaleString()}
          </p>

          {/* PREORDER NOTE */}
          {product.isPreorder && (
            <p
              className="text-[10px] uppercase tracking-[0.14em] mt-1"
              style={{ color: "#b91c1c" }}
            >
              Pre-order — chat admin to confirm
            </p>
          )}

          {/* DESCRIPTION */}
          {product.description && (
            <p
              className="text-[12px] mt-2 line-clamp-2 font-cormorant"
              style={{ color: "#6b7280", lineHeight: "1.55" }}
            >
              {product.description}
            </p>
          )}

          {/* DIVIDER */}
          <div className="mt-3 mb-3" style={{ height: "1px", background: "#ede9e3" }} />

          {/* BUTTON */}
          {buttonLink ? (
            <Link
              to={buttonLink}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full text-center py-[10px] text-[11px] tracking-[0.18em] uppercase font-cormorant transition-all duration-200"
              style={{
                border: "1.5px solid #dc2626",
                color: "#dc2626",
                background: "transparent",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#dc2626" }}
            >
              <ShoppingBag size={13} />
              {buttonText}
            </Link>
          ) : (
            <button
              onClick={handleCartClick}
              className="flex items-center justify-center gap-2 w-full py-[10px] text-[11px] tracking-[0.18em] uppercase font-cormorant transition-all duration-200"
              style={
                product.isPreorder
                  ? { border: "1.5px solid #9ca3af", color: "#6b7280", background: "transparent" }
                  : { border: "1.5px solid #dc2626", color: "#dc2626", background: "transparent" }
              }
              onMouseEnter={e => {
                if (product.isPreorder) {
                  e.currentTarget.style.background = "#1a1a1a"
                  e.currentTarget.style.color = "#fff"
                  e.currentTarget.style.borderColor = "#1a1a1a"
                } else {
                  e.currentTarget.style.background = "#dc2626"
                  e.currentTarget.style.color = "#fff"
                }
              }}
              onMouseLeave={e => {
                if (product.isPreorder) {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#6b7280"
                  e.currentTarget.style.borderColor = "#9ca3af"
                } else {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#dc2626"
                }
              }}
            >
              {product.isPreorder
                ? <><MessageCircle size={13} /> Pre-order via WhatsApp</>
                : <><ShoppingBag size={13} /> {buttonText}</>
              }
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
