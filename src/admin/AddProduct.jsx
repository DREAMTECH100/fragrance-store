import { useState } from "react";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);


  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  // Handle file upload
  const handleFileChange = async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    // instant preview from device
    setPreview(URL.createObjectURL(file));

    setUploading(true);

    try {

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://localhost:5000/api/products/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setProduct(prev => ({
        ...prev,
        image: data.url
      }));

    } catch (err) {

      console.error("Upload failed:", err);
      alert("Image upload failed.");

    } finally {

      setUploading(false);

    }

  };


  // Handle form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!product.image) {
      alert("Please upload an image.");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        stock: "",
      });

      setPreview(null);

    } catch (err) {

      console.error(err);
      alert("Error adding product");

    }

  };


  return (

    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-lg">

      <h1 className="text-2xl font-luxury text-red-600 mb-6">
        Add Product
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <input
          className="border border-gray-300 rounded p-2"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="border border-gray-300 rounded p-2"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          className="border border-gray-300 rounded p-2"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />

        {/* Image Upload */}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />

        {uploading && (
          <p className="text-gray-500">Uploading image...</p>
        )}

        {/* Image Preview */}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-40 object-contain rounded border"
          />
        )}

        <input
          className="border border-gray-300 rounded p-2"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />

        <textarea
          className="border border-gray-300 rounded p-2"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>

      </form>

    </div>

  );
}

export default AddProduct;