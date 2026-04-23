import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import StoreLayout from "./layouts/StoreLayout";
import Home from "./pages/Home";
import Fragrances from "./pages/Fragrances";
import Makeup from "./pages/Makeup";
import EditProduct from "./admin/EditProduct";
import Skincare from "./pages/Skincare";
import Accessories from "./pages/Accessories";
import Collections from "./pages/Collections";
import Gifts from "./pages/Gifts";
import NewArrivals from "./pages/New";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import SalesPopup from "./components/SalesPopup";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Orders from "./admin/Orders";
import Products from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditorialPost from "./pages/EditorialPost";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <Router>
      <div className="pt-0">
        <Routes>
          {/* STORE */}
          <Route element={<StoreLayout wishlist={wishlist} cart={cart} />}>
            <Route path="/" element={<Home />} />

            {/* MAIN + SUBCATEGORY ROUTES */}
            <Route
              path="/fragrances"
              element={<Fragrances addToWishlist={addToWishlist} />}
            />
            <Route
              path="/fragrances/:subcategory"
              element={<Fragrances addToWishlist={addToWishlist} />}
            />

            <Route
              path="/makeup"
              element={<Makeup addToWishlist={addToWishlist} />}
            />
            <Route
              path="/makeup/:subcategory"
              element={<Makeup addToWishlist={addToWishlist} />}
            />

            <Route
              path="/skincare"
              element={<Skincare addToWishlist={addToWishlist} />}
            />
            <Route
              path="/skincare/:subcategory"
              element={<Skincare addToWishlist={addToWishlist} />}
            />

            <Route
              path="/accessories"
              element={<Accessories addToWishlist={addToWishlist} />}
            />
            <Route
              path="/collections"
              element={<Collections addToWishlist={addToWishlist} />}
            />
            <Route
              path="/gifts"
              element={<Gifts addToWishlist={addToWishlist} />}
            />
            <Route
              path="/new"
              element={<NewArrivals addToWishlist={addToWishlist} />}
            />
<Route path="/editorial/:slug" element={<EditorialPost />} />

            <Route path="/about" element={<About />} />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/wishlist"
              element={<Wishlist wishlist={wishlist} />}
            />

            <Route path="/order-success" element={<OrderSuccess />} />
          </Route>

          {/* ADMIN */}
         <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="orders" element={<Orders />} />
  <Route path="products" element={<Products />} />
  <Route path="add-product" element={<AddProduct />} />
  <Route path="edit-product/:id" element={<EditProduct />} />
</Route>
        </Routes>
        <SalesPopup/>
      </div>
    </Router>
  );
}

export default App;