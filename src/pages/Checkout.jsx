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

    // FREE DELIVERY
    if (total >= 1000000) return 0;
    if (lowerState === "lagos" && total >= 300000) return 0;

    const isLagos = lowerState === "lagos";

    const islandAreas = ["lekki", "ajah", "ikoyi", "victoria island", "vi"];
    const mainlandAreas = [
      "ikeja",
      "yaba",
      "surulere",
      "maryland",
      "ogba",
      "alimosho",
      "festac",
      "oshodi"
    ];

    const isIsland = islandAreas.some(area =>
      lowerAddress.includes(area)
    );

    const isMainland = mainlandAreas.some(area =>
      lowerAddress.includes(area)
    );

    let baseByQty = 7000;
    if (quantity === 3) baseByQty = 8500;
    if (quantity >= 4) baseByQty = 9000;

    // OUTSIDE LAGOS
    if (!isLagos) return 7000;

    // ISLAND
    if (isIsland) {
      if (quantity <= 2) return 5000;
      if (quantity === 3) return 5500;
      if (quantity >= 4) return 6000;
    }

    // MAINLAND
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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // save checkout info locally (for reference if needed)
    localStorage.setItem(
      "checkout",
      JSON.stringify(form)
    );

    const response = await fetch(
      "http://localhost:5000/api/payment/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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
      }
    );

    const data = await response.json();

    if (data.status && data.data.authorization_url) {
      window.location.href = data.data.authorization_url;
    }

  } catch (error) {
    console.error("Payment error:", error);
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
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
              <option value="FCT">FCT (Abuja)</option>
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