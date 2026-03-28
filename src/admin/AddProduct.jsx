import { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subCategory: "",
    description: "",
    image: "",
    stock: "",
    sizes: [], // 🔥 ADDED ONLY
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔥 SIZE STATE (ADDED ONLY)
  const [sizes, setSizes] = useState([
    { label: "", price: "" },
  ]);

  // Main categories
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
      { value: "", label: "ALL FRAGRANCES" },
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

  // ================= EXISTING INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };

  // ================= SIZE HANDLERS (ADDED ONLY) =================
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

  // ================= IMAGE =================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

     const res = await fetch(`${baseURL}/api/products/upload`, {
  method: "POST",
  body: formData,
});

      const data = await res.json();
      setProduct((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ================= SUBMIT (SAFE UPGRADE ONLY) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) return alert("Please upload an image");

    const formattedSizes = sizes
      .filter(s => s.label && s.price)
      .map(s => ({
        label: s.label,
        price: Number(s.price),
      }));

    const submitData = {
      ...product,
      sizes: formattedSizes, // 🔥 ONLY ADDITION
    };

    if (!submitData.subCategory) delete submitData.subCategory;

    try {
      const res = await fetch(`${baseURL}/api/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        category: "",
        subCategory: "",
        description: "",
        image: "",
        stock: "",
        sizes: [],
      });

      setSizes([{ label: "", price: "" }]); // reset
      setPreview(null);

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 bg-softwhite min-h-screen">

      <h1 className="text-5xl font-luxury uppercase tracking-superWide text-primary text-center mb-16">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ALL YOUR ORIGINAL INPUTS (UNCHANGED) */}
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

        {/* CATEGORY (UNCHANGED) */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-darktext/30 py-4 px-2 text-xl focus:border-primary outline-none bg-softwhite transition"
        >
          <option value="">Select Main Category</option>
          {mainCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
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
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {uploading && <p className="text-primary">Uploading image...</p>}

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="max-h-64 object-contain mx-auto"
          />
        )}

        {/* STOCK + DESCRIPTION (UNCHANGED) */}
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

        {/* ================= SIZE SECTION (ADDED ONLY) ================= */}
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Product Sizes (Optional)
          </h2>

          {sizes.map((size, index) => (
            <div key={index} className="flex gap-3 mb-3">

              <input
                placeholder="Size (e.g 50ml)"
                value={size.label}
                onChange={(e) =>
                  handleSizeChange(index, "label", e.target.value)
                }
                className="w-1/2 border p-2"
              />

              <input
                placeholder="Price"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                className="w-1/2 border p-2"
              />

              <button
                type="button"
                onClick={() => removeSize(index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSize}
            className="text-blue-600 text-sm mt-2"
          >
            + Add Size
          </button>
        </div>

        {/* SUBMIT (UNCHANGED) */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-primary text-white py-5 text-lg uppercase tracking-widestLux font-sansLux hover:bg-red-700 transition disabled:opacity-50"
        >
          {uploading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;