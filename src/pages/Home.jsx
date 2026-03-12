import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

function Home({ addToWishlist }) {
  const [products, setProducts] = useState([])

  // Filter accessories from all products
  const accessories = products.filter(
    product => product.category?.toLowerCase() === "accessories"
  )

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err))
  }, [])

  return (
    <div className="bg-softwhite">

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/istockphoto-935334178-640_adpp_is.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
          <div className="max-w-3xl">
            <h1 className="hero-title text-white text-5xl md:text-7xl font-luxury">
              Discover <span className="text-primary">Luxury</span> Fragrance
            </h1>
            <p className="hero-text text-gray-200 mt-6 text-lg md:text-xl">
              Crafted for confidence, elegance and unforgettable presence.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              <Link
                to="/fragrances"
                className="bg-primary text-white px-8 py-3 tracking-widest hover:bg-red-700 transition"
              >
                SHOP FRAGRANCES
              </Link>
              <Link
                to="/collections"
                className="border border-white text-white px-8 py-3 tracking-widest hover:bg-white hover:text-black transition"
              >
                VIEW COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </section>

    {/* FEATURED FRAGRANCES */}
    
<section className="py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-luxury tracking-widest text-center mb-12">
      FEATURED FRAGRANCES
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.slice(0, 4).map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <ProductCard
            product={product}
            addToWishlist={addToWishlist}
            buttonText="SHOP NOW"
          />
        </Link>
      ))}
    </div>

  </div>
</section>

      {/* EXPLORE FRAGRANCES SUMMARY */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-luxury tracking-[0.3em] text-center mb-12">
            EXPLORE FRAGRANCES
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="group overflow-hidden rounded-lg shadow hover:shadow-xl transition p-2">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="h-[220px] w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
                  <p className="text-red-600 mt-1 font-semibold">₦{product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/fragrances"
              className="border border-black px-8 py-3 tracking-widest hover:bg-black hover:text-white transition"
            >
              VIEW ALL FRAGRANCES
            </Link>
          </div>

        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-luxury text-center tracking-[0.3em] mb-12">
            ACCESSORIES
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accessories.slice(0,4).map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <div className="shadow-lg p-6 text-center hover:shadow-xl transition">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="h-[200px] mx-auto object-cover"
                  />
                  <h3 className="mt-4 font-luxury tracking-widest">
                    {product.name}
                  </h3>
                  <p className="text-red-600 mt-2 font-semibold">
                    ₦{product.price}
                  </p>
                  <div className="mt-4 bg-red-600 text-white py-2 tracking-widest hover:bg-red-700 transition">
                    SHOP NOW
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/accessories"
              className="border border-black px-8 py-3 tracking-widest hover:bg-black hover:text-white transition"
            >
              VIEW ALL ACCESSORIES
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE THE SCENT */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl font-luxury tracking-widest mb-10">
            EXPERIENCE THE SCENT
          </h2>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg shadow-xl"
          >
            <source src="/videos/istockphoto-1008645938-640_adpp_is.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

    </div>
  )
}

export default Home