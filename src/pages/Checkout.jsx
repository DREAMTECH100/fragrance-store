import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    fullName: "",   // changed from name → fullName
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

 const handleSubmit = async (e) => {

  e.preventDefault();

  localStorage.setItem("checkout", JSON.stringify(form));

  try {

    const response = await fetch("http://localhost:5000/api/payment/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: form.email,
        amount: total
      })
    });

    const data = await response.json();

    if (data.status) {
      window.location.href = data.data.authorization_url;
    }

  } catch (error) {
    console.error(error);
  }
};

  return (

    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="fullName"   // changed from name → fullName
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          required
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <div className="text-xl font-bold mt-6">
          Total: ₦{total}
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded w-full"
        >
          Pay Now
        </button>

      </form>

    </div>

  );
}

export default Checkout;