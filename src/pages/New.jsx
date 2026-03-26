import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function New({ addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/products?sort=-createdAt")
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 20)); // limit to recent 20
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

// Above return()
const heroImage = products.length > 0 ? `http://localhost:5000${products[0].image}` : null;

  return (
    <div className="bg-softwhite min-h-screen">
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
    <h1 className="text-5xl md:text-7xl font-luxury uppercase tracking-superWide text-white">
      NEW
    </h1>
    <p className="mt-8 text-xl md:text-2xl font-sansLux text-white/80 tracking-widestLux">
      The latest expressions of luxury.
    </p>
  </div>
</section>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <p className="text-center text-2xl">Loading new arrivals...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-2xl font-luxury uppercase tracking-widestLux text-darktext/70">
            No new arrivals yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                addToWishlist={addToWishlist}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default New;