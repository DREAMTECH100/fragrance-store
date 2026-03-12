import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Collections() {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [cheapProducts, setCheapProducts] = useState([]);
  const [expensiveProducts, setExpensiveProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Sort newest first
        const sortedByDate = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewArrivals(sortedByDate.slice(0, 4));

        // CHEAP PRODUCTS (below 50k)
        const cheap = data.filter((product) => Number(product.price) < 50000);
        setCheapProducts(cheap.slice(0, 4));

        // EXPENSIVE PRODUCTS (50k and above)
        const expensive = data.filter((product) => Number(product.price) >= 50000);
        setExpensiveProducts(expensive.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="bg-softwhite">

      {/* PAGE HERO */}
      <div className="bg-gray-100 py-24 text-center">
        <h1 className="text-4xl font-luxury tracking-[0.4em]">COLLECTIONS</h1>
        <p className="mt-4 text-gray-500">
          Browse products by New Arrivals, Price, and more
        </p>
      </div>

      {/* NEW ARRIVALS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-luxury tracking-[0.3em] text-center mb-8">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* CHEAP PRODUCTS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-luxury tracking-[0.3em] text-center mb-8">
          CHEAP PRODUCTS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cheapProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* EXPENSIVE PRODUCTS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-luxury tracking-[0.3em] text-center mb-8">
          EXPENSIVE PRODUCTS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {expensiveProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Collections;