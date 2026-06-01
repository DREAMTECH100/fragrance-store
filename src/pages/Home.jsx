import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionVideo from "../components/SectionVideo";

function pickRandom(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function Home({ addToWishlist }) {

  const formatNaira = (value) => {
    if (value == null) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const [products, setProducts] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

  const quotes = [
    `"Perfume is the art that completes your presence.\nA silent introduction before you speak.\nA memory that lingers beyond time.\nA signature of identity."`,
    `"Skincare is not vanity — it is power.\nA ritual of self-respect.\nA commitment to elegance.\nA foundation of confidence."`,
    `"Makeup is expression.\nNot to hide, but to reveal.\nTo define, not to disguise.\nTo elevate identity."`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fragrances = products.filter(p => p.category === "fragrances");
  const makeup = products.filter(p => p.category === "makeup");
  const skincare = products.filter(p => p.category === "skincare");
  const accessories = products.filter(p => p.category === "accessories");

  const editorialPosts = [
    {
      slug: "architecture-of-a-signature-scent",
      title: "The Architecture of a Signature Scent",
      excerpt:
        "Layering is deliberate construction. Base notes anchor like black cashmere. Heart notes unfold in quiet revelation. Top notes command the entrance. One drop — and presence is rewritten.",
      date: "March 2026",
      readTime: "7 min",
      image: "/images/BLACK BOTTLE.jpeg",
    },
    {
      slug: "nocturnal-ritual-oud-and-amber",
      title: "Nocturnal Ritual — Oud, Amber, After Dark",
      excerpt:
        "As light fades, heavier compositions awaken. Smoked leather meets rich oud; amber glows like embers. A fragrance not worn — but inhabited. For evenings that demand memory.",
      date: "February 2026",
      readTime: "9 min",
      image: "/images/LOUIS VITTON.jpeg",
    },
    {
      slug: "the-restraint-of-radiance",
      title: "The Restraint of Radiance — Skincare as Power",
      excerpt:
        "True luxury is subtraction. One precise serum, applied with ceremony. Rare botanicals meet clinical precision. Skin doesn't shout — it commands quietly, eternally luminous.",
      date: "January 2026",
      readTime: "6 min",
      image: "/images/LOUIS VITTON2.jpeg",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-softwhite text-darktext relative">

      {/* ── Noise grain overlay ── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.018] z-[-1]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=2000&q=10&fm=jpg')", backgroundSize: "cover", mixBlendMode: "overlay" }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --gold: #b8965a;
          --gold-light: #d4af72;
          --gold-dim: rgba(184,150,90,0.3);
          --ink: #0e0c0a;
          --cream: #faf8f4;
          --warm-grey: #8a8178;
          --red: #c0392b;
          --red-dim: rgba(192,57,43,0.25);
          --red-soft: rgba(192,57,43,0.08);
        }

        .font-display  { font-family: 'Cormorant Garamond', serif; }
        .font-label    { font-family: 'Tenor Sans', sans-serif; }
        .font-body     { font-family: 'Montserrat', sans-serif; }

        /* ── Red divider (section structure) ── */
        .divider-gold {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--red), transparent);
          margin: 0 auto;
        }

        /* ── Gold divider (price / luxury accent) ── */
        .divider-red {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 0 auto;
        }

        /* ── Quote animation ── */
        @keyframes quoteAnim {
          0%   { transform: translateY(32px); opacity: 0; filter: blur(6px); }
          18%  { transform: translateY(0);    opacity: 1; filter: blur(0); }
          78%  { transform: translateY(0);    opacity: 1; filter: blur(0); }
          100% { transform: translateY(-32px);opacity: 0; filter: blur(6px); }
        }
        .animate-quote { animation: quoteAnim 7s cubic-bezier(0.42,0,0.58,1) 1; }

        /* ── Scrolling strip ── */
        @keyframes luxScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-lux-scroll {
          display: flex;
          animation: luxScroll 60s linear infinite;
        }

        /* ── Hover lift ── */
        .lux-card { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.6s ease; }
        .lux-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.18); }

        /* ── Section reveal ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }

        /* ── Gold shimmer on hover ── */
        .gold-hover:hover { color: var(--gold); transition: color 0.3s ease; }

        /* ── Red border button (light bg sections) ── */
        .btn-gold {
          display: inline-block;
          padding: 14px 48px;
          border: 1px solid var(--red);
          color: var(--red);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          transition: background 0.4s ease, color 0.4s ease;
          text-decoration: none;
        }
        .btn-gold:hover { background: var(--red); color: #fff; }

        .btn-gold-inv {
          display: inline-block;
          padding: 14px 48px;
          border: 1px solid rgba(255,255,255,0.5);
          color: rgba(255,255,255,0.9);
          font-family: 'Tenor Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          transition: background 0.4s ease, border-color 0.4s ease;
          text-decoration: none;
          backdrop-filter: blur(4px);
        }
        .btn-gold-inv:hover { background: rgba(184,150,90,0.15); border-color: var(--gold); }

        /* ── Product card image zoom ── */
        .img-zoom img { transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
        .img-zoom:hover img { transform: scale(1.08); }

        /* ── Thin rule ── */
        .rule { width: 100%; height: 1px; background: rgba(0,0,0,0.08); }
        .rule-white { width: 100%; height: 1px; background: rgba(255,255,255,0.12); }

        /* ── Tag pill ── */
        .tag-pill {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 3px 10px;
          border: 1px solid var(--red);
          color: var(--red);
          border-radius: 999px;
        }

        /* ── Section label ── */
        .sec-label {
          font-family: 'Tenor Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
        }

        /* ── Big section heading ── */
        .sec-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 1.05;
        }
      `}</style>

      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section
        className="relative h-screen"
        style={{ backgroundImage: `url(/images/CEO3.jpeg)`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dark vignette — deeper at bottom */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)" }} />

        {/* Thin red horizontal rule — brand accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--red)" }} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

          {/* Eyebrow label */}
          <p className="sec-label text-white/60 mb-8 tracking-[0.5em]">Maison de Luxe</p>

          <h1 className="sec-heading text-white"
            style={{ fontSize: "clamp(52px, 9vw, 120px)", textShadow: "0 4px 40px rgba(0,0,0,0.4)" }}>
            DISCOVER <span style={{ color: "var(--gold)", fontStyle: "italic" }}>LUXURY</span>
          </h1>

          {/* Gold rule */}
          <div className="divider-gold my-10" />

          {/* Rotating quote */}
          <div className="h-[160px] overflow-hidden flex items-center justify-center max-w-3xl">
            <p
              key={quoteIndex}
              className="text-white/80 animate-quote font-display whitespace-pre-line leading-relaxed"
              style={{ fontSize: "clamp(14px, 2vw, 20px)", fontStyle: "italic", fontWeight: 300, letterSpacing: "0.05em" }}
            >
              {quotes[quoteIndex]}
            </p>
          </div>

          <Link to="/fragrances" className="btn-gold-inv mt-10">
            Enter the Collection
          </Link>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <p className="sec-label text-white" style={{ fontSize: "9px", letterSpacing: "0.4em" }}>Scroll</p>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, white, transparent)" }} />
          </div>
        </div>

        {/* Gold rule bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)" }} />
      </section>

      {/* ═══════════════════ SCROLLING PRODUCT STRIP ═══════════════════ */}
      <section className="py-10 relative" style={{ background: "#fff" }}>
        <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: "var(--red)" }} />
        <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: "var(--red)" }} />

        <div className="overflow-hidden">
          <div className="animate-lux-scroll gap-5 px-5">
            {[
              ...pickRandom(fragrances, 2),
              ...pickRandom(makeup, 2),
              ...pickRandom(skincare, 2),
              ...pickRandom(accessories, 2),
            ].map((p) => (
              <Link
                key={p?._id}
                to={`/product/${p?._id}`}
                className="flex-shrink-0 w-56 lux-card img-zoom"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "4px", overflow: "hidden", textDecoration: "none" }}
              >
                <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
                  <img
                    loading="lazy"
                    src={p?.image ? (p.image.startsWith("http") ? p.image : `${baseURL}${p.image}`) : "/images/placeholder.png"}
                    className="w-full h-full object-cover"
                    alt={p?.name}
                  />
                  {p?.isNew && (
                    <span className="absolute top-3 left-3 tag-pill" style={{ background: "#fff", borderColor: "var(--red)", color: "var(--red)" }}>New</span>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1"
                    style={{ background: "rgba(0,0,0,0.65)", padding: "3px 8px", borderRadius: "3px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#b8965a" viewBox="0 0 24 24" className="w-3 h-3">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="font-label text-white/80" style={{ fontSize: "10px" }}>{p?.rating ? p.rating.toFixed(1) : "4.0"}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-label uppercase truncate" style={{ fontSize: "10px", letterSpacing: "0.15em", color: "var(--ink)" }}>{p?.name}</p>
                  <p className="font-body mt-1 line-clamp-1" style={{ fontSize: "10px", color: "var(--warm-grey)" }}>{p?.description}</p>
                  <p className="font-label mt-2" style={{ fontSize: "12px", color: "var(--gold)" }}>{formatNaira(p?.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionVideo
        src="/videos/fragrance.mp4"
        title="Fragrance"
        subtitle="A signature that enters before you do — and lingers after you leave."
      />

      {/* ═══════════════════════ FRAGRANCES ═══════════════════════ */}
      <section className="relative" style={{ background: "var(--cream)", paddingTop: "100px", paddingBottom: "100px" }}>

        {/* Section header */}
        <div className="text-center mb-20 px-6" style={{ animationDelay: "0.1s" }}>
          <p className="sec-label mb-5" style={{ color: "var(--red)" }}>Collection I</p>
          <h2 className="sec-heading" style={{ fontSize: "clamp(42px, 7vw, 88px)", color: "var(--ink)" }}>
            LUXURY
          </h2>
          <div className="divider-gold my-6" />
          <p className="font-body text-center mx-auto" style={{ color: "var(--warm-grey)", fontSize: "13px", letterSpacing: "0.12em", maxWidth: "500px", lineHeight: "1.9", fontStyle: "italic" }}>
            Crafted for presence. Designed to be remembered.<br />
            A signature that enters before you do.
          </p>
        </div>

        {/* Big featured grid — full bleed */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid md:grid-cols-2 gap-[3px] mb-4">
          {fragrances.slice(0, 4).map((product, i) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group relative block img-zoom"
              style={{ overflow: "hidden" }}
            >
              <img
                loading="lazy"
                src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                className="w-full object-cover"
                style={{ height: "540px", display: "block" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.2) 50%, transparent 100%)" }} />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="tag-pill mb-4" style={{ alignSelf: "flex-start", borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.6)" }}>
                  {product.category}
                </span>
                <h3 className="sec-heading text-white group-hover:text-yellow-200 transition-colors duration-500"
                  style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>
                  {product.name}
                </h3>
                <p className="font-body text-white/60 mt-3 line-clamp-2" style={{ fontSize: "12px", letterSpacing: "0.05em", maxWidth: "380px" }}>
                  {product.description?.slice(0, 100)}…
                </p>
                <div className="flex items-center justify-between mt-6">
                  <p className="font-label" style={{ color: "var(--gold-light)", fontSize: "14px" }}>
                    ₦{Number(product.price || 0).toLocaleString()}
                  </p>
                  <span className="font-label text-white/50 group-hover:text-white transition-colors duration-400"
                    style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", borderBottom: "1px solid rgba(184,150,90,0.4)", paddingBottom: "2px" }}>
                    Discover →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mini cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[2px] mb-16 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          {fragrances.slice(6, 15).map(product => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group relative block img-zoom"
              style={{ background: "#f5f3ef", overflow: "hidden" }}
            >
              <div style={{ height: "180px", overflow: "hidden" }}>
                <img
                  src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(10,8,6,0.5)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-label text-white uppercase truncate" style={{ fontSize: "10px", letterSpacing: "0.15em" }}>{product.name}</p>
                <p className="font-label mt-1" style={{ fontSize: "11px", color: "var(--gold-light)" }}>
                  ₦{Number(product.price || 0).toLocaleString()}
                </p>
              </div>
              {/* Visible name below on mobile */}
              <div className="p-3 md:hidden">
                <p className="font-label text-black/80 uppercase truncate" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>{product.name}</p>
                <p style={{ fontSize: "10px", color: "var(--gold)", marginTop: "2px" }}>₦{Number(product.price || 0).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center px-6">
          <Link to="/fragrances" className="btn-gold">
            View All Compositions
          </Link>
        </div>
      </section>

      <SectionVideo
        src="/videos/makeup.mp4"
        title="Makeup"
        subtitle="Sculpt. Define. Command attention without speaking."
      />

      {/* ═══════════════════════ MAKEUP ═══════════════════════ */}
      {makeup[0] && (
        <section
          className="relative"
          style={{
            backgroundImage: `url(${baseURL}${makeup[5]?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingTop: "110px",
            paddingBottom: "110px",
          }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(6,4,2,0.72)" }} />

          <div className="relative z-10 text-white px-6 md:px-16">

            <div className="text-center mb-20">
              <p className="sec-label mb-5" style={{ color: "var(--red)", opacity: 0.9 }}>Collection II</p>
              <h2 className="sec-heading" style={{ fontSize: "clamp(42px, 7vw, 88px)" }}>
                The Art of Expression
              </h2>
              <div className="divider-gold my-6" />
              <p className="font-body italic text-white/50" style={{ fontSize: "13px", letterSpacing: "0.1em" }}>
                Sculpt. Define. Command attention without speaking.
              </p>
            </div>

            {/* Big featured */}
            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid md:grid-cols-2 gap-[3px] mb-4">
              {makeup.slice(0, 2).map(product => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group relative block img-zoom"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    loading="lazy"
                    src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                    className="w-full object-cover"
                    style={{ height: "520px", display: "block" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <h3 className="sec-heading text-white" style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}>
                      {product.name}
                    </h3>
                    <span className="font-label mt-4 self-start text-white/60 group-hover:text-white transition-colors"
                      style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", borderBottom: "1px solid rgba(184,150,90,0.5)", paddingBottom: "2px" }}>
                      View Product →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Small cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-[2px] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-14">
              {makeup.slice(2, 8).map(product => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group relative block img-zoom"
                  style={{ overflow: "hidden", background: "rgba(255,255,255,0.04)" }}
                >
                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img
                      src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-label text-white/60 uppercase truncate group-hover:text-white transition-colors"
                      style={{ fontSize: "9px", letterSpacing: "0.15em" }}>
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="relative flex h-[6px] w-[6px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-yellow-400"></span>
                      </span>
                      <span className="font-label text-white/40" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link to="/makeup" className="btn-gold-inv">Enter the Atelier</Link>
            </div>
          </div>
        </section>
      )}

      <SectionVideo
        src="/videos/skincare.mp4"
        title="Skincare"
        subtitle="Where discipline meets glow — and skin becomes legacy."
      />

      {/* ═══════════════════════ SKINCARE ═══════════════════════ */}
      {skincare[0] && (
        <section style={{ background: "#faf9f6", paddingTop: "100px", paddingBottom: "100px" }}>

          <div className="text-center mb-20 px-6">
            <p className="sec-label mb-5" style={{ color: "var(--red)" }}>Collection III</p>
            <h2 className="sec-heading" style={{ fontSize: "clamp(42px, 7vw, 88px)", color: "var(--ink)" }}>
              Rituals of Radiance
            </h2>
            <div className="divider-gold my-6" />
            <p className="font-body italic text-center mx-auto" style={{ color: "var(--warm-grey)", fontSize: "13px", letterSpacing: "0.08em", maxWidth: "440px", lineHeight: "1.9" }}>
              Where discipline meets glow — and skin becomes legacy.
            </p>
          </div>

          {/* Big featured */}
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid md:grid-cols-2 gap-[3px] mb-4">
            {skincare.slice(0, 2).map(product => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group relative block img-zoom"
                style={{ overflow: "hidden" }}
              >
                <img
                  loading="lazy"
                  src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                  className="w-full object-cover"
                  style={{ height: "520px", display: "block" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,6,0.75) 0%, transparent 55%)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                  <h3 className="sec-heading" style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}>{product.name}</h3>
                  <span className="font-label mt-4 self-start text-white/50 group-hover:text-white transition-colors"
                    style={{ fontSize: "10px", letterSpacing: "0.3em", borderBottom: "1px solid rgba(184,150,90,0.4)", paddingBottom: "2px", textTransform: "uppercase" }}>
                    Discover →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Small cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[2px] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-16">
            {skincare.slice(3, 12).map(product => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group relative block img-zoom"
                style={{ overflow: "hidden", background: "#f0ede8" }}
              >
                <div style={{ height: "170px", overflow: "hidden" }}>
                  <img
                    src={product.image?.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(10,8,6,0.55)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-label text-white uppercase truncate" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>{product.name}</p>
                  <p style={{ fontSize: "10px", color: "var(--gold-light)", marginTop: "3px", fontFamily: "'Tenor Sans', sans-serif" }}>
                    ₦{Number(product.price || 0).toLocaleString()}
                  </p>
                </div>
                {/* Mobile visible info */}
                <div className="p-3 md:hidden">
                  <p className="font-label uppercase truncate" style={{ fontSize: "9px", letterSpacing: "0.12em", color: "var(--ink)" }}>{product.name}</p>
                  <p style={{ fontSize: "10px", color: "var(--gold)", marginTop: "2px", fontFamily: "'Tenor Sans', sans-serif" }}>₦{Number(product.price || 0).toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center px-6">
            <Link to="/skincare" className="btn-gold">Initiate Radiance</Link>
          </div>
        </section>
      )}

      {/* ═══════════════════ PRIVATE NOTES — EDITORIAL ═══════════════════ */}
      <section style={{ background: "var(--ink)", paddingTop: "110px", paddingBottom: "110px" }} className="relative overflow-hidden">

        {/* Atmospheric background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,150,90,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">

          <div className="text-center mb-20">
            <p className="sec-label mb-5" style={{ color: "var(--red)", opacity: 0.85 }}>The Journal</p>
            <h2 className="sec-heading text-white" style={{ fontSize: "clamp(42px, 6vw, 80px)" }}>
              Private Notes
            </h2>
            <div className="divider-gold my-6" />
            <p className="font-body italic text-white/40 mx-auto" style={{ fontSize: "13px", letterSpacing: "0.08em", maxWidth: "480px", lineHeight: "1.9" }}>
              On scent as identity. Ritual as reverence.<br />Products that linger long after the moment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {editorialPosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/editorial/${post.slug}`}
                className="group block lux-card"
                style={{ borderRadius: "2px", overflow: "hidden", textDecoration: "none",
                  border: "1px solid rgba(192,57,43,0.15)" }}
              >
                <div className="relative img-zoom" style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Multi-layer overlay for depth */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,4,2,0.92) 0%, rgba(6,4,2,0.4) 50%, transparent 100%)" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "rgba(184,150,90,0.06)" }} />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white" style={{ position: "absolute" }}>
                  <time className="font-label text-white/40 block mb-3" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                    {post.date} &nbsp;·&nbsp; {post.readTime}
                  </time>

                  <h3 className="sec-heading text-white group-hover:text-yellow-200 transition-colors duration-500"
                    style={{ fontSize: "clamp(17px, 2vw, 22px)" }}>
                    {post.title}
                  </h3>

                  <p className="font-body text-white/55 leading-relaxed mt-3 line-clamp-3"
                    style={{ fontSize: "12px", letterSpacing: "0.02em" }}>
                    {post.excerpt}
                  </p>

                  <span className="font-label mt-6 self-start text-white/40 group-hover:text-red-400 transition-colors duration-400"
                    style={{ fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase",
                      borderBottom: "1px solid rgba(192,57,43,0.4)", paddingBottom: "3px" }}>
                    Read in Full →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom red rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: "var(--red)" }} />
      </section>

    </div>
  );
}

export default Home;
