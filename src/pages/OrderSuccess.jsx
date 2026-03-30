import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("pending"); // pending | paid | failed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCheckout = JSON.parse(localStorage.getItem("checkout"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCheckoutData(storedCheckout);
    setCartItems(storedCart);

    // clear cart and checkout
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout");

    // check Paystack reference from query string
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");

    if (reference) {
      verifyPayment(reference);
    } else {
      setStatus("failed");
      setLoading(false);
    }
  }, []);

  const verifyPayment = async (reference) => {
    try {
      const baseURL = import.meta.env.VITE_API_URL; // must be your deployed Render API
      const res = await fetch(`${baseURL}/api/payment/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStatus("paid");
        } else {
          setStatus("failed");
        }
      } else if (res.status === 404) {
        // route not found — fallback to pending
        setStatus("pending");
      } else {
        setStatus("failed");
      }
    } catch (err) {
      console.error("Verify payment error:", err);
      setStatus("pending"); // show pending if server cannot be reached
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-3xl w-full p-10 text-center">
        {loading ? (
          <div className="text-gray-700 text-lg">Verifying your payment...</div>
        ) : status === "paid" ? (
          <>
            <h1 className="text-5xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
            <p className="text-gray-700 text-lg mb-8">
              Your payment has been verified successfully. Thank you for shopping with us!
            </p>
          </>
        ) : status === "pending" ? (
          <>
            <h1 className="text-4xl font-bold text-yellow-600 mb-4">⏳ Payment Pending</h1>
            <p className="text-gray-700 text-lg mb-8">
              Your payment is being processed. It may take a few minutes. You will receive a confirmation soon.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Payment Not Verified</h1>
            <p className="text-gray-700 text-lg mb-8">
              Something went wrong with your payment. Please contact support.
            </p>
          </>
        )}

        {checkoutData && (
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
            <div className="space-y-1 text-gray-800">
              <p><strong>Name:</strong> {checkoutData.fullName}</p>
              <p><strong>Email:</strong> {checkoutData.email}</p>
              <p><strong>Phone:</strong> {checkoutData.phone}</p>
              <p><strong>Address:</strong> {checkoutData.address}, {checkoutData.state}</p>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mb-8 text-left">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="border rounded-lg divide-y">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between p-4">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between p-4 font-bold text-lg bg-gray-50">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;