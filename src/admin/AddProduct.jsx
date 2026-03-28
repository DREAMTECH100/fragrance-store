import { useState } from "react";

function AddProduct() {
  // 🔥 CHANGE THIS TO YOUR LIVE DOMAIN
  const baseURL = "https://yourdomain.com";   // ←←← UPDATE THIS

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subCategory: "",
    description: "",
    image: "",
    stock: "",
    sizes: [],
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [sizes, setSizes] = useState([{ label: "", price: "" }]);

  const mainCategories = [
    { value: "fragrances", label: "FRAGRANCES" },
    { value: "makeup", label: "MAKEUP" },
    { value: "skincare", label: "SKINCARE" },
    { value: "accessories", label: "ACCESSORIES" },
    { value: "collections", label: "COLLECTIONS" },
    { value: "gifts", label: "GIFTS" },
    { value: "new", label: "NEW" },
  ];

  const subCategoriesMap = {
    fragrances: [
      { value: "private-blend", label: "PRIVATE BLEND" },
      { value: "signature", label: "SIGNATURE" },
      { value: "soleil", label: "SOLEIL" },
      { value: "runway", label: "RUNWAY" },
    ],
    makeup: [
      { value: "lips", label: "LIPS" },
      { value: "eyes", label: "EYES" },
      { value: "face", label: "FACE" },
      { value: "cheeks", label: "CHEEKS" },
    ],
    skincare: [
      { value: "moisturizers", label: "MOISTURIZERS" },
      { value: "serums", label: "SERUMS" },
      { value: "cleansers", label: "CLEANSERS" },
    ],
  };

  const currentSubs = subCategoriesMap[product.category] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const addSize = () => setSizes([...sizes, { label: "", price: "" }]);

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  // Image Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${baseURL}/api/products/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      if (data.url) {
        setProduct((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Image uploaded but no URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please check your internet and backend.");
    } finally {
      setUploading(false);
    }
  };

  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) return alert("Please upload an image first");

    const formattedSizes = sizes
      .filter(s => s.label && s.price)
      .map(s => ({
        label: s.label.trim(),
        price: Number(s.price),
      }));

    const submitData = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      sizes: formattedSizes,
    };

    if (!submitData.subCategory) delete submitData.subCategory;

    try {
      const res = await fetch(`${baseURL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added successfully!");
        // Reset form
        setProduct({
          name: "", price: "", category: "", subCategory: "", description: "",
          image: "", stock: "", sizes: [],
        });
        setSizes([{ label: "", price: "" }]);
        setPreview(null);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 bg-softwhite min-h-screen">
      <h1 className="text-5xl font-luxury uppercase tracking-superWide text-primary text-center mb-16">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none transition"
        />

        <input
          name="price"
          type="number"
          placeholder="Price (₦)"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none transition"
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none bg-softwhite transition"
        >
          <option value="">Select Main Category</option>
          {mainCategories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {currentSubs.length > 0 && (
          <select
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none bg-softwhite transition"
          >
            <option value="">Select Sub-Category (optional)</option>
            {currentSubs.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full py-4"
        />

        {uploading && <p className="text-primary">Uploading image...</p>}

        {preview && (
          <img src={preview} alt="preview" className="max-h-64 object-contain mx-auto rounded-lg" />
        )}

        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none transition"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          rows={5}
          className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none resize-y transition"
        />

        {/* Size Section */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Product Sizes (Optional)</h2>
          {sizes.map((size, index) => (
            <div key={index} className="flex gap-3 mb-4">
              <input
                placeholder="Size (e.g 50ml)"
                value={size.label}
                onChange={(e) => handleSizeChange(index, "label", e.target.value)}
                className="flex-1 border p-3 rounded"
              />
              <input
                placeholder="Price"
                type="number"
                value={size.price}
                onChange={(e) => handleSizeChange(index, "price", e.target.value)}
                className="flex-1 border p-3 rounded"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="text-red-600 px-4"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="text-primary text-sm mt-2 hover:underline"
          >
            + Add Another Size
          </button>
        </div>

        <button
          type="submit"
          disabled={uploading || !product.image}
          className="w-full bg-primary text-white py-5 text-lg uppercase tracking-widestLux hover:bg-black transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;