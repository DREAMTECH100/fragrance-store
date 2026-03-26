// ... imports

function Gifts({ addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sub = searchParams.get("sub") || "";

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:5000/api/products?category=gifts";
    if (sub) url += `&subCategory=${encodeURIComponent(sub)}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [sub]);

  const displayTitle = sub ? sub.replace(/-/g, " ").toUpperCase() : "GIFTS";

  return (
    <div className="bg-softwhite min-h-screen">
      <section className="py-32 md:py-40 px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-luxury uppercase tracking-superWide text-darktext">
          {displayTitle}
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-sansLux text-darktext/70 tracking-widestLux">
          Curated moments of indulgence.
        </p>
      </section>

      {/* same grid as above */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* ... copy grid + loading/empty states from above */}
      </section>
    </div>
  );
}

export default Gifts;