import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subCategory: "",
    description: "",
    image: "",
    stock: "",
  });

  const [sizes, setSizes] = useState([{ label: "", price: "" }]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    fetch(`${baseURL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          description: data.description || "",
          image: data.image || "",
          stock: data.stock || "",
        });

        setSizes(data.sizes?.length ? data.sizes : [{ label: "", price: "" }]);

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load product");
      });
  }, [id, baseURL]);

  // ================= BASIC INPUTS =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SIZES (same logic as AddProduct) =================
  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const addSize = () => {
    setSizes([...sizes, { label: "", price: "" }]);
  };

  const removeSize = (index) => {
    const updated = sizes.filter((_, i) => i !== index);
    setSizes(updated);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedSizes = sizes
      .filter(s => s.label && s.price)
      .map(s => ({
        label: s.label,
        price: Number(s.price),
      }));

    const submitData = {
      ...product,
      sizes: formattedSizes,
    };

    try {
      const res = await fetch(`${baseURL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Product updated successfully ✅");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" value={product.name} onChange={handleChange} className="w-full border p-2" placeholder="Name" />

        <input name="price" value={product.price} onChange={handleChange} className="w-full border p-2" placeholder="Price" />

        <input name="category" value={product.category} onChange={handleChange} className="w-full border p-2" placeholder="Category" />

        <input name="subCategory" value={product.subCategory} onChange={handleChange} className="w-full border p-2" placeholder="Sub Category" />

        <input name="stock" value={product.stock} onChange={handleChange} className="w-full border p-2" placeholder="Stock" />

        <textarea name="description" value={product.description} onChange={handleChange} className="w-full border p-2" placeholder="Description" />

        {/* ================= SIZES ================= */}
        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Sizes</h2>

          {sizes.map((size, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                placeholder="Size"
                value={size.label}
                onChange={(e) => handleSizeChange(index, "label", e.target.value)}
                className="w-1/2 border p-2"
              />

              <input
                placeholder="Price"
                value={size.price}
                onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                className="w-1/2 border p-2"
              />

              <button type="button" onClick={() => removeSize(index)}>
                ✕
              </button>
            </div>
          ))}

          <button type="button" onClick={addSize} className="text-blue-600">
            + Add Size
          </button>
        </div>

        <button className="bg-green-600 text-white px-6 py-2 mt-4">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;