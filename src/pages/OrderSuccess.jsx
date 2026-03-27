import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load checkout info and cart from localStorage
    const storedCheckout = JSON.parse(localStorage.getItem("checkout"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCheckoutData(storedCheckout);
    setCartItems(storedCart);

    // Clear cart and checkout info
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout");
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-3xl w-full p-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
          <p className="text-gray-700 text-lg">
            Your payment has been verified successfully. Thank you for shopping with us!
          </p>
        </div>

        {checkoutData && (
          <div className="mb-8">
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
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="border rounded-lg divide-y">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between p-4">
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

        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;