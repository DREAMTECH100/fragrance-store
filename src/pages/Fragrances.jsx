import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";
import SectionVideo from "../components/SectionVideo";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

function Fragrances({ addToWishlist, addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const { subcategory } = useParams();
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const normalize = (str) =>
    str?.toLowerCase().trim().replace(/\s+/g, "-");
  const sub =
    normalize(subcategory) || normalize(searchParams.get("sub")) || "";

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = `${baseURL}/api/products?category=fragrances`;
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
            return p.image.startsWith("http") ? p.image : `${baseURL}${p.image}`;
          })
          .filter(Boolean);
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

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const subCategoriesOnPage = [
    ...new Set(
      products
        .map((p) => p.subCategory?.toLowerCase().replace(/\s+/g, "-"))
        .filter(Boolean)
    ),
  ];

  useEffect(() => {
    if (selectedSubCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          selectedSubCategories.includes(
            p.subCategory?.toLowerCase().replace(/\s+/g, "-")
          )
        )
      );
    }
  }, [selectedSubCategories, products]);

  const toggleSubCategory = (subCat) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCat) ? prev.filter((s) => s !== subCat) : [...prev, subCat]
    );
  };

  const clearFilters = () => setSelectedSubCategories([]);

  const displayTitle = sub ? sub.replace(/-/g, " ").toUpperCase() : "FRAGRANCES";

  const heroSubtitles = [
    "Crafted for timeless elegance and unforgettable presence",
    "Luxury in every note, sophistication in every drop",
    "A fragrance that defines your essence",
    "Exquisite scents, unforgettable impressions",
    "Where art meets aroma",
  ];
  const currentSubtitle = heroSubtitles[currentHeroIndex % heroSubtitles.length];
  const heroImage = heroImages[currentHeroIndex] || null;

  return (
    <div className="bg-[#faf9f7] min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex items-end justify-start text-left"
        style={{
          height: "clamp(340px, 60vh, 640px)",
          backgroundImage: heroImage ? `url(${heroImage})` : undefined,
          backgroundColor: heroImage ? undefined : "#e8e2d9",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease",
        }}
      >
        {/* Dark gradient from bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Hero dot nav */}
        {heroImages.length > 1 && (
          <div className="absolute top-5 right-6 z-20 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHeroIndex(i)}
                className="transition-all duration-300"
                style={{
                  width: i === currentHeroIndex ? "22px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  background: i === currentHeroIndex ? "#fff" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}

        {/* Text block */}
        <div className="relative z-10 px-8 md:px-16 pb-12 md:pb-16 max-w-2xl">
          {sub && (
            <p
              className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3 font-cormorant"
            >
              Fragrances
            </p>
          )}
          <h1
            className="font-playfair uppercase text-white leading-none"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.08em" }}
          >
            {displayTitle}
          </h1>
          <div
            className="mt-4"
            style={{ width: "48px", height: "2px", background: "#dc2626" }}
          />
          <p
            className="mt-4 text-white/75 font-cormorant"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)", lineHeight: "1.6", letterSpacing: "0.04em" }}
          >
            {currentSubtitle}
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB / META BAR ── */}
      <div
        className="border-b"
        style={{ borderColor: "#ede9e3", background: "#fff" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-cormorant">
            Home / Fragrances{sub ? ` / ${sub.replace(/-/g, " ")}` : ""}
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-cormorant">
            {filteredProducts.length} Products
          </p>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">

          {/* ── SIDEBAR (desktop) ── */}
          <aside className="hidden md:block self-start sticky top-24">
            <div
              className="p-6"
              style={{
                background: "#fff",
                border: "1px solid #ede9e3",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <p
                  className="text-[11px] uppercase tracking-[0.22em] font-semibold"
                  style={{ color: "#1a1a1a" }}
                >
                  Filter
                </p>
                {selectedSubCategories.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-widest transition"
                    style={{ color: "#dc2626" }}
                  >
                    <X size={11} /> Clear
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="mb-5" style={{ height: "1px", background: "#ede9e3" }} />

              {/* Subcategories */}
              {subCategoriesOnPage.length > 0 && (
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.22em] mb-4"
                    style={{ color: "#9ca3af" }}
                  >
                    Category
                  </p>
                  <div className="space-y-3">
                    {subCategoriesOnPage.map((subCat) => (
                      <label
                        key={subCat}
                        className="flex items-center gap-3 cursor-pointer group/filter"
                      >
                        <span
                          className="flex-shrink-0 w-4 h-4 border flex items-center justify-center transition-all duration-150"
                          style={{
                            borderColor: selectedSubCategories.includes(subCat) ? "#dc2626" : "#d1d5db",
                            background: selectedSubCategories.includes(subCat) ? "#dc2626" : "transparent",
                          }}
                        >
                          {selectedSubCategories.includes(subCat) && (
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedSubCategories.includes(subCat)}
                          onChange={() => toggleSubCategory(subCat)}
                        />
                        <span
                          className="text-[12px] capitalize tracking-wide font-cormorant transition"
                          style={{ color: selectedSubCategories.includes(subCat) ? "#1a1a1a" : "#6b7280" }}
                        >
                          {subCat.replace(/-/g, " ")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main>
            {/* Toolbar */}
            <div
              className="flex items-center justify-between mb-8 pb-4"
              style={{ borderBottom: "1px solid #ede9e3" }}
            >
              {/* Mobile filter toggle */}
              <button
                className="md:hidden flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-cormorant"
                style={{ color: "#1a1a1a" }}
                onClick={() => setSidebarOpen(true)}
              >
                <SlidersHorizontal size={14} /> Filter
                {selectedSubCategories.length > 0 && (
                  <span
                    className="text-[9px] text-white px-1.5 py-0.5 rounded-full"
                    style={{ background: "#dc2626" }}
                  >
                    {selectedSubCategories.length}
                  </span>
                )}
              </button>

              <p
                className="hidden md:block text-[11px] uppercase tracking-[0.18em] font-cormorant"
                style={{ color: "#9ca3af" }}
              >
                Showing {filteredProducts.length} results
              </p>

              {/* Sort */}
              <div className="relative flex items-center gap-2">
                <select
                  className="appearance-none text-[11px] uppercase tracking-[0.14em] font-cormorant pr-6 pl-3 py-2 cursor-pointer outline-none"
                  style={{
                    border: "1px solid #ede9e3",
                    background: "#fff",
                    color: "#1a1a1a",
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low – High</option>
                  <option value="price-desc">Price: High – Low</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div style={{ aspectRatio: "1/1", background: "#ede9e3" }} />
                    <div className="p-4 bg-white space-y-2" style={{ borderTop: "1px solid #ede9e3" }}>
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                      <div className="h-8 bg-gray-100 rounded mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className="text-center py-24 font-cormorant"
                style={{ color: "#dc2626" }}
              >
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p
                  className="text-2xl font-playfair uppercase"
                  style={{ color: "#9ca3af", letterSpacing: "0.12em" }}
                >
                  No products found
                </p>
                {selectedSubCategories.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[11px] uppercase tracking-widest underline font-cormorant"
                    style={{ color: "#dc2626" }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
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

      {/* ── MOBILE FILTER DRAWER ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div
            className="relative ml-auto w-72 h-full overflow-y-auto p-6"
            style={{ background: "#fff" }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold">Filter</p>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={18} style={{ color: "#6b7280" }} />
              </button>
            </div>
            <div className="mb-5" style={{ height: "1px", background: "#ede9e3" }} />
            {selectedSubCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-[10px] uppercase tracking-widest mb-4"
                style={{ color: "#dc2626" }}
              >
                <X size={11} /> Clear all
              </button>
            )}
            {subCategoriesOnPage.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: "#9ca3af" }}>
                  Category
                </p>
                <div className="space-y-3">
                  {subCategoriesOnPage.map((subCat) => (
                    <label key={subCat} className="flex items-center gap-3 cursor-pointer">
                      <span
                        className="flex-shrink-0 w-4 h-4 border flex items-center justify-center"
                        style={{
                          borderColor: selectedSubCategories.includes(subCat) ? "#dc2626" : "#d1d5db",
                          background: selectedSubCategories.includes(subCat) ? "#dc2626" : "transparent",
                        }}
                      >
                        {selectedSubCategories.includes(subCat) && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedSubCategories.includes(subCat)}
                        onChange={() => toggleSubCategory(subCat)}
                      />
                      <span className="text-[13px] capitalize font-cormorant" style={{ color: "#1a1a1a" }}>
                        {subCat.replace(/-/g, " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(false)}
              className="mt-8 w-full py-3 text-[11px] uppercase tracking-[0.18em] font-cormorant text-white"
              style={{ background: "#1a1a1a" }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <SectionVideo
        src="/videos/fragrance.mp4"
        title="Fragrance"
        subtitle="A signature that enters before you do — and lingers after you leave."
      />
    </div>
  );
}

export default Fragrances;
