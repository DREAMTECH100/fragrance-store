import { useEffect, useState } from "react";

function OrderSuccess() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState(null);

  // Get reference from URL
  const params = new URLSearchParams(window.location.search);
  const reference = params.get("reference");

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference })
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          setOrder(data.order);
        } else {
          setSuccess(false);
        }
      } catch (err) {
        console.error("Verification error:", err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-12 rounded-xl shadow-xl text-center max-w-xl">
        {success ? (
          <>
            <h1 className="text-5xl font-bold text-green-600 mb-4">
              ✅ Payment Successful!
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Your payment has been verified. Thank you for your order!
            </p>
            <p className="text-gray-600 text-sm">
              Order Ref: {order?.paymentRef}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-red-600 mb-4">
              ❌ Payment Failed
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              We couldn’t verify your payment. Please contact support.
            </p>
          </>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 bg-black text-white px-8 py-3 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;