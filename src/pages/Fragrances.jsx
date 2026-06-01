import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";
import SectionVideo from "../components/SectionVideo";
import { X } from "lucide-react";

function Fragrances({ addToWishlist, addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroImages, setHeroImages] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortValue, setSortValue] = useState("featured");

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
    let base = selectedSubCategories.length === 0
      ? [...products]
      : products.filter((p) =>
          selectedSubCategories.includes(
            p.subCategory?.toLowerCase().replace(/\s+/g, "-")
          )
        );

    if (sortValue === "price-asc") base.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortValue === "price-desc") base.sort((a, b) => (b.price || 0) - (a.price || 0));

    setFilteredProducts(base);
  }, [selectedSubCategories, products, sortValue]);

  const toggleSubCategory = (subCat) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCat) ? prev.filter((s) => s !== subCat) : [...prev, subCat]
    );
  };

  const clearFilters = () => setSelectedSubCategories([]);

  const displayTitle = sub ? sub.replace(/-/g, " ").toUpperCase() : "FRAGRANCES";
  const heroImage = heroImages[currentHeroIndex] || null;

  const heroSubtitles = [
    "Crafted for timeless elegance and unforgettable presence",
    "Luxury in every note, sophistication in every drop",
    "A fragrance that defines your essence",
    "Exquisite scents, unforgettable impressions",
    "Where art meets aroma",
  ];
  const currentSubtitle = heroSubtitles[currentHeroIndex % heroSubtitles.length];

  return (
    <div style={{ background: "var(--cream, #faf8f4)", minHeight: "100vh" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500&display=swap');

        :root {
          --gold: #b8965a;
          --gold-light: #d4af72;
          --gold-dim: rgba(184,150,90,0.3);
          --ink: #0e0c0a;
          --cream: #faf8f4;
          --warm-grey: #8a8178;
          --red: #c0392b;
        }

        .frag-display  { font-family: 'Cormorant Garamond', serif; }
        .frag-label    { font-family: 'Tenor Sans', sans-serif; }
        .frag-body     { font-family: 'Montserrat', sans-serif; }

        .frag-sec-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
        }
        .frag-sec-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 1.05;
        }
        .frag-divider-gold {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--red), transparent);
          margin: 0 auto;
        }

        /* ── Img zoom (matches Home) ── */
        .frag-img-zoom img { transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
        .frag-img-zoom:hover img { transform: scale(1.08); }

        /* ── Lux card lift ── */
        .frag-lux-card { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.6s ease; }
        .frag-lux-card:hover { transform: translateY(-5px); box-shadow: 0 24px 60px rgba(0,0,0,0.16); }

        /* ── Hero quote animation ── */
        @keyframes fragQuote {
          0%   { transform: translateY(20px); opacity: 0; }
          15%  { transform: translateY(0);    opacity: 1; }
          80%  { transform: translateY(0);    opacity: 1; }
          100% { transform: translateY(-20px);opacity: 0; }
        }
        .frag-animate-quote { animation: fragQuote 6s ease 1; }

        /* ── Custom checkbox ── */
        .frag-check {
          width: 14px; height: 14px;
          border: 1px solid #d1d5db;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.15s;
        }
        .frag-check.active {
          background: var(--red);
          border-color: var(--red);
        }

        /* ── Btn (matches Home btn-gold) ── */
        .frag-btn {
          display: inline-block;
          padding: 12px 40px;
          border: 1px solid var(--red);
          color: var(--red);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          transition: background 0.4s ease, color 0.4s ease;
          cursor: pointer;
          background: transparent;
        }
        .frag-btn:hover { background: var(--red); color: #fff; }

        /* ── Sort select ── */
        .frag-select {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: 1px solid rgba(0,0,0,0.12);
          padding: 8px 32px 8px 12px;
          background: #fff;
          color: var(--ink);
          appearance: none;
          cursor: pointer;
          outline: none;
        }

        /* ── Skeleton pulse ── */
        @keyframes fragSkel { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .frag-skel { animation: fragSkel 1.6s ease infinite; }

        /* ── Mobile drawer ── */
        @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        .frag-drawer { animation: slideIn 0.28s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{
          height: "clamp(380px, 62vh, 680px)",
          backgroundImage: heroImage ? `url(${heroImage})` : undefined,
          backgroundColor: heroImage ? undefined : "#1a1612",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1.2s ease",
        }}
      >
        {/* Same vignette as Home hero */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0.78) 100%)" }} />

        {/* Top red rule — matches Home */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--red)" }} />

        {/* Dot nav */}
        {heroImages.length > 1 && (
          <div className="absolute top-5 right-6 z-20 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHeroIndex(i)}
                style={{
                  width: i === currentHeroIndex ? "22px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  background: i === currentHeroIndex ? "#fff" : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Text — bottom-left editorial anchor, same as Home */}
        <div className="relative z-10 px-8 md:px-16 pb-14 max-w-2xl">
          {sub && (
            <p className="frag-sec-label mb-3" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.4em" }}>
              Fragrances
            </p>
          )}
          <h1
            className="frag-sec-heading text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", textShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
          >
            {displayTitle}
          </h1>

          {/* Gold divider matching Home */}
          <div className="frag-divider-gold my-5" style={{ marginLeft: 0 }} />

          <div style={{ height: "60px", overflow: "hidden" }}>
            <p
              key={currentHeroIndex}
              className="frag-animate-quote frag-display text-white/75"
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)", fontStyle: "italic", fontWeight: 300, letterSpacing: "0.05em", lineHeight: 1.6 }}
            >
              {currentSubtitle}
            </p>
          </div>
        </div>

        {/* Bottom gold rule — matches Home */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--gold-dim, rgba(184,150,90,0.3)), transparent)" }} />
      </section>

      {/* ══════════════════════ META BAR ══════════════════════ */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-3 flex items-center justify-between">
          <p className="frag-label" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#9ca3af" }}>
            Home / Fragrances{sub ? ` / ${sub.replace(/-/g, " ")}` : ""}
          </p>
          <p className="frag-label" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#9ca3af" }}>
            {filteredProducts.length} Products
          </p>
        </div>
      </div>

      {/* ══════════════════════ LAYOUT ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-[200px_1fr] gap-10 items-start">

          {/* ── SIDEBAR (desktop) ── */}
          <aside className="hidden md:block self-start sticky top-24">
            <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: "24px" }}>

              {/* Header row */}
              <div className="flex items-center justify-between mb-5">
                <p className="frag-label" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)" }}>
                  Filter
                </p>
                {selectedSubCategories.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="frag-label flex items-center gap-1"
                    style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    <X size={10} /> Clear
                  </button>
                )}
              </div>

              <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "20px" }} />

              {/* Active filter pills */}
              {selectedSubCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedSubCategories.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSubCategory(s)}
                      className="frag-label flex items-center gap-1"
                      style={{
                        fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase",
                        padding: "3px 10px", border: "1px solid var(--red)", color: "var(--red)",
                        background: "rgba(192,57,43,0.06)", borderRadius: "999px", cursor: "pointer",
                      }}
                    >
                      {s.replace(/-/g, " ")} <X size={9} />
                    </button>
                  ))}
                </div>
              )}

              {/* Category list */}
              {subCategoriesOnPage.length > 0 && (
                <div>
                  <p className="frag-sec-label mb-4" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--warm-grey)" }}>
                    Category
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {subCategoriesOnPage.map((subCat) => (
                      <label
                        key={subCat}
                        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                      >
                        <span
                          className={`frag-check ${selectedSubCategories.includes(subCat) ? "active" : ""}`}
                        >
                          {selectedSubCategories.includes(subCat) && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                          className="frag-label"
                          style={{
                            fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
                            color: selectedSubCategories.includes(subCat) ? "var(--ink)" : "var(--warm-grey)",
                            transition: "color 0.2s",
                          }}
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

          {/* ── MAIN ── */}
          <main>

            {/* Toolbar */}
            <div
              className="flex items-center justify-between mb-8 pb-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
            >
              {/* Mobile filter button */}
              <button
                className="md:hidden frag-label flex items-center gap-2"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink)", background: "none", border: "1px solid rgba(0,0,0,0.12)", padding: "7px 14px", cursor: "pointer" }}
                onClick={() => setSidebarOpen(true)}
              >
                Filter
                {selectedSubCategories.length > 0 && (
                  <span style={{ background: "var(--red)", color: "#fff", fontSize: "9px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {selectedSubCategories.length}
                  </span>
                )}
              </button>

              <p className="frag-label hidden md:block" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--warm-grey)" }}>
                {filteredProducts.length} results
              </p>

              {/* Sort */}
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <select
                  className="frag-select"
                  value={sortValue}
                  onChange={(e) => setSortValue(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low – High</option>
                  <option value="price-desc">Price: High – Low</option>
                </select>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ position: "absolute", right: "10px", pointerEvents: "none" }}>
                  <path d="M1 1L5 5L9 1" stroke="#8a8178" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* States */}
            {loading ? (
              /* ── Skeleton matching Home's card structure ── */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="frag-skel" style={{ background: "#f0ede8", overflow: "hidden" }}>
                    <div style={{ aspectRatio: "1/1", background: "#e8e4de" }} />
                    <div style={{ padding: "16px", background: "#f5f3ef" }}>
                      <div style={{ height: "10px", background: "#e8e4de", borderRadius: "2px", width: "70%", marginBottom: "8px" }} />
                      <div style={{ height: "10px", background: "#e8e4de", borderRadius: "2px", width: "45%" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24 frag-display" style={{ color: "var(--red)", fontSize: "18px", fontStyle: "italic" }}>
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="frag-sec-heading" style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "var(--warm-grey)" }}>
                  No products found
                </p>
                <div className="frag-divider-gold my-5" />
                {selectedSubCategories.length > 0 && (
                  <button onClick={clearFilters} className="frag-btn mt-2">
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              /* ── Product grid — same gap/structure as Home mini-card strip ── */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px]">
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
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,12,10,0.55)" }} onClick={() => setSidebarOpen(false)} />
          <div
            className="frag-drawer"
            style={{
              position: "relative", marginLeft: "auto",
              width: "280px", height: "100%", overflowY: "auto",
              background: "#fff", padding: "28px 24px",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="frag-label" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)" }}>Filter</p>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={18} color="var(--warm-grey)" />
              </button>
            </div>
            <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", marginBottom: "20px" }} />
            {selectedSubCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="frag-label flex items-center gap-1 mb-5"
                style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={10} /> Clear all
              </button>
            )}
            {subCategoriesOnPage.length > 0 && (
              <div>
                <p className="frag-sec-label mb-4" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--warm-grey)" }}>Category</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {subCategoriesOnPage.map((subCat) => (
                    <label key={subCat} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                      <span className={`frag-check ${selectedSubCategories.includes(subCat) ? "active" : ""}`}>
                        {selectedSubCategories.includes(subCat) && (
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M1 3L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <input type="checkbox" className="sr-only" checked={selectedSubCategories.includes(subCat)} onChange={() => toggleSubCategory(subCat)} />
                      <span className="frag-label" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--warm-grey)" }}>
                        {subCat.replace(/-/g, " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(false)}
              className="frag-btn"
              style={{ marginTop: "32px", width: "100%", display: "block", textAlign: "center", background: "var(--ink)", borderColor: "var(--ink)", color: "#fff" }}
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
