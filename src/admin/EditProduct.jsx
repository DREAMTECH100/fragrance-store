import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch product data
  useEffect(() => {
    fetch(`${baseURL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          stock: data.stock || "",
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load product:", err);
        alert("Error loading product");
      });
  }, [id, baseURL]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseURL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Product updated successfully ✅");
      navigate("/admin/products"); // go back to list
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-3xl font-luxury text-red-600 mb-6">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;