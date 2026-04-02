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

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    fetch(`${baseURL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p._id === id);
        setProduct(found);

        if (found?.sizes?.length > 0) {
          setSelectedSize(found.sizes[0]);
        }

        // related products
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
  src={product?.image ? (product.image.startsWith("http") ? product.image : `${baseURL}${product.image}`) : "/images/placeholder.png"}
  alt={product.name}
  className="w-full h-[520px] object-cover rounded-lg"
/>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl uppercase">{product.name}</h1>
          <p className="text-2xl mt-4 font-semibold">
            ₦{activePrice?.toLocaleString()}
          </p>
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
            <button onClick={decrease} className="px-3 border">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={increase} className="px-3 border">
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white px-6 py-3 w-full"
          >
            Add To Bag
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
    <h2 className="text-2xl uppercase tracking-wider">Customer Reviews</h2>
    <button
      onClick={() => setShowReviewModal(true)}
      className="border px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition"
    >
      Write Review
    </button>
  </div>

  {reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet.</p>
  ) : (
    <div className="space-y-6">
      {reviews.map((r, i) => (
        <div
          key={i}
          className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition"
        >
          <p className="font-semibold">{r.name}</p>

          {/* ⭐ STAR RATING */}
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${
                  r.rating >= star ? "text-red-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.037 9.384c-.784-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>

          <p className="text-gray-600 text-sm mt-2">{r.comment}</p>
        </div>
      ))}
    </div>
  )}
</div>

{/* ================= REVIEW MODAL ================= */}
{showReviewModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 w-[90%] max-w-md rounded-lg shadow-lg">
      <h3 className="text-lg mb-4 font-semibold">Write a Review</h3>

      <input
        placeholder="Your Name"
        value={reviewName}
        onChange={(e) => setReviewName(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <textarea
        placeholder="Your Review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      {/* ⭐ SELECT RATING */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setReviewRating(star)}
            className={`w-8 h-8 flex items-center justify-center ${
              reviewRating >= star ? "text-red-500" : "text-gray-300"
            } transition`}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-5 h-5"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.037 9.384c-.784-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z" />
            </svg>
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowReviewModal(false)}
          className="px-3 py-1 rounded border hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={submitReview}
          className="bg-black text-white px-4 py-2 rounded hover:bg-red-500 transition"
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