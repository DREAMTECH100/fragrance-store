import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Gifts({ addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const sub = searchParams.get("sub") || "";

  // ✅ BASE URL (same pattern as your Makeup page)
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);

    let url = `${baseURL}/api/products?category=gifts`;
    if (sub) url += `&subCategory=${encodeURIComponent(sub)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gifts");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [sub, baseURL]);

  const displayTitle = sub
    ? sub.replace(/-/g, " ").toUpperCase()
    : "GIFTS";

  return (
    <div className="bg-softwhite min-h-screen">
      
      {/* HERO */}
      <section className="py-32 md:py-40 px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-luxury uppercase tracking-superWide text-darktext">
          {displayTitle}
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-sansLux text-darktext/70 tracking-widestLux">
          Curated moments of indulgence.
        </p>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <p className="text-center text-2xl">Loading gifts...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-2xl font-luxury uppercase tracking-widestLux text-darktext/70">
            No gifts found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
            {products.map((product) => (
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

export default Gifts;