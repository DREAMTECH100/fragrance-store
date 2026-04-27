import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // ✅ NEW
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [baseURL]);

  const deleteProduct = async (id) => {
    try {
      await fetch(`${baseURL}/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Error deleting product");
    }
  };

  // ✅ FILTERED PRODUCTS (search by name, category)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-luxury text-red-600 mb-6">Products</h1>

      {/* ✅ SEARCH INPUT */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{product.name}</td>
                <td className="p-3">₦{product.price}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3 flex gap-2">

                  {/* EDIT */}
                  <button
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                    className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded shadow hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

            {/* ✅ EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;