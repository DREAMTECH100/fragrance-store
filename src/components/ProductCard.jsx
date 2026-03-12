import { Link } from "react-router-dom"

function ProductCard({ product, addToWishlist, buttonText = "ADD TO CART", buttonLink }) {

  const handleWishlist = (e) => {
    e.preventDefault()
    if (addToWishlist) addToWishlist(product)
  }

  return (
    <div className="bg-white border hover:shadow-lg transition p-4 relative">

      {/* Wishlist Button */}
      {addToWishlist && (
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
        >
          ♥
        </button>
      )}

      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-[180px] object-cover"
        />

        <h3 className="mt-4 text-lg tracking-wide">
          {product.name}
        </h3>

        <p className="text-red-600 mt-1 font-medium">
          ₦{product.price}
        </p>
      </Link>

      {buttonLink ? (
        <Link
          to={buttonLink}
          className="mt-4 block w-full bg-red-600 text-white py-2 text-center tracking-widest hover:bg-red-700 transition"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          className="mt-4 w-full bg-red-600 text-white py-2 tracking-widest hover:bg-red-700 transition"
        >
          {buttonText}
        </button>
      )}

    </div>
  )
}

export default ProductCard