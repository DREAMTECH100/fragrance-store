import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Search } from "lucide-react";

/* =========================
   NEWS ROTATOR
========================= */
function TopTicker() {
  const messages = [
    "FREE DELIVERY ON ORDERS ABOVE ₦100,000",
    "24 - 48 HOURS DELIVERY WITHIN LAGOS",
    "72 HOURS NATIONWIDE DELIVERY",
    "100% AUTHENTIC FRAGRANCES",
  ];

  const items = [...messages, ...messages];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-sm tracking-widest">
      <div className="flex whitespace-nowrap animate-marquee py-1">
        {items.map((msg, i) => (
          <span key={i} className="mx-10 font-semibold">
            {msg}
          </span>
        ))}
      </div>

      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        `}
      </style>
    </div>
  );
}

/* =========================
   NAVBAR
========================= */
function Navbar({ wishlist }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  /* SEARCH SUGGESTIONS LOGIC */
  useEffect(() => {
    if (searchTerm.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?q=${searchTerm}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length >= 3) {
      navigate(`/fragrances?search=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 w-full z-50">
        <TopTicker />

        <nav className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-6 py-4">

            {/* LEFT — HAMBURGER */}
            <div className="flex items-center">
              <div
                className="md:hidden cursor-pointer text-2xl"
                onClick={() => setOpen(!open)}
              >
                {open ? "✕" : "☰"}
              </div>
            </div>

            {/* CENTER — LOGO */}
            <div className="flex justify-center">
              <Link to="/">
                <img
                  src="/images/logo.jpeg"
                  alt="Fragrance Solution"
                  className="h-32 md:h-32 object-contain"
                />
              </Link>
            </div>

            {/* RIGHT — ICONS */}
            <div className="flex justify-end items-center gap-5 relative">
              {/* SEARCH ICON */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 rounded hover:bg-gray-100 transition"
              >
                <Search className="w-5 h-5 text-gray-700 hover:text-red-600 transition" />
              </button>

              {/* SEARCH DROPDOWN */}
              {searchOpen && (
                <div className="absolute top-10 right-0 w-64 bg-white border shadow-md z-50">
                  <form onSubmit={handleSearchSubmit} className="px-2 py-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full border rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-600"
                      autoFocus
                    />
                  </form>
                  {suggestions.length > 0 && (
                    <div className="max-h-64 overflow-y-auto">
                      {suggestions.map((item) => (
                        <Link
                          key={item._id}
                          to={`/product/${item._id}`}
                          className="block px-4 py-2 hover:bg-red-50 transition"
                          onClick={() => {
                            setSearchTerm("");
                            setSuggestions([]);
                            setSearchOpen(false);
                            setOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* WISHLIST */}
              <Link to="/wishlist" className="relative">
                <Heart className="w-5 h-5 hover:text-red-600 transition" />
                {wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* CART */}
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5 hover:text-red-600 transition" />
              </Link>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex justify-center gap-10 pb-4 text-sm tracking-widest">
            {["Home", "Fragrances", "Accessories", "Collections", "About"].map(
              (item) => (
                <Link
                  key={item}
                  className="hover:text-red-600 transition"
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* MOBILE SLIDE MENU */}
          <div
            className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40 transform transition-transform duration-500 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col mt-24 px-6 space-y-6 text-lg">
              {["Home", "Fragrances", "Accessories", "Collections", "About", "Cart"].map(
                (item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="relative group text-xl"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-1 bg-red-600 rounded-full group-hover:w-full transition-all duration-500"></span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* OVERLAY */}
          {open && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
              onClick={() => setOpen(false)}
            />
          )}
        </nav>
      </header>

      {/* PAGE CONTENT OFFSET */}
      <div className="pt-[128px]">
        {/* Your hero and page content goes here */}
      </div>
    </>
  );
}

export default Navbar;