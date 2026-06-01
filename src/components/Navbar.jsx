import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Search, ChevronDown, ChevronRight, X, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useRef } from "react";

/* ─────────────────────────────────────────────────
   SHARED STYLES (injected once)
───────────────────────────────────────────────── */
const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Tenor+Sans&display=swap');

  :root {
    --red: #c0392b;
    --gold: #b8965a;
    --ink: #0e0c0a;
    --cream: #faf8f4;
  }

  /* Ticker */
  @keyframes nb-ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .nb-ticker { animation: nb-ticker 32s linear infinite; }

  /* Search panel slide down */
  @keyframes nb-slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nb-search-panel { animation: nb-slideDown 0.22s ease both; }

  /* Suggestion items */
  @keyframes nb-fadeItem {
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .nb-suggestion-item {
    animation: nb-fadeItem 0.2s ease both;
  }

  /* Dropdown */
  @keyframes nb-dropIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Mobile sidebar slide */
  @keyframes nb-slideIn {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
  }

  /* Nav link underline */
  .nb-navlink {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    position: relative;
    padding-bottom: 3px;
    transition: color 0.25s ease;
    white-space: nowrap;
  }
  .nb-navlink::after {
    content: '';
    position: absolute;
    left: 0; bottom: 0;
    width: 0; height: 1px;
    background: var(--red);
    transition: width 0.3s ease;
  }
  .nb-navlink:hover { color: var(--red); }
  .nb-navlink:hover::after { width: 100%; }

  /* Dropdown item */
  .nb-drop-item {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    display: block;
    padding: 9px 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: color 0.2s, padding-left 0.2s;
  }
  .nb-drop-item:last-child { border-bottom: none; }
  .nb-drop-item:hover { color: var(--red); padding-left: 4px; }

  /* Icon button */
  .nb-icon {
    color: var(--ink);
    transition: color 0.2s;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .nb-icon:hover { color: var(--red); }

  /* Badge */
  .nb-badge {
    position: absolute;
    top: -7px; right: -8px;
    background: var(--red);
    color: #fff;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px;
    min-width: 16px; height: 16px;
    border-radius: 999px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 3px;
    line-height: 1;
  }

  /* Search input */
  .nb-search-input {
    flex: 1;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    background: transparent;
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 0.04em;
    padding: 10px 0;
    outline: none;
    color: var(--ink);
    transition: border-color 0.3s;
  }
  .nb-search-input:focus { border-bottom-color: var(--red); }
  .nb-search-input::placeholder { color: rgba(14,12,10,0.3); }

  /* Mobile nav item */
  .nb-mobile-item {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    transition: color 0.2s;
  }
  .nb-mobile-item:hover { color: var(--red); }

  /* Promo bar shimmer */
  @keyframes nb-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

/* =======================
   TOP TICKER
======================= */
function TopTicker() {
  const messages = [
    "100% AUTHENTIC FRAGRANCES",
    "FREE DELIVERY ON ORDERS ABOVE ₦1,000,000",
    "24 – 48 HOURS DELIVERY WITHIN LAGOS",
    "72 HOURS NATIONWIDE DELIVERY",
  ];
  const items = [...messages, ...messages];

  return (
    <div style={{ background: "var(--red)", overflow: "hidden" }}>
      <div className="nb-ticker" style={{ display: "flex", whiteSpace: "nowrap", padding: "8px 0" }}>
        {items.map((msg, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#fff",
              marginLeft: "60px",
              marginRight: "60px",
              display: "inline-flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {msg}
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "8px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* =======================
   PROMO BAR
======================= */
function PromoBar() {
  return (
    <div style={{
      background: "var(--ink)",
      color: "rgba(255,255,255,0.75)",
      textAlign: "center",
      padding: "8px 20px",
      fontFamily: "'Tenor Sans', sans-serif",
      fontSize: "9.5px",
      letterSpacing: "0.35em",
      textTransform: "uppercase",
    }}>
      Luxury Season Sale&nbsp;&nbsp;
      <span style={{ color: "var(--gold)" }}>✦</span>
      &nbsp;&nbsp;Up to 30% Off Select Items&nbsp;&nbsp;
      <span style={{ color: "var(--gold)" }}>✦</span>
      &nbsp;&nbsp;Limited Time Only
    </div>
  );
}

/* =======================
   NAVBAR
======================= */
function Navbar({ wishlist }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const searchRef = useRef(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist?.length || 0;
  const baseURL = import.meta.env.VITE_API_URL;

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (searchTerm.trim().length < 2) { setSuggestions([]); return; }
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${baseURL}/api/products/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) { console.error(err); }
    };
    fetchSuggestions();
  }, [searchTerm]);

  const handleSearchSubmit = async (e) => {
    e?.preventDefault();
    if (searchTerm.trim().length < 2) return;
    try {
      const res = await fetch(`${baseURL}/api/products/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (data.length > 0) navigate(`/product/${data[0]._id}`);
      setSearchTerm(""); setSuggestions([]); setSearchOpen(false);
    } catch (err) { console.error(err); }
  };

  const navItems = [
    {
      name: "FRAGRANCES", path: "/fragrances",
      subItems: [
        { label: "MEN'S PERFUME", slug: "mens-perfume" },
        { label: "WOMEN'S PERFUME", slug: "womens-perfume" },
        { label: "ALL BRANDS", slug: "all-brands" },
        { label: "ALL FRAGRANCES", slug: "" },
      ],
    },
    { name: "BODY MIST", path: "/body-mist", subItems: [] },
    { name: "MINI PERFUME", path: "/mini-perfume", subItems: [] },
    {
      name: "MAKEUP", path: "/makeup",
      subItems: [
        { label: "LIPS", slug: "lips" },
        { label: "EYES", slug: "eyes" },
        { label: "FACE", slug: "face" },
        { label: "CHEEKS", slug: "cheeks" },
        { label: "VIEW ALL MAKEUP", slug: "" },
      ],
    },
    {
      name: "SKINCARE", path: "/skincare",
      subItems: [
        { label: "MOISTURIZERS", slug: "moisturizers" },
        { label: "SERUMS", slug: "serums" },
        { label: "CLEANSERS", slug: "cleansers" },
        { label: "BODY OIL", slug: "body-oil" },
        { label: "HAIR PERFUME", slug: "hair-perfume" },
        { label: "DEODORANT BODY SPRAYS", slug: "deodorant-body-sprays" },
        { label: "VIEW ALL SKINCARE", slug: "" },
      ],
    },
    {
      name: "HOME FRAGRANCES", path: "/home-fragrances",
      subItems: [
        { label: "SCENTED CANDLES", slug: "scented-candles" },
        { label: "DIFFUSERS", slug: "diffusers" },
        { label: "ROOM SPRAYS", slug: "room-sprays" },
        { label: "VIEW ALL HOME FRAGRANCES", slug: "" },
      ],
    },
    { name: "COLLECTIONS", path: "/collections", subItems: [] },
    { name: "GIFTS", path: "/gifts", subItems: [] },
    { name: "NEW ARRIVALS", path: "/new", subItems: [] },
    { name: "ABOUT", path: "/about", subItems: [] },
  ];

  const toggleExpand = (name) => setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  const closeAll = () => { setOpen(false); setExpanded({}); };

  return (
    <>
      <style>{NAV_STYLES}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "#faf8f4",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.4s ease",
      }}>

        {/* ── TOP BARS ── */}
        <TopTicker />
        <PromoBar />

        {/* ── MAIN NAV ROW ── */}
        <nav style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "88px" }}>

              {/* LEFT: hamburger + search */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

                {/* Hamburger — mobile only */}
                <button
                  className="lg:hidden nb-icon"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>

                {/* Search */}
                <button
                  className="nb-icon"
                  onClick={() => { setSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 100); }}
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* CENTER: Logo */}
              <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                <Link to="/" style={{ display: "block" }}>
                  <img
                    src="/images/logo.jpeg"
                    alt="logo"
                    style={{ height: "72px", width: "auto", objectFit: "contain" }}
                  />
                </Link>
              </div>

              {/* RIGHT: desktop nav links + icons */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

                {/* Desktop nav — hidden on mobile */}
                <div className="hidden lg:flex" style={{ alignItems: "center", gap: "28px", marginRight: "12px" }}>
                  {navItems.map((item) => (
                    <div key={item.name} style={{ position: "relative" }} className="group">
                      <Link to={item.path} className="nb-navlink">
                        {item.name}
                        {item.subItems?.length > 0 && (
                          <ChevronDown size={10} style={{ display: "inline", marginLeft: "3px", verticalAlign: "middle", opacity: 0.5 }} />
                        )}
                      </Link>

                      {/* Dropdown */}
                      {item.subItems?.length > 0 && (
                        <div style={{
                          position: "absolute", top: "calc(100% + 16px)",
                          left: "50%", transform: "translateX(-50%)",
                          width: "220px",
                          background: "#faf8f4",
                          border: "1px solid rgba(0,0,0,0.07)",
                          borderTop: "2px solid var(--red)",
                          boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
                          padding: "16px 24px",
                          zIndex: 100,
                          animation: "nb-dropIn 0.2s ease both",
                        }}
                          className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        >
                          {item.subItems.map((sub, i) => (
                            <Link
                              key={i}
                              to={`${item.path}?sub=${sub.slug}`}
                              className="nb-drop-item"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Thin vertical rule */}
                <div className="hidden lg:block" style={{ width: "1px", height: "20px", background: "rgba(0,0,0,0.12)" }} />

                {/* Wishlist */}
                <Link to="/wishlist" style={{ position: "relative", display: "flex" }} className="nb-icon">
                  <Heart size={20} />
                  {wishlistCount > 0 && <span className="nb-badge">{wishlistCount}</span>}
                </Link>

                {/* Cart */}
                <Link to="/cart" style={{ position: "relative", display: "flex" }} className="nb-icon">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && <span className="nb-badge">{cartCount}</span>}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* ── SEARCH PANEL ── */}
        {searchOpen && (
          <div
            className="nb-search-panel"
            style={{
              position: "fixed", insetInline: 0, top: "auto",
              background: "#faf8f4",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              zIndex: 60,
            }}
            onClick={() => { setSearchOpen(false); setSuggestions([]); }}
          >
            <div
              style={{ maxWidth: "760px", margin: "0 auto", padding: "28px 32px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <input
                  ref={searchRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="nb-search-input"
                  placeholder="Search products…"
                  autoComplete="off"
                />
                <button type="submit" className="nb-icon" aria-label="Submit search">
                  <Search size={20} />
                </button>
                <button
                  type="button"
                  className="nb-icon"
                  aria-label="Close search"
                  onClick={() => { setSearchOpen(false); setSuggestions([]); }}
                >
                  <X size={20} />
                </button>
              </form>

              {suggestions.length > 0 && (
                <ul style={{ marginTop: "8px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "8px", maxHeight: "240px", overflowY: "auto", listStyle: "none", padding: 0 }}>
                  {suggestions.map((p, index) => (
                    <li
                      key={p._id}
                      className="nb-suggestion-item"
                      style={{
                        padding: "12px 8px",
                        cursor: "pointer",
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--ink)",
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
                        transition: "color 0.2s, background 0.2s",
                        animationDelay: `${index * 50}ms`,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; e.currentTarget.style.background = "rgba(192,57,43,0.03)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.background = "transparent"; }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        navigate(`/product/${p._id}`);
                        setSearchTerm(""); setSuggestions([]); setSearchOpen(false);
                      }}
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* ── MOBILE SIDEBAR ── */}
        <div style={{
          position: "fixed", top: 0, left: 0,
          height: "100%", width: "80%", maxWidth: "320px",
          background: "#faf8f4",
          zIndex: 60,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
          display: "flex", flexDirection: "column",
          boxShadow: open ? "4px 0 40px rgba(0,0,0,0.12)" : "none",
        }}>

          {/* Sidebar header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "24px 24px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px", fontWeight: 300,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--ink)",
            }}>
              Menu
            </span>
            <button className="nb-icon" onClick={closeAll} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          {/* Thin red accent line */}
          <div style={{ height: "2px", background: "var(--red)" }} />

          {/* Nav items */}
          <nav style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
            {navItems.map((item) => (
              <div key={item.name} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <button
                  onClick={() =>
                    item.subItems?.length
                      ? toggleExpand(item.name)
                      : (navigate(item.path), closeAll())
                  }
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    width: "100%", padding: "16px 24px",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "var(--ink)",
                    transition: "color 0.2s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--red)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink)"}
                >
                  {item.name}
                  {item.subItems?.length > 0 && (
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.25s",
                        transform: expanded[item.name] ? "rotate(180deg)" : "rotate(0deg)",
                        opacity: 0.5,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>

                {/* Sub-items */}
                {item.subItems?.length > 0 && expanded[item.name] && (
                  <div style={{
                    background: "rgba(192,57,43,0.03)",
                    borderLeft: "2px solid var(--red)",
                    margin: "0 24px 8px",
                    borderRadius: "0 2px 2px 0",
                    padding: "4px 0",
                  }}>
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        to={`${item.path}/${sub.slug}`}
                        onClick={closeAll}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          padding: "10px 16px",
                          fontFamily: "'Tenor Sans', sans-serif",
                          fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                          color: "rgba(14,12,10,0.65)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--red)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "rgba(14,12,10,0.65)"}
                      >
                        <ChevronRight size={10} style={{ opacity: 0.4, flexShrink: 0 }} />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div style={{
            padding: "20px 24px",
            borderTop: "1px solid rgba(0,0,0,0.07)",
            display: "flex", gap: "20px", alignItems: "center",
          }}>
            <Link to="/wishlist" onClick={closeAll} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }} className="nb-icon">
              <Heart size={18} />
              <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Wishlist</span>
            </Link>
            <Link to="/cart" onClick={closeAll} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }} className="nb-icon">
              <ShoppingBag size={18} />
              <span style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
            </Link>
          </div>
        </div>

        {/* OVERLAY */}
        {open && (
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 55, backdropFilter: "blur(2px)" }}
            onClick={closeAll}
          />
        )}

      </header>

      {/* Body offset — same height as before */}
      <div style={{ paddingTop: "130px" }} />
    </>
  );
}

export default Navbar;
