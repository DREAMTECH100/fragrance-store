import { useState } from "react";
import { Plus, X, Upload, ImageIcon, Tag } from "lucide-react";
 
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
 
  .ap-wrap {
    font-family: 'Montserrat', sans-serif;
  }
 
  /* ── Page header ── */
  .ap-header {
    margin-bottom: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .ap-header::after {
    content: '';
    position: absolute; bottom: -1px; left: 0;
    width: 60px; height: 1px;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .ap-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); margin: 0 0 8px; display: block;
  }
  .ap-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink); margin: 0; line-height: 1;
  }
 
  /* ── Form grid ── */
  .ap-form { display: flex; flex-direction: column; gap: 0; }
 
  /* Section block */
  .ap-section {
    background: var(--cream);
    border: 1px solid var(--border);
    margin-bottom: 3px;
    overflow: hidden;
  }
  .ap-section-head {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 20px;
    background: var(--offwhite);
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .ap-section-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .ap-section-num {
    width: 20px; height: 20px;
    border: 1px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; color: var(--gold);
  }
  .ap-section-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .ap-section-body { padding: 24px 20px; }
 
  /* ── Field ── */
  .ap-field { margin-bottom: 20px; }
  .ap-field:last-child { margin-bottom: 0; }
  .ap-label {
    display: block; margin-bottom: 7px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .ap-input {
    width: 100%; box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 12px 14px;
    outline: none;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .ap-input:focus {
    background: #fff;
    border-bottom-color: var(--gold);
  }
  .ap-input::placeholder { color: rgba(122,112,101,0.4); font-size: 12px; }
 
  .ap-select {
    width: 100%; box-sizing: border-box; appearance: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 12px 36px 12px 14px;
    outline: none; cursor: pointer;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .ap-select:focus {
    background: #fff;
    border-bottom-color: var(--gold);
  }
  .ap-select-wrap { position: relative; }
  .ap-select-icon {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: var(--warm-grey);
  }
 
  .ap-textarea {
    width: 100%; box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 12px 14px;
    outline: none; resize: vertical; min-height: 100px;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .ap-textarea:focus {
    background: #fff;
    border-bottom-color: var(--gold);
  }
  .ap-textarea::placeholder { color: rgba(122,112,101,0.4); font-size: 12px; }
 
  .ap-grid-2 {
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  }
  @media (max-width: 560px) { .ap-grid-2 { grid-template-columns: 1fr; } }
 
  /* ── Image upload ── */
  .ap-upload-zone {
    border: 1.5px dashed rgba(184,150,90,0.4);
    background: var(--offwhite);
    padding: 36px 20px;
    text-align: center; cursor: pointer;
    transition: border-color 0.25s, background 0.25s;
    position: relative;
  }
  .ap-upload-zone:hover {
    border-color: var(--gold);
    background: rgba(184,150,90,0.05);
  }
  .ap-upload-zone input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }
  .ap-upload-icon {
    width: 44px; height: 44px; margin: 0 auto 12px;
    border: 1px solid var(--border); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); background: rgba(184,150,90,0.08);
  }
  .ap-upload-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--warm-grey); display: block; margin-bottom: 4px;
  }
  .ap-upload-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; color: rgba(122,112,101,0.5); font-style: italic;
  }
  .ap-uploading {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold); margin-top: 10px; display: block;
  }
  .ap-preview {
    margin-top: 16px;
    border: 1px solid var(--border);
    background: linear-gradient(145deg, #fdfaf5, #f5ede0);
    padding: 12px;
    display: flex; align-items: center; justify-content: center;
  }
  .ap-preview img { max-height: 200px; max-width: 100%; object-fit: contain; }
 
  /* ── Preorder toggle ── */
  .ap-toggle-wrap {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 20px;
    border: 1px solid var(--border);
    background: var(--cream);
    cursor: pointer;
    transition: background 0.2s;
  }
  .ap-toggle-wrap:hover { background: var(--offwhite); }
  .ap-toggle-box {
    width: 18px; height: 18px; flex-shrink: 0;
    border: 1px solid rgba(184,150,90,0.4);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s;
  }
  .ap-toggle-box.checked {
    background: var(--red); border-color: var(--red);
  }
  .ap-toggle-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey);
  }
 
  /* ── Size rows ── */
  .ap-size-row {
    display: grid; grid-template-columns: 1fr 1fr 32px;
    gap: 10px; margin-bottom: 10px; align-items: center;
  }
  .ap-size-row:last-child { margin-bottom: 0; }
  .ap-remove-btn {
    width: 32px; height: 32px;
    background: none; border: 1px solid rgba(184,150,90,0.25);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--warm-grey);
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .ap-remove-btn:hover { background: var(--red); border-color: var(--red); color: #fff; }
 
  .ap-add-size-btn {
    display: flex; align-items: center; gap: 7px;
    margin-top: 14px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); background: none; border: 1px solid var(--border);
    padding: 9px 16px; cursor: pointer;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
  }
  .ap-add-size-btn:hover {
    border-color: var(--gold);
    background: var(--gold-dim);
  }
 
  /* ── Submit ── */
  .ap-submit {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 16px 0; margin-top: 3px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    background: var(--ink); color: #fdfaf5;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.35s ease;
  }
  .ap-submit::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: linear-gradient(135deg, var(--red), var(--red-deep));
    transition: top 0.42s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .ap-submit:hover::before { top: 0; }
  .ap-submit:hover { color: #fff; }
  .ap-submit > * { position: relative; z-index: 1; }
`;
 
function AddProduct() {
  const [product, setProduct] = useState({
    name: "", price: "", category: "", subCategory: "",
    description: "", image: "", stock: "", sizes: [], isPreorder: false,
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sizes, setSizes] = useState([{ label: "", price: "" }]);
 
  const baseURL = import.meta.env.VITE_API_URL;
 
  const mainCategories = [
    { value: "fragrances",      label: "Fragrances" },
    { value: "body-mist",       label: "Body Mist" },
    { value: "mini-perfume",    label: "Mini Perfume" },
    { value: "makeup",          label: "Makeup" },
    { value: "skincare",        label: "Skincare" },
    { value: "home-fragrances", label: "Home Fragrances" },
    { value: "collections",     label: "Collections" },
    { value: "gifts",           label: "Gifts" },
    { value: "new",             label: "New Arrivals" },
  ];
 
  const subCategoriesMap = {
    fragrances: [
      { value: "", label: "All Fragrances" },
      { value: "mens-perfume", label: "Mens Perfume" },
      { value: "womens-perfume", label: "Womens Perfume" },
      { value: "all-brands", label: "All Brands" },
    ],
    "home-fragrances": [
      { value: "scented-candles", label: "Scented Candles" },
      { value: "diffusers", label: "Diffusers" },
      { value: "room-sprays", label: "Room Sprays" },
      { value: "", label: "All Home Fragrances" },
    ],
    makeup: [
      { value: "lips", label: "Lips" },
      { value: "eyes", label: "Eyes" },
      { value: "face", label: "Face" },
      { value: "cheeks", label: "Cheeks" },
    ],
    skincare: [
      { value: "moisturizers", label: "Moisturizers" },
      { value: "serums", label: "Serums" },
      { value: "cleansers", label: "Cleansers" },
      { value: "body-oil", label: "Body Oil" },
      { value: "hair-perfume", label: "Hair Perfume" },
      { value: "deodorant-body-sprays", label: "Deodorant Body Sprays" },
    ],
  };
 
  const currentSubs = subCategoriesMap[product.category] || [];
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev, [name]: value,
      ...(name === "category" ? { subCategory: "" } : {}),
    }));
  };
 
  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes]; updated[index][field] = value; setSizes(updated);
  };
  const addSize = () => setSizes([...sizes, { label: "", price: "" }]);
  const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));
 
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setPreview(URL.createObjectURL(file)); setUploading(true);
    try {
      const formData = new FormData(); formData.append("image", file);
      const res = await fetch(`${baseURL}/api/products/upload`, { method: "POST", body: formData });
      const data = await res.json();
      setProduct(prev => ({ ...prev, image: data.url }));
    } catch { alert("Image upload failed"); }
    finally { setUploading(false); }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) return alert("Please upload an image");
    const formattedSizes = sizes.filter(s => s.label && s.price).map(s => ({ label: s.label, price: Number(s.price) }));
    const submitData = {
      ...product,
      category: product.category?.toLowerCase().trim(),
      subCategory: product.subCategory ? product.subCategory.toLowerCase().trim() : undefined,
      sizes: formattedSizes,
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
      setProduct({ name: "", price: "", category: "", subCategory: "", description: "", image: "", stock: "", sizes: [], isPreorder: false });
      setSizes([{ label: "", price: "" }]);
      setPreview(null);
    } catch { alert("Error adding product"); }
  };
 
  return (
    <>
      <style>{STYLES}</style>
      <div className="ap-wrap">
 
        {/* Header */}
        <div className="ap-header">
          <span className="ap-eyebrow">Catalogue Management</span>
          <h1 className="ap-title">Add New Product</h1>
        </div>
 
        <form onSubmit={handleSubmit} className="ap-form">
 
          {/* ── 1. Basic Info ── */}
          <div className="ap-section">
            <div className="ap-section-head">
              <span className="ap-section-num">1</span>
              <span className="ap-section-label">Product Information</span>
            </div>
            <div className="ap-section-body">
              <div className="ap-field">
                <label className="ap-label">Product Name</label>
                <input name="name" required value={product.name} onChange={handleChange}
                  className="ap-input" placeholder="e.g. Chanel No. 5 Eau de Parfum" />
              </div>
              <div className="ap-grid-2">
                <div className="ap-field">
                  <label className="ap-label">Price (₦)</label>
                  <input name="price" type="number" required value={product.price} onChange={handleChange}
                    className="ap-input" placeholder="e.g. 45000" />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Stock Quantity</label>
                  <input name="stock" type="number" value={product.stock} onChange={handleChange}
                    className="ap-input" placeholder="e.g. 20" />
                </div>
              </div>
              <div className="ap-field">
                <label className="ap-label">Description</label>
                <textarea name="description" value={product.description} onChange={handleChange}
                  className="ap-textarea" placeholder="Describe the product — notes, longevity, occasion…" />
              </div>
            </div>
          </div>
 
          {/* ── 2. Category ── */}
          <div className="ap-section">
            <div className="ap-section-head">
              <span className="ap-section-num">2</span>
              <span className="ap-section-label">Category</span>
            </div>
            <div className="ap-section-body">
              <div className="ap-field">
                <label className="ap-label">Main Category</label>
                <div className="ap-select-wrap">
                  <select name="category" value={product.category} onChange={handleChange} className="ap-select">
                    <option value="">Select category</option>
                    {mainCategories.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <svg className="ap-select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
 
              {currentSubs.length > 0 && (
                <div className="ap-field">
                  <label className="ap-label">Sub-Category</label>
                  <div className="ap-select-wrap">
                    <select name="subCategory" value={product.subCategory} onChange={handleChange} className="ap-select">
                      <option value="">Select sub-category</option>
                      {currentSubs.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <svg className="ap-select-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
 
          {/* ── 3. Image ── */}
          <div className="ap-section">
            <div className="ap-section-head">
              <span className="ap-section-num">3</span>
              <span className="ap-section-label">Product Image</span>
            </div>
            <div className="ap-section-body">
              <div className="ap-upload-zone">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <div className="ap-upload-icon">
                  {preview ? <ImageIcon size={18} /> : <Upload size={18} />}
                </div>
                <span className="ap-upload-label">
                  {preview ? "Change Image" : "Upload Image"}
                </span>
                <span className="ap-upload-sub">Click to browse · JPG, PNG, WEBP</span>
              </div>
              {uploading && <span className="ap-uploading">Uploading…</span>}
              {preview && (
                <div className="ap-preview">
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>
          </div>
 
          {/* ── 4. Sizes ── */}
          <div className="ap-section">
            <div className="ap-section-head">
              <span className="ap-section-num">4</span>
              <span className="ap-section-label">Size Variants (optional)</span>
            </div>
            <div className="ap-section-body">
              {sizes.map((size, index) => (
                <div key={index} className="ap-size-row">
                  <input placeholder="Label (e.g. 50ml)" value={size.label}
                    onChange={e => handleSizeChange(index, "label", e.target.value)}
                    className="ap-input" />
                  <input placeholder="Price (₦)" value={size.price}
                    onChange={e => handleSizeChange(index, "price", e.target.value)}
                    className="ap-input" />
                  <button type="button" className="ap-remove-btn" onClick={() => removeSize(index)}>
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button type="button" className="ap-add-size-btn" onClick={addSize}>
                <Plus size={11} /> Add Size
              </button>
            </div>
          </div>
 
          {/* ── 5. Preorder toggle ── */}
          <label className="ap-toggle-wrap">
            <input type="checkbox" style={{ display: "none" }}
              checked={product.isPreorder}
              onChange={e => setProduct(prev => ({ ...prev, isPreorder: e.target.checked }))}
            />
            <span className={`ap-toggle-box${product.isPreorder ? " checked" : ""}`}>
              {product.isPreorder && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="ap-toggle-label">
              {product.isPreorder ? "Marked as Pre-order" : "Mark as Pre-order Product"}
            </span>
            {product.isPreorder && (
              <span style={{
                marginLeft: "auto", fontFamily: "'Tenor Sans', sans-serif",
                fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "3px 10px", border: "1px solid rgba(181,43,30,0.3)",
                color: "var(--red)", background: "rgba(181,43,30,0.07)"
              }}>Pre-order</span>
            )}
          </label>
 
          {/* ── Submit ── */}
          <button type="submit" className="ap-submit">
            <Tag size={13} />
            <span>Add Product to Catalogue</span>
          </button>
 
        </form>
      </div>
    </>
  );
}
 
export default AddProduct;