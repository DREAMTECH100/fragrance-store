import { useState, useEffect } from "react";
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
          <span key={i} className="mx-12 md:mx-20">
            {msg}
          </span>
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

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist?.length || 0;
// ✅ ADD THIS inside Navbar component (after hooks)
const baseURL = import.meta.env.VITE_API_URL;
  /* =======================
     SEARCH EFFECT
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

  const handleSearchSubmit = async (e) => {
    e?.preventDefault();

    if (searchTerm.trim().length < 2) return;

    try {
     const res = await fetch(
  `${baseURL}/api/products/search?q=${encodeURIComponent(searchTerm)}`
);
      const data = await res.json();

      if (data.length > 0) {
        // redirect dynamically to category/subcategory of first match
        const product = data[0];
        navigate(`/${product.category}?sub=${product.subcategory || ""}`);
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

      {/* TOP BARS */}
      <TopTicker />
      <PromoBar />

      {/* NAV */}
      <nav className="border-b border-darktext/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-28 lg:h-32">

            {/* LEFT SIDE: hamburger + search */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* HAMBURGER */}
              <button
                className="lg:hidden text-2xl text-darktext"
                onClick={() => setOpen(true)}
              >
                ☰
              </button>

              {/* SEARCH BUTTON */}
              <button onClick={() => setSearchOpen(!searchOpen)}>
                <Search className="w-6 h-6 text-darktext hover:text-primary transition" />
              </button>
            </div>

            {/* CENTER LOGO */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/">
                <img
                  src="/images/logo.jpeg"
                  className="h-24 lg:h-28 w-auto object-contain"
                  alt="logo"
                />
              </Link>
            </div>

            {/* RIGHT SIDE: desktop nav + wishlist + cart */}
            <div className="flex items-center gap-6 lg:gap-8">

              {/* DESKTOP NAV */}
              <div className="hidden lg:flex flex-1 justify-center space-x-10 xl:space-x-14">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.path}
                      className="
                        text-[14px] xl:text-[15px]
                        font-luxury uppercase
                        tracking-superWide
                        text-darktext
                        hover:text-primary
                        transition duration-300
                        relative
                        after:content-['']
                        after:absolute
                        after:left-0
                        after:-bottom-1
                        after:w-0
                        after:h-[1px]
                        after:bg-primary
                        hover:after:w-full
                        after:transition-all
                        after:duration-300
                      "
                    >
                      {item.name}
                    </Link>

                    {/* DROPDOWN */}
                    {item.subItems?.length > 0 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-softwhite border border-darktext/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-5 px-8 text-center">
                        {item.subItems.map((sub, i) => (
                          <Link
                            key={i}
                            to={`${item.path}?sub=${sub.slug}`}
                            className="block py-2 text-sm uppercase tracking-widestLux text-darktext hover:text-primary transition"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* WISHLIST */}
              <Link to="/wishlist" className="relative">
                <Heart className="w-6 h-6 text-darktext hover:text-primary transition" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* CART */}
              <Link to="/cart" className="relative">
                <ShoppingBag className="w-6 h-6 text-darktext hover:text-primary transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

       {/* SEARCH PANEL */}
{searchOpen && (
  <div className="fixed inset-x-0 top-full bg-softwhite border-b border-darktext/10 z-50">
    <div className="max-w-4xl mx-auto px-6 py-6">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!searchTerm.trim()) return;
          try {
            const res = await fetch(
  `${baseURL}/api/products/search?q=${encodeURIComponent(searchTerm)}`
);
            const data = await res.json();
            if (data.length > 0) {
              const product = data[0];
              navigate(`/${product.category}?sub=${product.subcategory || ""}`);
            }
            setSearchTerm("");
            setSuggestions([]);
            setSearchOpen(false);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <input
          id="search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-b py-4 text-xl focus:outline-none"
          placeholder="Search for products..."
          autoComplete="off"
        />
      </form>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <ul className="mt-2 border-t pt-2 max-h-60 overflow-y-auto">
          {suggestions.map((p) => (
            <li
              key={p._id}
              className="py-2 cursor-pointer hover:bg-gray-100 transition"
              onMouseDown={(e) => {
                // use onMouseDown instead of onClick to fire before blur
                e.preventDefault();
                navigate(`/${p.category}?sub=${p.subcategory || ""}`);
                setSearchTerm("");
                setSuggestions([]);
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

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-softwhite z-50 transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between p-6 border-b">
            <h2 className="text-xl font-luxury">MENU</h2>
            <button onClick={closeAll} className="text-3xl">×</button>
          </div>

          <nav className="p-6 space-y-5">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() =>
                    item.subItems?.length
                      ? toggleExpand(item.name)
                      : (navigate(item.path), closeAll())
                  }
                  className="flex justify-between w-full uppercase font-luxury text-darktext hover:text-primary transition duration-300"
                >
                  {item.name}
                  {item.subItems?.length > 0 && (
                    <ChevronDown
                      className={`w-5 h-5 ${expanded[item.name] ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {item.subItems?.length > 0 && expanded[item.name] && (
                  <div className="pl-4 mt-3 space-y-3 border-l">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        to={`${item.path}/${sub.slug}`}
                        onClick={closeAll}
                        className="block text-sm uppercase text-darktext hover:text-primary transition duration-300"
                      >
                        <ChevronRight className="inline w-4 h-4 mr-1" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* OVERLAY */}
        {open && (
          <div className="fixed inset-0 bg-black/30 z-40" onClick={closeAll} />
        )}
      </header>

      <div className="pt-[130px]" />
    </>
  );
}

export default Navbar;