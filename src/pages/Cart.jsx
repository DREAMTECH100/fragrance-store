import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="px-6 md:px-12 py-16 max-w-6xl mx-auto">

      {/* HEADER */}
      <h1 className="text-4xl md:text-5xl font-luxury text-center mb-12 tracking-wide">
        Your Bag
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">Your Bag is empty</p>

          <button
            onClick={() => navigate("/fragrances")}
            className="border px-8 py-3 tracking-widest hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-10">

          {cart.map((item, index) => {
            const sizeKey = item.selectedSize?.label || "default";

            return (
              <div
                key={`${item._id}-${sizeKey}`}
                className="flex flex-col md:flex-row gap-6 border-b pb-8 group"
              >

                {/* IMAGE */}
                <div className="relative w-full md:w-40 h-40 overflow-hidden">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>

                    {/* NAME */}
                    <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide">
                      {item.name}
                    </h2>

                    {/* SIZE (🔥 NEW BUT SAFE) */}
                    {item.selectedSize && (
                      <p className="text-sm text-gray-500 mt-1 tracking-widest">
                        Size: {item.selectedSize.label}
                      </p>
                    )}

                    {/* UNIT PRICE */}
                    <p className="text-sm text-gray-400 mt-2">
                      ₦{Number(item.price).toLocaleString()} each
                    </p>

                    {/* TOTAL PRICE */}
                    <p className="text-lg text-red-600 font-semibold mt-2">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>

                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4 mt-4">

                    <button
                      onClick={() => decreaseQty(item._id, sizeKey)}
                      className="w-10 h-10 border flex items-center justify-center hover:bg-black hover:text-white transition"
                    >
                      −
                    </button>

                    <span className="text-lg font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id, sizeKey)}
                      className="w-10 h-10 border flex items-center justify-center hover:bg-black hover:text-white transition"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* REMOVE */}
                <div className="flex items-center">
                  <button
                    onClick={() => removeFromCart(item._id, sizeKey)}
                    className="text-sm tracking-widest text-red-500 hover:text-red-700 transition"
                  >
                    REMOVE
                  </button>
                </div>

              </div>
            );
          })}

          {/* TOTAL SECTION */}
          <div className="pt-10 border-t">

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg tracking-widest">Subtotal</span>
              <span className="text-2xl font-semibold">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>

            {/* CTA */}
            <div className="flex flex-col md:flex-row gap-4">

              <button
                onClick={() => navigate("/fragrances")}
                className="border px-8 py-4 w-full tracking-widest hover:bg-black hover:text-white transition"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-black text-white px-8 py-4 w-full tracking-widest hover:bg-red-700 transition"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;