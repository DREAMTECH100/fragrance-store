import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("Verifying payment...");
  const [order, setOrder] = useState(null);

  // Grab reference from URL query
  const query = new URLSearchParams(location.search);
  const reference = query.get("reference");

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setMessage("No payment reference found.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${baseURL}/api/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.success && data.status === "paid") {
          setStatus("paid");
          setMessage("Payment successful! Thank you for your order.");
          setOrder(data.order);
          localStorage.removeItem("cart"); // Clear cart
        } else if (data.status === "pending") {
          setStatus("pending");
          setMessage("Payment is still pending. Please check again in a few minutes.");
        } else {
          setStatus("failed");
          setMessage("Payment failed or was not completed.");
        }
      } catch (err) {
        console.error("Verify Payment Error:", err);
        setStatus("failed");
        setMessage("Error verifying payment. Try again later.");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-14">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6">
          {status === "paid" && "🎉 Payment Successful"}
          {status === "pending" && "⏳ Payment Pending"}
          {status === "failed" && "❌ Payment Failed"}
        </h1>
        <p className="mb-6 text-gray-700">{message}</p>

        {order && status === "paid" && (
          <div className="text-left bg-gray-50 p-4 rounded-lg border">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-1 border-b last:border-b-0">
                <span>{item.name} x {item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>₦{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;