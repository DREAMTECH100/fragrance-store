import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Search, ChevronDown, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

/* =======================
   TOP TICKER (ORANGE)
======================= */
function TopTicker() {
  const messages = [
    "100% AUTHENTIC FRAGRANCES",
    "FREE DELIVERY ON ORDERS ABOVE ₦100,000",
    "24 - 48 HOURS DELIVERY WITHIN LAGOS",
    "72 HOURS NATIONWIDE DELIVERY",
  ];

  const items = [...messages, ...messages];

  return (
    <div className="w-full overflow-hidden bg-orange-500 text-white text-xs uppercase font-sansLux tracking-widestLux font-medium">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {items.map((msg, i) => (
          <span key={i} className="mx-12 md:mx-20">{msg}</span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* =======================
   PROMO BAR (BLACK)
======================= */
function PromoBar() {
  return (
    <div className="w-full bg-black text-white text-[11px] uppercase tracking-[0.35em] font-sansLux py-2 text-center">
      LUXURY SEASON SALE • UP TO 30% OFF SELECT ITEMS • LIMITED TIME ONLY
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
  const navigate = useNavigate();
  const { cart } = useCart();
  const searchRef = useRef(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist?.length || 0;

  const baseURL = import.meta.env.VITE_API_URL;

  /* =======================
     CLOSE SEARCH ON OUTSIDE CLICK
  ======================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  /* =======================
     SEARCH SUGGESTIONS
  ======================= */
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `${baseURL}/api/products/search?q=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  /* =======================
     SEARCH SUBMIT
  ======================= */
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm.trim().length < 2) return;

    try {
      const res = await fetch(
        `${baseURL}/api/products/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      if (data.length > 0) {
        navigate(`/product/${data[0]._id}`);
      }

      setSearchTerm("");
      setSuggestions([]);
      setSearchOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    {
      name: "FRAGRANCES",
      path: "/fragrances",
      subItems: [
        { label: "PRIVATE BLEND", slug: "private-blend" },
        { label: "SIGNATURE", slug: "signature" },
        { label: "SOLEIL", slug: "soleil" },
        { label: "RUNWAY", slug: "runway" },
        { label: "ALL FRAGRANCES", slug: "" },
      ],
    },
    {
      name: "MAKEUP",
      path: "/makeup",
      subItems: [
        { label: "LIPS", slug: "lips" },
        { label: "EYES", slug: "eyes" },
        { label: "FACE", slug: "face" },
        { label: "CHEEKS", slug: "cheeks" },
        { label: "VIEW ALL MAKEUP", slug: "" },
      ],
    },
    {
      name: "SKINCARE",
      path: "/skincare",
      subItems: [
        { label: "MOISTURIZERS", slug: "moisturizers" },
        { label: "SERUMS", slug: "serums" },
        { label: "CLEANSERS", slug: "cleansers" },
        { label: "VIEW ALL SKINCARE", slug: "" },
      ],
    },
    {
      name: "HOME FRAGRANCES",
      path: "/home-fragrances",
      subItems: [
        { label: "SCENTED-CANDLES", slug: "scented-candles" },
        { label: "DIFFUSERS", slug: "diffusers" },
        { label: "ROOM SPRAYS", slug: "room-sprays" },
        { label: "VIEW ALL HOME FRAGRANCES", slug: "" },
      ],
    },
    { name: "COLLECTIONS", path: "/collections", subItems: [] },
    { name: "GIFTS", path: "/gifts", subItems: [] },
    { name: "NEW", path: "/new", subItems: [] },
    { name: "ABOUT", path: "/about", subItems: [] },
  ];

  const toggleExpand = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const closeAll = () => {
    setOpen(false);
    setExpanded({});
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-softwhite">

        <TopTicker />
        <PromoBar />

        <nav className="border-b border-darktext/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-28 lg:h-32">

              {/* LEFT */}
              <div className="flex items-center gap-6 lg:gap-8">
                <button className="lg:hidden text-2xl" onClick={() => setOpen(true)}>☰</button>

                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(() => searchRef.current?.querySelector("input")?.focus(), 100);
                  }}
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>

              {/* LOGO */}
              <Link to="/">
                <img src="/images/logo.jpeg" className="h-24 lg:h-28" />
              </Link>

              {/* RIGHT */}
              <div className="flex items-center gap-6">
                <Link to="/wishlist" className="relative">
                  <Heart />
                  {wishlistCount > 0 && <span>{wishlistCount}</span>}
                </Link>

                <Link to="/cart" className="relative">
                  <ShoppingBag />
                  {cartCount > 0 && <span>{cartCount}</span>}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* SEARCH PANEL */}
        {searchOpen && (
          <div className="fixed inset-x-0 top-[130px] bg-softwhite z-50">
            <div ref={searchRef} className="max-w-4xl mx-auto px-6 py-6">

              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 border-b py-4 text-xl focus:outline-none"
                  placeholder="Search for products..."
                />

                <button type="submit">
                  <Search className="w-6 h-6" />
                </button>

                <button type="button" onClick={() => setSearchOpen(false)}>
                  ✕
                </button>
              </form>

              {suggestions.length > 0 && (
                <ul className="mt-2">
                  {suggestions.map((p) => (
                    <li
                      key={p._id}
                      onMouseDown={() => {
                        navigate(`/product/${p._id}`);
                        setSearchOpen(false);
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

      </header>

      <div className="pt-[130px]" />
    </>
  );
}

export default Navbar;