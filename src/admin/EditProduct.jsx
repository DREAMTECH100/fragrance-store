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

  // ================= CATEGORY SYSTEM (SAME AS ADDPRODUCT) =================
  const mainCategories = [
    { value: "fragrances", label: "FRAGRANCES" },
    { value: "body-mist", label: "BODY MIST" },
    { value: "mini-perfume", label: "MINI PERFUME" },
    { value: "makeup", label: "MAKEUP" },
    { value: "skincare", label: "SKINCARE" },
    { value: "home-fragrances", label: "HOME FRAGRANCES" },
    { value: "collections", label: "COLLECTIONS" },
    { value: "gifts", label: "GIFTS" },
    { value: "new", label: "NEW ARRIVALS" },
  ];

  const subCategoriesMap = {
    fragrances: [
      { value: "", label: "ALL FRAGRANCES" },
      { value: "mens-perfume", label: "MENS PERFUME" },
      { value: "womens-perfume", label: "WOMENS PERFUME" },
      { value: "all-brands", label: "ALL BRANDS" },
    ],
    skincare: [
      { value: "moisturizers", label: "MOISTURIZERS" },
      { value: "serums", label: "SERUMS" },
      { value: "cleansers", label: "CLEANSERS" },
      { value: "body-oil", label: "BODY OIL" },
      { value: "hair-perfume", label: "HAIR PERFUME" },
      { value: "deodorant-body-sprays", label: "DEODORANT BODY SPRAYS" },
    ],
    makeup: [
      { value: "lips", label: "LIPS" },
      { value: "eyes", label: "EYES" },
      { value: "face", label: "FACE" },
      { value: "cheeks", label: "CHEEKS" },
    ],
    "home-fragrances": [
      { value: "scented-candles", label: "SCENTED CANDLES" },
      { value: "diffusers", label: "DIFFUSERS" },
      { value: "room-sprays", label: "ROOM SPRAYS" },
      { value: "", label: "ALL HOME FRAGRANCES" },
    ],
  };

  const currentSubs = subCategoriesMap[product.category] || [];

  // ================= FETCH =================
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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };

  // ================= SIZE HANDLERS =================
  const handleSizeChange = (index, field, value) => {
    setSizes(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSize = () => setSizes(prev => [...prev, { label: "", price: "" }]);

  const removeSize = (index) =>
    setSizes(prev =>
      prev.length === 1 ? [{ label: "", price: "" }] : prev.filter((_, i) => i !== index)
    );

  // ================= IMAGE UPLOAD (same logic as AddProduct) =================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${baseURL}/api/products/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setProduct(prev => ({
        ...prev,
        image: data.url,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
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
        headers: { "Content-Type": "application/json" },
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

        {/* CATEGORY DROPDOWN */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="">Select Category</option>
          {mainCategories.map(c => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* SUBCATEGORY DROPDOWN */}
        {currentSubs.length > 0 && (
          <select
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Subcategory</option>
            {currentSubs.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}

        <input name="stock" value={product.stock} onChange={handleChange} className="w-full border p-2" placeholder="Stock" />

        {/* SIZES — each size has its own price, and shoppers see the selected size's price */}
        <div className="border p-3 space-y-2">
          <p className="font-semibold">Sizes &amp; prices</p>
          <p className="text-sm text-gray-500">
            If a product has sizes, shoppers see the price of the selected size, not the main
            price above. Leave empty if the product has no sizes.
          </p>
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={s.label}
                onChange={(e) => handleSizeChange(i, "label", e.target.value)}
                className="w-1/2 border p-2"
                placeholder="Size (e.g. 50ml)"
              />
              <input
                value={s.price}
                onChange={(e) => handleSizeChange(i, "price", e.target.value)}
                className="w-1/2 border p-2"
                placeholder="Price"
              />
              <button
                type="button"
                onClick={() => removeSize(i)}
                className="px-3 border text-red-600"
                aria-label="Remove size"
              >
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={addSize} className="text-sm underline">
            + Add size
          </button>
        </div>

        <textarea name="description" value={product.description} onChange={handleChange} className="w-full border p-2" placeholder="Description" />

        {/* IMAGE */}
        <input type="file" onChange={handleFileChange} />
        {product.image && (
          <img src={product.image} className="w-32 h-32 object-cover mt-2" />
        )}

        <button className="bg-green-600 text-white px-6 py-2 mt-4">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;