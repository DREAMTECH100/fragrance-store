import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";

function Fragrances({ addToWishlist, addToCart }) {
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

  // BASE URL from environment variable
  const baseURL = import.meta.env.VITE_API_URL;

  // Fetch products
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

        // Pick up to 5 random images for hero
        const images = data
          .map((p) => p.image && `${baseURL}${p.image}`)
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

  // Hero slideshow
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const subCategoriesOnPage = [
    ...new Set(products.map((p) => p.subCategory).filter(Boolean)),
  ];

  useEffect(() => {
    if (selectedSubCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => selectedSubCategories.includes(p.subCategory))
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
  const displayTitle = sub ? sub.replace(/-/g, " ").toUpperCase() : "FRAGRANCES";
  const heroImage = heroImages[currentHeroIndex] || null;

  // Example dynamic hero subtitles
  const heroSubtitles = [
    "Crafted for timeless elegance and unforgettable presence",
    "Luxury in every note, sophistication in every drop",
    "A fragrance that defines your essence",
    "Exquisite scents, unforgettable impressions",
    "Where art meets aroma"
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
            ? { backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }
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

      {/* MAIN LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[250px_1fr] gap-10">
          {/* SIDEBAR */}
          <aside className="text-sm self-start space-y-8 bg-softwhite z-30 shadow-md p-4">
            <p className="uppercase tracking-widest">{filteredProducts.length} Products</p>
            {selectedSubCategories.length > 0 && (
              <button
                className="text-xs uppercase mb-4 text-darktext/50"
                onClick={clearFilters}
              >
                Clear Filter ✕
              </button>
            )}
            <div>
              <h3 className="uppercase text-xs tracking-widest mb-3">Subcategories</h3>
              {subCategoriesOnPage.map((subCat) => (
                <label key={subCat} className="flex items-center gap-2 mb-2 cursor-pointer">
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

          {/* MAIN CONTENT */}
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
              <div className="text-center py-20 animate-pulse">Loading collection...</div>
            ) : error ? (
              <div className="text-center py-20 text-red-600">{error}</div>
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
    </div>
  );
}

export default Fragrances;