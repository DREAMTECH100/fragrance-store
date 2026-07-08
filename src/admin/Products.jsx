import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Pencil, Trash2, Package, Tag, Layers } from "lucide-react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500&display=swap');

  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-dim:   rgba(184,150,90,0.15);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --offwhite:   #faf7f2;
    --warm-grey:  #7a7065;
    --border:     rgba(184,150,90,0.22);
  }

  .pr-wrap { font-family: 'Montserrat', sans-serif; }

  /* ── Page header ── */
  .pr-header {
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .pr-header::after {
    content: '';
    position: absolute; bottom: -1px; left: 0;
    width: 60px; height: 1px;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .pr-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); margin: 0 0 8px; display: block;
  }
  .pr-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 6px; line-height: 1;
  }
  .pr-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.05rem;
    color: var(--warm-grey); letter-spacing: 0.03em; margin: 0;
  }

  /* ── Stat strip ── */
  .pr-stats {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 3px; margin-bottom: 36px;
  }
  @media (min-width: 640px) { .pr-stats { grid-template-columns: repeat(3, 1fr); } }

  .pr-stat {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 22px 20px;
    position: relative; overflow: hidden;
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .pr-stat::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s ease;
  }
  .pr-stat::after {
    content: '';
    position: absolute; bottom: -20px; right: -20px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .pr-stat:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.09); transform: translateY(-3px); }
  .pr-stat:hover::before { transform: scaleX(1); }
  .pr-stat-icon {
    width: 34px; height: 34px;
    border: 1px solid var(--border); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); margin-bottom: 12px;
    background: rgba(184,150,90,0.08);
  }
  .pr-stat-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--warm-grey); margin: 0 0 6px; display: block;
  }
  .pr-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.1rem; font-weight: 400;
    letter-spacing: 0.04em; color: var(--ink); line-height: 1; margin: 0;
  }
  .pr-stat-sub {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin-top: 5px; display: block;
  }

  /* ── Toolbar: search + count ── */
  .pr-toolbar {
    display: flex; align-items: center;
    justify-content: space-between;
    gap: 16px; margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .pr-search-wrap {
    position: relative; flex: 1; max-width: 340px;
  }
  .pr-search-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: rgba(122,112,101,0.5); pointer-events: none;
  }
  .pr-search {
    width: 100%; box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; color: var(--ink);
    background: var(--cream);
    border: 1px solid var(--border);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 11px 14px 11px 38px;
    outline: none;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .pr-search:focus {
    background: #fff;
    border-bottom-color: var(--gold);
  }
  .pr-search::placeholder { color: rgba(122,112,101,0.45); font-size: 11px; }
  .pr-count {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey); white-space: nowrap;
  }

  /* ── Table ── */
  .pr-table-wrap {
    background: var(--cream);
    border: 1px solid var(--border);
    overflow: hidden; overflow-x: auto;
  }
  .pr-table {
    width: 100%; border-collapse: collapse; min-width: 640px;
  }
  .pr-table thead tr {
    background: var(--offwhite);
    border-bottom: 1px solid var(--border);
  }
  .pr-table thead th {
    padding: 13px 18px; text-align: left;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey); font-weight: normal;
  }
  .pr-thead-rule {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.4;
  }
  .pr-table tbody tr {
    border-bottom: 1px solid rgba(184,150,90,0.1);
    transition: background 0.2s;
  }
  .pr-table tbody tr:last-child { border-bottom: none; }
  .pr-table tbody tr:hover { background: var(--offwhite); }
  .pr-table td {
    padding: 14px 18px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; color: var(--ink);
    vertical-align: middle;
  }

  /* Cell types */
  .pr-cell-img {
    width: 44px; height: 44px; flex-shrink: 0;
    background: linear-gradient(145deg, #fdfaf5, #f5ede0);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .pr-cell-img img { max-width: 90%; max-height: 90%; object-fit: contain; }

  .pr-cell-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-weight: 500;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--ink); display: block; margin-bottom: 2px;
  }
  .pr-cell-price {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 13px; color: var(--gold); letter-spacing: 0.04em;
  }
  .pr-cell-cat {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-dim);
    border: 1px solid rgba(184,150,90,0.28);
    padding: 3px 10px;
  }
  .pr-cell-stock {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 12px; letter-spacing: 0.1em; color: var(--ink);
  }
  .pr-cell-stock.low { color: var(--red); }

  /* Action buttons */
  .pr-btn-edit {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    padding: 8px 14px;
    background: var(--gold-dim);
    border: 1px solid rgba(184,150,90,0.3);
    color: var(--gold); cursor: pointer;
    transition: background 0.25s, color 0.25s, border-color 0.25s;
  }
  .pr-btn-edit:hover {
    background: var(--gold); color: #fff; border-color: var(--gold);
  }
  .pr-btn-delete {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    padding: 8px 14px;
    background: rgba(181,43,30,0.07);
    border: 1px solid rgba(181,43,30,0.25);
    color: var(--red); cursor: pointer;
    transition: background 0.25s, color 0.25s;
  }
  .pr-btn-delete:hover { background: var(--red); color: #fff; border-color: var(--red); }

  /* Empty state */
  .pr-empty {
    text-align: center; padding: 56px 24px;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.1rem;
    color: var(--warm-grey);
  }
`;

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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
      await fetch(`${baseURL}/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Error deleting product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(products.map(p => p.category))].length;

  return (
    <>
      <style>{STYLES}</style>
      <div className="pr-wrap">

        {/* ── Header ── */}
        <div className="pr-header">
          <span className="pr-eyebrow">Control Centre</span>
          <h1 className="pr-title">Products</h1>
          <p className="pr-sub">Your full catalogue — search, edit, and manage with ease.</p>
        </div>

        {/* ── Stats ── */}
        <div className="pr-stats">
          <div className="pr-stat">
            <div className="pr-stat-icon"><Package size={15} /></div>
            <span className="pr-stat-label">Total Products</span>
            <p className="pr-stat-val">{products.length}</p>
            <span className="pr-stat-sub">In catalogue</span>
          </div>
          <div className="pr-stat">
            <div className="pr-stat-icon"><Layers size={15} /></div>
            <span className="pr-stat-label">Categories</span>
            <p className="pr-stat-val">{categories}</p>
            <span className="pr-stat-sub">Unique collections</span>
          </div>
          <div className="pr-stat">
            <div className="pr-stat-icon"><Tag size={15} /></div>
            <span className="pr-stat-label">Showing</span>
            <p className="pr-stat-val">{filteredProducts.length}</p>
            <span className="pr-stat-sub">{search ? "Search results" : "All products"}</span>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="pr-toolbar">
          <div className="pr-search-wrap">
            <Search size={13} className="pr-search-icon" />
            <input
              type="text"
              placeholder="Search by name or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-search"
            />
          </div>
          <span className="pr-count">{filteredProducts.length} of {products.length} products</span>
        </div>

        {/* ── Table ── */}
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
              <tr><td colSpan={6} style={{ padding: 0 }}><div className="pr-thead-rule" /></td></tr>
            </thead>

            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id}>

                  {/* Image */}
                  <td>
                    <div className="pr-cell-img">
                      {product.image ? (
                        <img
                          src={product.image.startsWith("http") ? product.image : `${baseURL}${product.image}`}
                          alt={product.name}
                        />
                      ) : (
                        <Package size={18} style={{ color: "var(--warm-grey)", opacity: 0.4 }} />
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td>
                    <span className="pr-cell-name">{product.name}</span>
                  </td>

                  {/* Price */}
                  <td>
                    <span className="pr-cell-price">₦{Number(product.price).toLocaleString()}</span>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="pr-cell-cat">{product.category}</span>
                  </td>

                  {/* Stock */}
                  <td>
                    <span className={`pr-cell-stock${product.stock < 5 ? " low" : ""}`}>
                      {product.stock ?? "—"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        className="pr-btn-edit"
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        className="pr-btn-delete"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 0 }}>
                    <p className="pr-empty">
                      {search ? `No products matching "${search}"` : "No products in catalogue yet."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default Products;
