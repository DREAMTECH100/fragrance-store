import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  const [checkoutData, setCheckoutData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const reference = query.get("reference");

    const storedCheckout = JSON.parse(localStorage.getItem("checkout"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCheckoutData(storedCheckout);
    setCartItems(storedCart);

    // 🔐 VERIFY PAYMENT
    if (reference) {
      fetch(`${baseURL}/api/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ reference })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setVerified(true);

            // clear storage AFTER success
            localStorage.removeItem("cart");
            localStorage.removeItem("checkout");
          } else {
            setVerified(false);
          }
        })
        .catch(() => setVerified(false))
        .finally(() => setVerifying(false));
    } else {
      setVerifying(false);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  // ================= LOADING =================
  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg tracking-widest animate-pulse">
          Verifying Payment...
        </p>
      </div>
    );
  }

  // ================= FAILED =================
  if (!verified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl text-red-600 mb-4">Payment Not Verified</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong with your payment. Please contact support.
        </p>

        <button
          onClick={() => navigate("/")}
          className="border px-6 py-3 hover:bg-black hover:text-white transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // ================= SUCCESS =================
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-green-600 mb-4">
            Payment Successful
          </h1>
          <p className="text-gray-600 text-lg">
            Your order has been confirmed and is being processed.
          </p>
        </div>

        {/* CUSTOMER INFO */}
        {checkoutData && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 uppercase tracking-widest">
              Delivery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {checkoutData.fullName}</p>
              <p><strong>Email:</strong> {checkoutData.email}</p>
              <p><strong>Phone:</strong> {checkoutData.phone}</p>
              <p><strong>Address:</strong> {checkoutData.address}, {checkoutData.state}</p>
            </div>
          </div>
        )}

        {/* ORDER SUMMARY */}
        {cartItems.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 uppercase tracking-widest">
              Order Summary
            </h2>

            <div className="border rounded-lg divide-y">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between p-4 text-gray-700">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="flex justify-between p-4 font-bold text-lg bg-gray-50">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3 w-full md:w-auto hover:bg-gray-800 transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate("/fragrances")}
            className="border px-8 py-3 w-full md:w-auto hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;