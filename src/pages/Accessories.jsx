import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Accessories({ addToWishlist }) {
  const [accessories, setAccessories] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {

        const filtered = data.filter(product => {
          const category = product.category?.toLowerCase()
          return category === "accessories" || category === "accessory"
        })

        setAccessories(filtered)

      })
      .catch(err => console.error("Error fetching accessories:", err))
  }, [])

  return (
    <div className="bg-softwhite">

      {/* HERO */}
      <div className="bg-gray-100 py-24 text-center">
        <h1 className="text-4xl font-luxury tracking-[0.4em]">
          ACCESSORIES
        </h1>
        <p className="mt-4 text-gray-500">
          Discover premium accessories to complement your fragrance
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {accessories.length === 0 ? (
          <p className="text-center text-gray-500">
            No accessories available yet.
          </p>
        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {accessories.map(product => (

              <div key={product._id} className="relative">

                {/* WISHLIST BUTTON */}
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-red-50 transition z-10"
                >
                  ❤️
                </button>

                <Link to={`/product/${product._id}`}>

                  <div className="border p-4 rounded-lg shadow hover:shadow-xl hover:-translate-y-1 transition duration-300">

                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="h-48 w-full object-cover hover:scale-105 transition duration-300"
                    />

                    <h2 className="text-lg mt-3 font-medium">
                      {product.name}
                    </h2>

                    <p className="text-red-600 mt-1 font-semibold">
                      ₦{product.price}
                    </p>

                  </div>

                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}

export default Accessories