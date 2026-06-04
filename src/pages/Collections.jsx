import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500&display=swap');

  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-dim:   rgba(184,150,90,0.15);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --offwhite:   #faf7f2;
    --warm-grey:  #7a7065;
    --border:     rgba(184,150,90,0.22);
  }

  /* ─── Page ─── */
  .col-page {
    min-height: 100vh;
    background: var(--offwhite);
  }
  .col-top-rule { height: 3px; background: var(--red); }

  /* ─── Hero ─── */
  .col-hero {
    position: relative;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    height: clamp(340px, 58vh, 660px);
    background-color: #1a1410;
    background-size: cover;
    background-position: center;
  }
  .col-hero-vignette {
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.18) 0%,
      rgba(0,0,0,0.48) 55%,
      rgba(0,0,0,0.82) 100%
    );
  }
  /* Animated hero image slideshow crossfade */
  .col-hero-img {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    transition: opacity 1.4s ease;
  }
  .col-hero-dots {
    position: absolute; top: 18px; right: 20px; z-index: 20;
    display: flex; gap: 7px; align-items: center;
  }
  .col-hero-dot {
    height: 7px; border-radius: 4px;
    background: rgba(255,255,255,0.35);
    border: none; cursor: pointer; padding: 0;
    transition: width 0.35s ease, background 0.35s ease;
  }
  .col-hero-dot.active {
    width: 22px !important;
    background: #fff;
  }
  .col-hero-content {
    position: relative; z-index: 10;
    padding: 0 40px 52px;
    max-width: 700px;
  }
  .col-hero-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin: 0 0 12px; display: block;
  }
  .col-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2.8rem, 7vw, 5.5rem);
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #fff; line-height: 1; margin: 0 0 0;
    text-shadow: 0 4px 40px rgba(0,0,0,0.4);
  }
  .col-hero-rule {
    width: 48px; height: 1px; margin: 14px 0;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .col-hero-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-weight: 300;
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    letter-spacing: 0.06em; color: rgba(255,255,255,0.72);
    margin: 0;
  }
  /* Bottom gold rule */
  .col-hero-bottom-rule {
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,150,90,0.4), transparent);
  }

  /* ─── Tab nav ─── */
  .col-tabs-wrap {
    background: #fff;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 30;
  }
  .col-tabs {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: stretch;
    padding: 0 24px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .col-tabs::-webkit-scrollbar { display: none; }
  .col-tab {
    flex-shrink: 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--warm-grey);
    padding: 18px 28px;
    background: none; border: none; cursor: pointer;
    position: relative;
    transition: color 0.25s ease;
    white-space: nowrap;
  }
  .col-tab::after {
    content: '';
    position: absolute; bottom: 0; left: 50%; right: 50%;
    height: 2px; background: var(--red);
    transition: left 0.3s ease, right 0.3s ease;
  }
  .col-tab:hover { color: var(--ink); }
  .col-tab.active { color: var(--ink); }
  .col-tab.active::after { left: 0; right: 0; }

  /* ─── Section ─── */
  .col-section {
    max-width: 1200px; margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* Section header */
  .col-sec-header { text-align: center; margin-bottom: 52px; }
  .col-sec-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); margin: 0 0 12px; display: block;
  }
  .col-sec-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2rem, 4.5vw, 3.6rem);
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ink); line-height: 1; margin: 0;
  }
  .col-sec-divider {
    width: 60px; height: 1px; margin: 14px auto 0;
    background: linear-gradient(90deg, transparent, var(--red), transparent);
  }
  .col-sec-desc {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1rem; letter-spacing: 0.04em;
    color: var(--warm-grey); margin: 12px 0 0; line-height: 1.6;
  }

  /* Section divider band */
  .col-band {
    width: 100%;
    background: linear-gradient(160deg, #1a1108 0%, #2a1d0e 45%, #1e150a 100%);
    position: relative; overflow: hidden;
    padding: 48px 24px;
    text-align: center;
  }
  .col-band::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .col-band::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .col-band-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); opacity: 0.85; margin: 0 0 10px; display: block;
  }
  .col-band-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(1.8rem, 4vw, 3rem);
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #f5ede0; margin: 0;
  }
  .col-band-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1rem;
    color: rgba(245,237,224,0.5); letter-spacing: 0.06em;
    margin: 10px 0 0;
  }
  .col-band-rule {
    width: 48px; height: 1px; margin: 14px auto;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }

  /* Grid */
  .col-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
  }
  @media (min-width: 640px)  { .col-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1024px) { .col-grid { grid-template-columns: repeat(4, 1fr); } }

  /* Skeleton */
  @keyframes colSkel { 0%,100%{opacity:0.45} 50%{opacity:1} }
  .col-skel { animation: colSkel 1.7s ease infinite; }
  .col-skel-card {
    background: #f0ede8; overflow: hidden;
  }

  /* Empty state */
  .col-empty {
    text-align: center; padding: 64px 24px;
  }
  .col-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--warm-grey); font-weight: 300; margin: 0;
  }

  /* Show-more button */
  .col-show-more {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin: 40px auto 0;
    padding: 14px 48px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    background: transparent; color: var(--red);
    border: 1px solid var(--red); cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.38s ease;
  }
  .col-show-more::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: var(--red);
    transition: top 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .col-show-more:hover::before { top: 0; }
  .col-show-more:hover { color: #fff; }
  .col-show-more > * { position: relative; z-index: 1; }
`;

const TABS = [
  { id: "new",        label: "New Arrivals" },
  { id: "affordable", label: "Affordable" },
  { id: "prestige",   label: "Prestige" },
];

const VISIBLE_INIT = 8;
const VISIBLE_STEP = 8;

function SkeletonGrid() {
  return (
    <div className="col-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="col-skel-card col-skel">
          <div style={{ aspectRatio: "1/1", background: "#e8e4de" }} />
          <div style={{ padding: "14px 16px", background: "#f5f3ef" }}>
            <div style={{ height: "10px", background: "#e8e4de", borderRadius: "2px", width: "68%", marginBottom: "8px" }} />
            <div style={{ height: "10px", background: "#e8e4de", borderRadius: "2px", width: "42%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CollectionSection({ eyebrow, title, description, products, loading }) {
  const [visible, setVisible] = useState(VISIBLE_INIT);

  return (
    <div className="col-section">
      <div className="col-sec-header">
        <span className="col-sec-eyebrow">{eyebrow}</span>
        <h2 className="col-sec-title">{title}</h2>
        <div className="col-sec-divider" />
        {description && <p className="col-sec-desc">{description}</p>}
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : products.length === 0 ? (
        <div className="col-empty">
          <p className="col-empty-title">No products found</p>
        </div>
      ) : (
        <>
          <div className="col-grid">
            {products.slice(0, visible).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {visible < products.length && (
            <div style={{ textAlign: "center" }}>
              <button
                className="col-show-more"
                onClick={() => setVisible((v) => v + VISIBLE_STEP)}
              >
                <span>View More</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Collections() {
  const [products, setProducts]           = useState([]);
  const [newArrivals, setNewArrivals]     = useState([]);
  const [cheapProducts, setCheapProducts] = useState([]);
  const [expensiveProducts, setExpensiveProducts] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [heroImages, setHeroImages]       = useState([]);
  const [heroIdx, setHeroIdx]             = useState(0);
  const [activeTab, setActiveTab]         = useState("new");

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // New arrivals
        const sortedByDate = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewArrivals(sortedByDate.slice(0, 20));

        // Cheap / expensive
        setCheapProducts(data.filter((p) => Number(p.price) < 50000).slice(0, 20));
        setExpensiveProducts(data.filter((p) => Number(p.price) >= 50000).slice(0, 20));

        // Hero images — pick 5 random product images
        const imgs = data
          .map((p) => p.image
            ? (p.image.startsWith("http") ? p.image : `${baseURL}${p.image}`)
            : null)
          .filter(Boolean);
        const shuffled = [...imgs].sort(() => 0.5 - Math.random());
        setHeroImages(shuffled.slice(0, 5));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Hero slideshow
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [heroImages]);

  // Scroll to section on tab click
  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(`col-section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroSubtitles = [
    "Every piece, curated for presence and permanence.",
    "Luxury in every note, sophistication in every drop.",
    "Wear what lingers long after you leave.",
    "Exquisite selections for the discerning.",
    "Where elegance meets identity.",
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="col-page">

        <div className="col-top-rule" />

        {/* ── Hero ── */}
        <section className="col-hero">
          {/* Crossfade layers */}
          {heroImages.map((src, i) => (
            <div
              key={src}
              className="col-hero-img"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === heroIdx ? 1 : 0,
              }}
            />
          ))}
          <div className="col-hero-vignette" />

          {/* Dot nav */}
          {heroImages.length > 1 && (
            <div className="col-hero-dots">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  className={`col-hero-dot${i === heroIdx ? " active" : ""}`}
                  style={{ width: i === heroIdx ? "22px" : "7px" }}
                  onClick={() => setHeroIdx(i)}
                />
              ))}
            </div>
          )}

          <div className="col-hero-content">
            <span className="col-hero-eyebrow">Curated Selections</span>
            <h1 className="col-hero-title">Collections</h1>
            <div className="col-hero-rule" />
            <p className="col-hero-sub">
              {heroSubtitles[heroIdx % heroSubtitles.length]}
            </p>
          </div>

          <div className="col-hero-bottom-rule" />
        </section>

        {/* ── Sticky tab nav ── */}
        <div className="col-tabs-wrap">
          <nav className="col-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`col-tab${activeTab === tab.id ? " active" : ""}`}
                onClick={() => scrollTo(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── New Arrivals ── */}
        <div id="col-section-new">
          <CollectionSection
            eyebrow="Just Landed"
            title="New Arrivals"
            description="The latest additions to the house — freshly curated, ready to define you."
            products={newArrivals}
            loading={loading}
          />
        </div>

        {/* ── Dark band divider ── */}
        <div className="col-band">
          <span className="col-band-label">The House</span>
          <h3 className="col-band-title">Shop by Price</h3>
          <div className="col-band-rule" />
          <p className="col-band-sub">
            Elegance at every investment level — from accessible to exceptional.
          </p>
        </div>

        {/* ── Affordable ── */}
        <div id="col-section-affordable">
          <CollectionSection
            eyebrow="Accessible Luxury"
            title="Affordable Picks"
            description="Refined pieces under ₦50,000 — proof that luxury need not be out of reach."
            products={cheapProducts}
            loading={loading}
          />
        </div>

        {/* ── Prestige divider ── */}
        <div className="col-band">
          <span className="col-band-label">For the Discerning</span>
          <h3 className="col-band-title">Prestige Collection</h3>
          <div className="col-band-rule" />
          <p className="col-band-sub">
            Reserve-tier pieces — worn by those who know exactly who they are.
          </p>
        </div>

        {/* ── Prestige ── */}
        <div id="col-section-prestige">
          <CollectionSection
            eyebrow="Investment Pieces"
            title="Prestige"
            description="₦50,000 and above — the pinnacle of the collection, for those who demand the finest."
            products={expensiveProducts}
            loading={loading}
          />
        </div>

      </div>
    </>
  );
}

export default Collections;