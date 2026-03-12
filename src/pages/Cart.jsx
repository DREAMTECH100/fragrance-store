import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const increaseQty = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decreaseQty = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-luxury mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-6 border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="w-32 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p className="text-red-600 text-lg mt-1">
                  ₦{item.price * item.quantity}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQty(index)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(index)}
                    className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    +
                  </button>
                </div>

                {/* Category Dropdown */}
                <div className="mt-3">
                  <select
                    value={item.category || ""}
                    onChange={(e) => {
                      const updatedCart = [...cartItems];
                      updatedCart[index].category = e.target.value;
                      updateCart(updatedCart);
                    }}
                    className="border p-2 rounded w-full md:w-64"
                  >
                    <option value="">Select category</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => removeItem(index)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-10 text-right text-2xl font-bold">
            Total: ₦{total}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-black text-white px-8 py-3 rounded shadow hover:bg-gray-900 transition"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;