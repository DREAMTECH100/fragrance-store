import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const quotes = [
    `“Perfume is the art that completes your presence.\nA silent introduction before you speak.\nA memory that lingers beyond time.\nA signature of identity.”`,
    `“Skincare is not vanity — it is power.\nA ritual of self-respect.\nA commitment to elegance.\nA foundation of confidence.”`,
    `“Makeup is expression.\nNot to hide, but to reveal.\nTo define, not to disguise.\nTo elevate identity.”`,
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

  // Editorial content — unchanged
  const editorialPosts = [
    {
      slug: "architecture-of-a-signature-scent",
      title: "The Architecture of a Signature Scent",
      excerpt: "Layering is deliberate construction. Base notes anchor like black cashmere. Heart notes unfold in quiet revelation. Top notes command the entrance. One drop — and presence is rewritten.",
      date: "March 2026",
      readTime: "7 min",
      image: "https://thumbs.dreamstime.com/b/luxury-dark-perfume-bottle-elegant-texture-dramatic-lighting-black-table-luxurious-textured-surface-shown-398748408.jpg"
    },
    {
      slug: "nocturnal-ritual-oud-and-amber",
      title: "Nocturnal Ritual — Oud, Amber, After Dark",
      excerpt: "As light fades, heavier compositions awaken. Smoked leather meets rich oud; amber glows like embers. A fragrance not worn — but inhabited. For evenings that demand memory.",
      date: "February 2026",
      readTime: "9 min",
      image: "https://thumbs.dreamstime.com/b/luxury-black-obsidian-perfume-bottle-warm-amber-liquid-reflected-mirror-surface-against-golden-bokeh-dramatic-low-key-420798605.jpg"
    },
    {
      slug: "the-restraint-of-radiance",
      title: "The Restraint of Radiance — Skincare as Power",
      excerpt: "True luxury is subtraction. One precise serum, applied with ceremony. Rare botanicals meet clinical precision. Skin doesn't shout — it commands quietly, eternally luminous.",
      date: "January 2026",
      readTime: "6 min",
      image: "https://thumbs.dreamstime.com/b/young-woman-applying-facial-serum-dropper-skincare-routine-beauty-treatment-glowing-skin-self-care-concept-young-woman-424011595.jpg"
    }
  ];

  return (
    <div className="bg-softwhite text-darktext relative">
      {/* ── Global luxurious overlay (subtle film grain / depth) ── */}
      <div className="fixed inset-0 pointer-events-none bg-[url('https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=2000&q=10&fm=jpg')] opacity-[0.015] mix-blend-overlay z-[-1]" />

      {/* ================= HERO ================= */}
      <section
        className="relative h-screen"
        style={{
          backgroundImage: `url(/images/CEO3.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-6xl md:text-8xl font-luxury text-white uppercase tracking-[0.25em] leading-tight drop-shadow-2xl">
            DISCOVER <span className="text-primary">LUXURY</span>
          </h1>

          <div className="mt-10 h-[180px] overflow-hidden flex items-center justify-center">
            <p
              key={quoteIndex}
              className="text-white/90 text-xl md:text-3xl italic font-luxury tracking-wide whitespace-pre-line leading-relaxed animate-quote"
            >
              {quotes[quoteIndex]}
            </p>
          </div>

          <Link
            to="/fragrances"
            className="mt-12 inline-block border border-white/70 px-12 py-5 text-white uppercase tracking-[0.3em] hover:bg-white/10 hover:border-white transition-all duration-500 backdrop-blur-sm"
          >
            Enter the Collection
          </Link>
        </div>

        <style>{`
          @keyframes quoteAnim {
            0% { transform: translateY(40px); opacity: 0; filter: blur(4px); }
            20% { transform: translateY(0); opacity: 1; filter: blur(0); }
            75% { transform: translateY(0); opacity: 1; filter: blur(0); }
            100% { transform: translateY(-40px); opacity: 0; filter: blur(4px); }
          }
          .animate-quote {
            animation: quoteAnim 7s cubic-bezier(0.42, 0, 0.58, 1) 1;
          }
        `}</style>
      </section>

   <section className="py-12 relative">
  <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600/80"></div>
  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600/80"></div>

  <div className="overflow-hidden">
    <div className="flex animate-scroll gap-6 px-6 md:px-16">
      {[
        ...pickRandom(fragrances, 2),
        ...pickRandom(makeup, 2),
        ...pickRandom(skincare, 2),
        ...pickRandom(accessories, 2),
      ].map((p) => (
        <Link
          key={p?._id}
          to={`/product/${p?._id}`}
          className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-500 group"
        >
          {/* IMAGE */}
          <div className="relative w-full h-64 overflow-hidden">
           <img
  src={p?.image ? `${baseURL}${p.image}` : "/images/placeholder.png"}
  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
  alt={p?.name}
/>

            {/* NEW BADGE top-left white rounded */}
            {p?.isNew && (
              <span className="absolute top-2 left-2 bg-white text-black text-[10px] font-semibold px-2 py-1 rounded tracking-widest shadow-md select-none">
                NEW
              </span>
            )}

            {/* 5-STAR RATING bottom-left black box */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white rounded-md px-2 py-[2px] flex items-center space-x-1 select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFD700"
                viewBox="0 0 24 24"
                stroke="#FFD700"
                strokeWidth="1"
                className="w-4 h-4"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-xs font-semibold">{p?.rating ? p.rating.toFixed(1) : "4.0"}</span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-4 text-black">
            {/* NAME */}
            <h3 className="uppercase font-semibold tracking-wider text-sm leading-tight">{p?.name}</h3>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{p?.description}</p>

            {/* PRICE */}
            <p className="mt-3 font-semibold text-sm">{formatNaira(p?.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>

  <style>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      display: flex;
      animation: scroll 55s linear infinite;
    }
  `}</style>
</section>

 {/* ================= FRAGRANCES ================= */}
<section className="py-28 px-6 md:px-16 bg-gradient-to-b from-softwhite to-white relative overflow-hidden">
  {/* Subtle section vignette for depth */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />

  <div className="text-center mb-20 relative z-10">
    <div className="w-24 h-[2px] bg-primary/70 mx-auto mb-8"></div>

    <h2 className="text-5xl md:text-7xl font-luxury font-semibold uppercase tracking-[0.25em] text-darktext">
      Fragrances
    </h2>

    <p className="text-darktext/80 mt-6 tracking-[0.2em] max-w-2xl mx-auto text-sm md:text-base font-medium italic leading-relaxed">
      Crafted for presence. Designed to be remembered.  
      A signature that enters before you do — and lingers after you leave.
    </p>

    <div className="w-24 h-[2px] bg-primary/70 mx-auto mt-8"></div>
  </div>

  {/* Big featured */}
  <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid md:grid-cols-2 gap-2 mb-16">
    {fragrances.slice(0, 4).map(product => (
      <Link
        key={product._id}
        to={`/product/${product._id}`}
        className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-700"
      >
        <img
  src={`${baseURL}${product.image}`}
  className="w-full h-[520px] object-cover transition-transform duration-1000 group-hover:scale-110"
/>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
          <h3 className="text-3xl md:text-4xl font-luxury font-semibold uppercase tracking-wide group-hover:text-primary transition-colors duration-500">
            {product.name}
          </h3>

          <p className="mt-4 text-sm md:text-base text-white/85 max-w-md leading-relaxed">
            {product.description?.slice(0, 100)}...
          </p>

          <p className="mt-4 text-lg font-semibold">
            ₦{Number(product.price || 0).toLocaleString()}
          </p>

          <span className="mt-6 inline-block text-xs uppercase tracking-[0.35em] border border-white/60 px-10 py-3 hover:bg-white/10 hover:border-primary transition-all duration-500 backdrop-blur-sm">
            Discover This Elixir
          </span>
        </div>
      </Link>
    ))}
  </div>

  {/* Mini cards (exclude first 4) */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-20">
    {fragrances.slice(4, 12).map(product => (
      <Link
        key={product._id}
        to={`/product/${product._id}`}
        className="group relative border bg-white/70 backdrop-blur-md hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-lg overflow-hidden flex flex-col"
      >
        <div className="h-44 overflow-hidden relative">
         <img
  src={`${baseURL}${product.image}`}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>

          {/* Desktop hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-60 transition-opacity duration-500 hidden md:block" />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-[12px] md:text-sm uppercase tracking-[0.15em] font-semibold text-darktext group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-[11px] text-black/70 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="text-[11px] text-yellow-500 mt-2">
            {"★".repeat(product.rating || 4)}
            <span className="text-black/60 ml-1">
              ({product.rating || 4}/5)
            </span>
          </div>

          <p className="text-sm font-bold mt-3 text-black">
            ₦{Number(product.price || 0).toLocaleString()}
          </p>

          {/* CTA */}
          <div className="mt-auto pt-4">
            <span className="block w-full text-center text-[10px] uppercase tracking-[0.25em] py-2 border border-black/30 hover:border-primary hover:text-primary hover:bg-black/5 transition-all duration-400 rounded-sm md:opacity-0 md:group-hover:opacity-100">
              Claim Your Signature
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>

  <div className="text-center relative z-10">
    <Link
      to="/fragrances"
      className="inline-block border border-black/50 px-14 py-5 uppercase tracking-[0.3em] text-sm hover:bg-black hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl"
    >
      View All Compositions
    </Link>
  </div>
</section>

{/* ================= MAKEUP ================= */}
{makeup[0] && (
 <section
  className="relative group overflow-hidden py-28"
  style={{
    backgroundImage: `url(${baseURL}${makeup[5].image})`,
    backgroundSize: "contain",
    backgroundPosition: "center"
  }}
>
    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 text-white text-center px-6 md:px-16">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-luxury uppercase tracking-[0.25em]">
          The Art of Expression
        </h2>

        <p className="mt-6 text-white/80 italic tracking-wide text-lg">
          Sculpt. Define. Command attention without speaking.
        </p>
      </div>

      {/* BIG FEATURED */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid md:grid-cols-2 gap-2 mb-16">
        {makeup.slice(0, 2).map(product => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-700"
          >
           <img
  src={`${baseURL}${product.image}`}
  className="w-full h-[650px] object-cover group-hover:scale-110 transition duration-1000"
/>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="text-2xl font-luxury uppercase">
                {product.name}
              </h3>

              <span className="mt-4 inline-block text-xs uppercase tracking-widest border border-white px-6 py-2">
                View Product
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* SMALL CARDS (exclude first 2) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {makeup.slice(2, 8).map(product => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group relative bg-white/10 backdrop-blur border border-white/20 hover:border-white/70 transition-all duration-500 rounded-md overflow-hidden flex flex-col"
          >
            <div className="h-32 overflow-hidden">
             <img
  src={`${baseURL}${product.image}`}
  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
/>
            </div>

            <div className="p-3 flex flex-col flex-grow">
              <p className="text-[11px] uppercase tracking-wider">
                {product.name}
              </p>

              {/* 💎 CTA WITH PULSE */}
              <div className="mt-auto pt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-white/80">

                View Details

                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>

              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/makeup"
        className="mt-10 inline-block border border-white px-12 py-5 uppercase"
      >
        Enter the Atelier
      </Link>

    </div>
  </section>
)}

{/* ================= SKINCARE ================= */}
{skincare[0] && (
  <section className="py-28 px-6 md:px-16 bg-white">

    {/* 💎 HEADER WITH DESIGN */}
    <div className="text-center mb-16 relative">

      <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-24 h-[2px] bg-red-500/70 rounded-full"></div>

      <h2 className="text-6xl md:text-7xl font-luxury uppercase tracking-[0.25em]">
        Rituals of Radiance
      </h2>

      <p className="mt-6 text-darktext/70 italic tracking-wide text-lg">
        Where discipline meets glow — and skin becomes legacy.
      </p>

      <div className="absolute left-1/2 -translate-x-1/2 mt-6 w-24 h-[2px] bg-red-500/70 rounded-full"></div>

    </div>

    {/* BIG FEATURED */}
   <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen grid md:grid-cols-2 gap-2 mb-16">
      {skincare.slice(0, 2).map(product => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-700"
        >
          <img
  src={`${baseURL}${product.image}`}
  className="w-full h-[450px] object-cover group-hover:scale-110 transition duration-1000"
/>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <h3 className="text-2xl font-luxury uppercase">
              {product.name}
            </h3>

            <span className="mt-4 inline-block text-xs uppercase tracking-widest border border-white px-6 py-2">
              Discover
            </span>
          </div>
        </Link>
      ))}
    </div>

    {/* SMALL CARDS */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
      {skincare.slice(0, 5).map(product => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group border bg-white hover:shadow-xl transition-all duration-500 rounded overflow-hidden flex flex-col"
        >
          <div className="h-28 overflow-hidden">
           <img
  src={`${baseURL}${product.image}`}
  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
/>
          </div>

          <div className="p-3 flex flex-col flex-grow">
            <p className="text-[11px] uppercase">
              {product.name}
            </p>

            {/* 💎 CTA WITH PULSE */}
            <div className="mt-auto pt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-black/70">

              Explore More

              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>

            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="text-center">
      <Link
        to="/skincare"
        className="mt-10 inline-block border border-black px-12 py-5 uppercase"
      >
        Initiate Radiance
      </Link>
    </div>

  </section>
)}
      {/* ================= PRIVATE NOTES — EDITORIAL ================= */}
      <section className="py-28 px-6 md:px-16 bg-black text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none opacity-30" />

  <div className="max-w-6xl mx-auto relative z-10">
    <div className="text-center mb-20">
      <div className="w-16 h-[1px] bg-primary/70 mx-auto mb-6"></div>
      <h2 className="text-5xl md:text-6xl font-luxury uppercase tracking-[0.2em]">
        Private Notes
      </h2>
      <p className="mt-6 text-white/70 tracking-widest max-w-2xl mx-auto font-light italic">
        On scent as identity. Ritual as reverence. Products that linger long after the moment.
      </p>
      <div className="w-16 h-[1px] bg-primary/70 mx-auto mt-6"></div>
    </div>

    <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
      {editorialPosts.map(post => (
        <Link
          key={post.slug}
          to={`/editorial/${post.slug}`} // ✅ already correct
          className="group block relative rounded-xl overflow-hidden shadow-2xl hover:shadow-gold transition-shadow duration-700"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <time className="text-xs uppercase tracking-widest text-white/60 block mb-3">
              {post.date} • {post.readTime}
            </time>

            <h3 className="text-2xl font-luxury uppercase tracking-wide group-hover:text-primary transition-colors duration-500">
              {post.title}
            </h3>

            <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mt-3 opacity-90 group-hover:opacity-100 transition">
              {post.excerpt}
            </p>

            <span className="inline-block mt-6 text-xs uppercase tracking-[0.25em] border-b-2 border-primary/50 pb-1 group-hover:border-primary group-hover:text-primary transition duration-400">
              Read in Full
            </span>
          </div>
        </Link>
      ))}
    </div>

    {/* 🔥 FIXED BUTTON */}
    <div className="text-center mt-20">
      <Link
        to="/editorial" // ✅ ONLY works if you create this route
        className="inline-block border border-primary/60 px-12 py-5 uppercase tracking-[0.3em] text-sm hover:bg-primary/10 hover:border-primary transition-all duration-500 backdrop-blur-sm shadow-gold-sm hover:shadow-gold"
      >
        Enter the Archive
      </Link>
    </div>
  </div>
</section>

    </div>
  );
}

export default Home;