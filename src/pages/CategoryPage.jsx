// src/pages/CategoryPage.jsx
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";

function CategoryPage({ mainCategory, title, addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const { subcategory } = useParams();

  const querySub = searchParams.get("sub") || "";

  // accept ALL possible sources safely
  const rawSub =
    subcategory ||
    searchParams.get("sub") ||
    // props.subCategoryFromParams || 👈 optional safety if used
    "";

  // normalize everything
  const normalize = (str) =>
    str?.toLowerCase().trim().replace(/\s+/g, "-");

  const sub = normalize(subcategory || querySub);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = `${baseURL}/api/products?category=${encodeURIComponent(
      mainCategory
    )}`;
    if (sub) {
      url += `&subCategory=${sub}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load products. Please try again later.");
        setLoading(false);
      });
  }, [mainCategory, sub]);

  const displayTitle = sub
    ? sub.replace(/-/g, " ").toUpperCase()
    : title.toUpperCase();

 const heroImage =
  products.length > 0
    ? products[0].image.startsWith("http")
      ? products[0].image
      : `${baseURL}${products[0].image}`
    : null;

  return (
    <div className="bg-white min-h-screen">
      {/* ================= HERO ================= */}
      <section
        className="relative h-[50vh] md:h-[65vh] flex items-center justify-center text-center"
        style={
          heroImage
            ? {
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {/* Overlay (luxury feel) */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-luxury uppercase tracking-superWide text-white">
            {displayTitle}
          </h1>
          <p className="mt-6 text-white/80 tracking-widestLux max-w-xl mx-auto">
            Crafted with precision. Worn with intention.
          </p>
        </div>
      </section>

      {/* ================= MAIN LAYOUT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[250px_1fr] gap-10">
          {/* ================= SIDEBAR ================= */}
          <div className="text-sm">
            <p className="mb-6 text-darktext/60 uppercase tracking-widest">
              {products.length} Products
            </p>

            {sub && (
              <div className="mb-6">
                <p className="text-xs uppercase mb-2 text-darktext/50">
                  Active Filter
                </p>
                <div className="flex justify-between border px-3 py-2 text-xs">
                  {displayTitle}
                  <span>✕</span>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="uppercase text-xs tracking-widest mb-3">
                Category
              </h3>

              {["Fragrances", "Makeup", "Skincare", "Accessories"].map(
                (cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2">
                    <input type="checkbox" />
                    {cat}
                  </label>
                )
              )}
            </div>

            <div>
              <h3 className="uppercase text-xs tracking-widest mb-3">
                Product Type
              </h3>

              {["Perfume", "Oil", "Spray", "Set"].map((type) => (
                <label key={type} className="flex items-center gap-2 mb-2">
                  <input type="checkbox" />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div>
            <div className="flex justify-between items-center mb-10">
              <p className="text-sm text-darktext/60">
                Showing {products.length} results
              </p>
              <select className="border px-4 py-2 text-sm">
                <option>FEATURED</option>
                <option>PRICE LOW-HIGH</option>
                <option>PRICE HIGH-LOW</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-xl text-darktext/60 animate-pulse">
                  Loading collection...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600 text-xl">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-luxury uppercase text-darktext/70">
                  No products in this collection yet.
                </p>
                <p className="mt-4 text-darktext/60">
                  Check back soon — new arrivals are on the way.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    addToWishlist={addToWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CategoryPage;