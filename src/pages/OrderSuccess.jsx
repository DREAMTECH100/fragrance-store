import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function OrderSuccess() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkout = JSON.parse(localStorage.getItem("checkout"));

    const total = cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    // Send order to backend
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: checkout.fullName || checkout.name,
        email: checkout.email,
        phone: checkout.phone,
        address: checkout.address,
        cartItems: cart,
        totalAmount: total,
        paymentRef: reference,
      }),
    });

    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 animate-fade-in">
      <div className="bg-white p-12 rounded-xl shadow-xl text-center max-w-xl">
        <h1 className="text-5xl font-bold text-green-600 mb-4 animate-bounce">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-2">Next Steps:</h2>
          <ul className="list-disc list-inside text-left text-gray-700">
            <li>Check your email for the receipt.</li>
            <li>Track your order in your account dashboard.</li>
            <li>Thank you for shopping with us!</li>
          </ul>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 bg-black text-white px-8 py-3 rounded hover:bg-gray-900 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;