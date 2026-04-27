import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function Wishlist({ wishlist, removeFromWishlist }) {
  const baseURL = import.meta.env.VITE_API_URL;

  return (
    <div className="bg-softwhite min-h-screen">

      {/* HERO */}
      <div className="bg-gray-100 py-20 text-center">
        <h1 className="text-3xl md:text-5xl tracking-[0.4em] font-light">
          YOUR WISHLIST
        </h1>
        <p className="mt-3 text-gray-500 text-sm">
          Items you’ve saved for later
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {wishlist.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              Your wishlist is empty
            </p>
            <Link
              to="/collections"
              className="inline-block border border-black px-6 py-2 text-sm tracking-widest hover:bg-black hover:text-white transition"
            >
              BROWSE PRODUCTS
            </Link>
          </div>
        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {wishlist.map((product) => (
              <div
                key={product._id}
                className="group border bg-white hover:shadow-xl transition duration-300 relative"
              >

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:text-red-600 transition"
                >
                  <Heart size={18} fill="red" />
                </button>

                <Link to={`/product/${product._id}`}>

                  {/* IMAGE */}
                  <div className="w-full aspect-square flex items-center justify-center bg-white">
                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : `${baseURL}${product.image}`
                      }
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* INFO */}
                  <div className="p-4">
                    <h2 className="text-sm uppercase font-semibold tracking-wide">
                      {product.name}
                    </h2>

                    <p className="mt-2 font-semibold text-black">
                      ₦{Number(product.price).toLocaleString()}
                    </p>
                  </div>

                </Link>
              </div>
            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default Wishlist;