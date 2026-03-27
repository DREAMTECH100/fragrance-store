import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: ""
  });

  // ================= LOAD CART =================
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ================= CALCULATIONS =================
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ================= SHIPPING =================
  const calculateShipping = (address, state, total, quantity) => {
    if (!address || !state) return 0;

    const lowerAddress = address.toLowerCase();
    const lowerState = state.toLowerCase();

    if (total >= 1000000) return 0;
    if (lowerState === "lagos" && total >= 300000) return 0;

    const isLagos = lowerState === "lagos";
    const islandAreas = ["lekki", "ajah", "ikoyi", "victoria island", "vi"];
    const mainlandAreas = [
      "ikeja", "yaba", "surulere", "maryland", "ogba", "alimosho", "festac", "oshodi"
    ];

    const isIsland = islandAreas.some(area => lowerAddress.includes(area));
    const isMainland = mainlandAreas.some(area => lowerAddress.includes(area));

    let baseByQty = 7000;
    if (quantity === 3) baseByQty = 8500;
    if (quantity >= 4) baseByQty = 9000;

    if (!isLagos) return 7000;
    if (isIsland) {
      if (quantity <= 2) return 5000;
      if (quantity === 3) return 5500;
      if (quantity >= 4) return 6000;
    }
    if (isMainland) {
      if (quantity <= 2) return 7000;
      if (quantity === 3) return 7500;
      if (quantity >= 4) return 8000;
    }

    return baseByQty;
  };

  const shippingFee = calculateShipping(
    form.address,
    form.state,
    subtotal,
    totalQuantity
  );

  const totalAmount = subtotal + shippingFee;

  // ✅ DELIVERY ZONE
  const getDeliveryZone = () => {
    if (!form.state) return "";

    const lowerAddress = form.address.toLowerCase();
    const islandAreas = ["lekki", "ajah", "ikoyi", "victoria island", "vi"];
    const mainlandAreas = ["ikeja", "yaba", "surulere", "maryland"];

    if (form.state.toLowerCase() !== "lagos") return "Outside Lagos";
    if (islandAreas.some(a => lowerAddress.includes(a))) return "Lagos Island";
    if (mainlandAreas.some(a => lowerAddress.includes(a))) return "Lagos Mainland";
    return "Lagos (Unspecified)";
  };

  const deliveryZone = getDeliveryZone();

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // save checkout info locally
      localStorage.setItem("checkout", JSON.stringify(form));

      const baseURL = import.meta.env.VITE_API_URL;

      // Initialize payment via backend
      const response = await fetch(`${baseURL}/api/payment/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          state: form.state,
          items: cartItems.map(item => ({
            ...item,
            size: item.selectedSize?.label || item.size || null
          })),
          subtotal,
          shippingFee,
          totalAmount
        })
      });

      const data = await response.json();

      if (data.status && data.data.authorization_url) {
        // Use Paystack inline popup
        const handler = window.PaystackPop.setup({
          key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
          email: form.email,
          amount: totalAmount * 100, // in kobo
          ref: `PS-${Date.now()}`,
          callback: function (response) {
            // After successful payment, your webhook will handle verification
            // Redirect user to success page
            navigate("/ordersuccess");
          },
          onClose: function () {
            alert("Payment was not completed.");
          }
        });

        handler.openIframe();
      } else {
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-6 py-14">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* FORM */}
        <div className="bg-white p-8 shadow-xl rounded-xl">
          <h1 className="text-4xl font-luxury mb-10 uppercase tracking-widest">
            Secure Checkout
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input name="fullName" placeholder="Full Name" required onChange={handleChange} className="w-full border-b py-3" />
            <input name="email" placeholder="Email" required onChange={handleChange} className="w-full border-b py-3" />
            <input name="phone" placeholder="Phone" required onChange={handleChange} className="w-full border-b py-3" />
            <input name="address" placeholder="Address" required onChange={handleChange} className="w-full border-b py-3" />

            <select name="state" required onChange={handleChange} className="w-full border-b py-3">
              <option value="">Select State</option>
              {["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
               "Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina",
               "Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau",
               "Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT"].map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <button className="w-full bg-black text-white py-4">
              Proceed to Payment
            </button>

          </form>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-8 shadow-xl rounded-xl">
          <h2 className="text-2xl mb-6">Order Summary</h2>

          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <div className="mt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₦{shippingFee.toLocaleString()}</span>
            </div>

            <div className="flex justify-between font-bold text-xl border-t pt-3">
              <span>Total</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;