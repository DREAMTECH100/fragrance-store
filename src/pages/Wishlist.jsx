import { Link } from "react-router-dom";

function Wishlist({ wishlist }) {

  return (

    <div>

      <div className="bg-gray-100 py-24 text-center">
        <h1 className="text-4xl tracking-[0.4em] font-light">
          YOUR WISHLIST
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {wishlist.length === 0 ? (

          <p className="text-center text-gray-500">
            Your wishlist is empty
          </p>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

            {wishlist.map(product => (

              <Link key={product._id} to={`/product/${product._id}`}>

                <div className="border p-4 rounded-lg shadow hover:shadow-xl transition">

                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />

                  <h2 className="text-xl mt-3">
                    {product.name}
                  </h2>

                  <p className="text-gray-500">
                    ₦{product.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Wishlist;