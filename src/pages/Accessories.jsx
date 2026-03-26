// src/pages/Accessories.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

function Accessories({ addToWishlist, addToCart }) {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((product) => {
          const category = product.category?.toLowerCase();
          return category === "accessories" || category === "accessory";
        });
        setAccessories(filtered);
      })
      .catch((err) => console.error("Error fetching accessories:", err));
  }, []);

  // HERO IMAGE
  const heroImage =
    accessories.length > 0 ? `http://localhost:5000${accessories[0].image}` : null;

  return (
    <div className="bg-softwhite">

      {/* HERO */}
      <section
        className="relative h-[50vh] md:h-[65vh] flex items-center justify-center text-center"
        style={
          heroImage
            ? { backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : {}
        }
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl font-luxury tracking-[0.4em] text-white">
            ACCESSORIES
          </h1>
          <p className="mt-4 text-white/80">
            Discover premium accessories to complement your fragrance
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {accessories.length === 0 ? (
          <p className="text-center text-gray-500">
            No accessories available yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {accessories.map((product) => (
              <div
                key={product._id}
                className="group relative border rounded-xl overflow-hidden shadow hover:shadow-2xl transition"
              >
                {/* IMAGE */}
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition duration-700"
                  />
                </Link>

                {/* OVERLAY BUTTONS */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => addToWishlist(product)}
                    className="bg-white/70 backdrop-blur-sm rounded-full p-3 shadow hover:bg-primary/20 transition"
                  >
                    <Heart className="w-5 h-5 text-darktext group-hover:text-primary transition" />
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white/50 backdrop-blur-sm rounded-full p-3 shadow hover:bg-primary/20 transition"
                  >
                    🛒
                  </button>
                </div>

                {/* PRODUCT DETAILS */}
                <div className="p-6 text-center">
                  <h2 className="text-xl font-luxury uppercase tracking-widestLux text-darktext group-hover:text-primary transition">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-lg font-sansLux font-bold text-primary">
                    ₦{Number(product.price).toLocaleString()}
                  </p>

                  {product.rating && (
                    <div className="mt-2 flex justify-center items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{product.rating.toFixed(1)}</span>
                    </div>
                  )}

                  <p className="mt-2 text-sm text-darktext/60 line-clamp-2">
                    {product.description || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Accessories;