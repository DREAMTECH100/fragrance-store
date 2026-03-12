import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {

        const found = data.find(p => p._id === id);
        setProduct(found);

      });

  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;


  const increase = () => {
    setQuantity(prev => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };


  const handleAddToCart = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/cart");

  };


  return (

    <div className="p-10 grid md:grid-cols-2 gap-12">

      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="w-full h-[500px] object-cover rounded-lg"
      />

      <div>

        <h1 className="text-4xl font-bold">{product.name}</h1>

        <p className="text-2xl text-red-600 mt-4">
          ₦{product.price}
        </p>

        <p className="mt-6 text-gray-600">
          {product.description}
        </p>


        {/* Quantity Selector */}

        <div className="flex items-center gap-4 mt-6">

          <button
            onClick={decrease}
            className="px-4 py-2 bg-gray-200 text-xl"
          >
            -
          </button>

          <span className="text-lg font-medium">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="px-4 py-2 bg-orange-400 text-white text-xl"
          >
            +
          </button>

        </div>


        <button
          onClick={handleAddToCart}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
        >
          Add To Cart
        </button>

      </div>

    </div>

  );
}

export default ProductDetails;