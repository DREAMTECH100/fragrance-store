import { Link } from "react-router-dom"
import { Heart, Star } from "lucide-react"
import { useCart } from "../context/CartContext"

function ProductCard({ product, addToWishlist, buttonText = "ADD TO BAG", buttonLink }) {
  const { addToCart } = useCart()

  const handleWishlist = (e) => {
    e.preventDefault()
    if (addToWishlist) addToWishlist(product)
  }

  const rating = Number(product.rating || product.averageRating || 4)

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white border border-gray-200 hover:shadow-xl transition duration-300 relative cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden">

        {/* Wishlist */}
        {addToWishlist && (
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-red-600 transition"
          >
            <Heart size={18} />
          </button>
        )}

        {/* IMAGE */}
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-[220px] object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 text-white text-sm tracking-widest border border-white px-4 py-2 transition">
            VIEW PRODUCT
          </span>
        </div>

        <div className="absolute bottom-3 right-3 md:hidden flex items-center gap-1 bg-black/60 text-white text-[10px] px-2 py-1 tracking-widest">
          VIEW →
        </div>
        <div className="absolute bottom-3 right-3 md:hidden">
          <span className="block w-2 h-2 bg-white rounded-full animate-ping"></span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 bg-white px-2 py-1 flex items-center gap-1 shadow text-sm">
          <Star size={14} fill="black" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-[15px] tracking-wide font-bold uppercase font-playfair">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-700 mt-1 line-clamp-2 font-cormorant">
            {product.description}
          </p>
        )}

        <p className="mt-2 font-semibold text-black font-playfair">
          ₦{Number(product.price || 0).toLocaleString()}
        </p>

        {/* BUTTON */}
        {buttonLink ? (
          <Link
            to={buttonLink}
            onClick={(e) => e.stopPropagation()}
            className="mt-4 block w-full text-center border border-red-600 text-red-600 py-2 text-sm tracking-widest hover:bg-red-600 hover:text-white transition font-cormorant"
          >
            {buttonText}
          </Link>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addToCart(product)
            }}
            className="mt-4 w-full border border-red-600 text-red-600 py-2 text-sm tracking-widest hover:bg-red-600 hover:text-white transition font-cormorant"
          >
            {buttonText}
          </button>
        )}
      </div>
    </Link>
  )
}

export default ProductCard