// src/pages/ProductDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewName, setReviewName] = useState("");

  const baseURL = import.meta.env.VITE_API_URL;

  const WHATSAPP_NUMBER = "2348062392555"; // 🔥 replace with yours

  // ================= FETCH PRODUCT =================
  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 ADD THIS
    fetch(`${baseURL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p._id === id);
        setProduct(found);

        if (found?.sizes?.length > 0) {
          setSelectedSize(found.sizes[0]);
        }

        const filtered = data.filter(
          (p) => p.category === found.category && p._id !== found._id
        );
        setRelated(filtered);
      });
  }, [id]);

  // ================= FETCH REVIEWS =================
  useEffect(() => {
    fetch(`${baseURL}/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => setReviews([]));
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const activePrice = selectedSize?.price || product.price;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize,
      price: activePrice,
    });
    navigate("/cart");
  };

  const submitReview = async () => {
    if (!reviewText || !reviewName) return;

    const res = await fetch(`${baseURL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        name: reviewName,
        comment: reviewText,
      }),
    });

    const data = await res.json();
    setReviews((prev) => [data, ...prev]);

    setReviewText("");
    setReviewName("");
    setShowReviewModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* ================= TOP ================= */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* IMAGE */}
        <img
          src={
            product?.image
              ? product.image.startsWith("http")
                ? product.image
                : `${baseURL}${product.image}`
              : "/images/placeholder.png"
          }
          alt={product.name}
          className="w-full h-[520px] object-cover rounded-lg"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl uppercase">{product.name}</h1>

          {/* PRICE */}
          <p className="text-2xl mt-4 font-semibold">
            ₦{activePrice?.toLocaleString()}
          </p>

          {/* 🆕 PREORDER MESSAGE */}
          {product.isPreorder && (
            <div className="mt-2">
              <p className="text-xs text-red-500 uppercase tracking-wide">
                Pre-order item — confirm availability before purchase
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I want to confirm preorder availability for ${product.name}`}
                target="_blank"
                className="inline-block mt-2 bg-green-600 text-white px-4 py-2 text-sm"
              >
                Chat Admin on WhatsApp
              </a>
            </div>
          )}

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* SIZES */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm mb-2 uppercase">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize?.label === size.label
                        ? "bg-black text-white"
                        : "hover:border-black"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <button onClick={decrease} className="px-3 border">-</button>
            <span>{quantity}</span>
            <button onClick={increase} className="px-3 border">+</button>
          </div>

          {/* 🆕 PREORDER SAFE ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={product.isPreorder}
            className={`mt-6 px-6 py-3 w-full text-white ${
              product.isPreorder
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black"
            }`}
          >
            {product.isPreorder
              ? "Pre-order (Contact Admin)"
              : "Add To Bag"}
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Tap product to explore details
          </p>
        </div>
      </div>

      {/* ================= RELATED ================= */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl mb-6 uppercase">Shop Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* ================= REVIEWS ================= */}
      <div className="mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl uppercase">Customer Reviews</h2>
          <button
            onClick={() => setShowReviewModal(true)}
            className="border px-4 py-2 text-sm"
          >
            Write Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="border p-4">
                <p className="font-semibold">{r.name}</p>
                <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= REVIEW MODAL ================= */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[90%] max-w-md">
            <h3 className="text-lg mb-4">Write a Review</h3>

            <input
              placeholder="Your Name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="w-full border p-2 mb-3"
            />

            <textarea
              placeholder="Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full border p-2 mb-3"
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowReviewModal(false)}>
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="bg-black text-white px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;