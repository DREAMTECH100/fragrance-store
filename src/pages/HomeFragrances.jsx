import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";
import SectionVideo from "../components/SectionVideo";

function HomeFragrances({ addToWishlist, addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const [searchParams] = useSearchParams();
  const { subcategory } = useParams();
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const normalize = (str) =>
    str?.toLowerCase().trim().replace(/\s+/g, "-");

  const sub =
    normalize(subcategory) || normalize(searchParams.get("sub")) || "";

  const baseURL = import.meta.env.VITE_API_URL;

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = `${baseURL}/api/products?category=home-fragrances`;
    if (sub) url += `&subCategory=${encodeURIComponent(sub)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        const images = data
          .map((p) => {
            if (!p.image) return null;
            return p.image.startsWith("http")
              ? p.image
              : `${baseURL}${p.image}`;
          })
          .filter(Boolean);

        // Shuffle images
        for (let i = images.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [images[i], images[j]] = [images[j], images[i]];
        }

        setHeroImages(images.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load products. Please try again later.");
        setLoading(false);
      });
  }, [sub, baseURL]);

  /* ================= HERO SLIDESHOW ================= */
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  /* ================= FILTER ================= */
  const subCategoriesOnPage = [
    ...new Set(products.map((p) => p.subCategory).filter(Boolean)),
  ];

  useEffect(() => {
    if (selectedSubCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          selectedSubCategories.includes(p.subCategory)
        )
      );
    }
  }, [selectedSubCategories, products]);

  const toggleSubCategory = (subCat) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCat)
        ? prev.filter((s) => s !== subCat)
        : [...prev, subCat]
    );
  };

  const clearFilters = () => setSelectedSubCategories([]);

  /* ================= UI ================= */
  const displayTitle = sub
    ? sub.replace(/-/g, " ").toUpperCase()
    : "HOME FRAGRANCES";

  const heroImage = heroImages[currentHeroIndex] || null;

  const heroSubtitles = [
    "Transform your space with luxury scent",
    "Elegance that fills every corner",
    "Signature home fragrance experience",
    "Warm, refined, unforgettable atmosphere",
    "Luxury scents for modern living",
  ];

  const currentSubtitle =
    heroSubtitles[currentHeroIndex % heroSubtitles.length];

  return (
    <div className="bg-softwhite min-h-screen">

      {/* HERO */}
      <section
        className="relative h-[50vh] md:h-[65vh] flex items-center justify-center text-center transition-all duration-1000"
        style={
          heroImage
            ? {
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "#f7f7f7" }
        }
      >
        <div className="absolute inset-0 bg-black/40 transition-all duration-1000" />

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-playfair uppercase tracking-widest text-white drop-shadow-lg">
            {displayTitle}
          </h1>

          <p className="mt-6 text-white/90 tracking-widestLux max-w-xl mx-auto font-cormorant text-lg drop-shadow-md">
            {currentSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[250px_1fr] gap-10">

          {/* FILTER */}
          <aside className="text-sm self-start space-y-8 bg-softwhite z-30 shadow-md p-4">
            <p className="uppercase tracking-widest">
              {filteredProducts.length} Products
            </p>

            {selectedSubCategories.length > 0 && (
              <button
                className="text-xs uppercase mb-4 text-darktext/50"
                onClick={clearFilters}
              >
                Clear Filter ✕
              </button>
            )}

            <div>
              <h3 className="uppercase text-xs tracking-widest mb-3">
                Subcategories
              </h3>

              {subCategoriesOnPage.map((subCat) => (
                <label
                  key={subCat}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={selectedSubCategories.includes(subCat)}
                    onChange={() => toggleSubCategory(subCat)}
                  />
                  {subCat}
                </label>
              ))}
            </div>
          </aside>

          {/* PRODUCTS */}
          <main>
            <div className="flex justify-between items-center mb-10">
              <p className="text-sm text-darktext/60">
                Showing {filteredProducts.length} results
              </p>

              <select className="border px-4 py-2 text-sm">
                <option value="featured">FEATURED</option>
                <option value="price-asc">PRICE LOW-HIGH</option>
                <option value="price-desc">PRICE HIGH-LOW</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20 animate-pulse">
                Loading collection...
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-playfair uppercase text-darktext/70">
                  No products in this collection yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    addToWishlist={addToWishlist}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* VIDEO */}
      <SectionVideo
        src="/videos/home-fragrances.mp4"
        title="Home Fragrances"
        subtitle="Elevate your space. Define your atmosphere."
      />
    </div>
  );
}

export default HomeFragrances;