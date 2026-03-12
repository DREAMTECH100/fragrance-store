import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function StoreLayout({ wishlist, cart }) {

  return (
    <>
      <Navbar wishlist={wishlist} cart={cart} />
      <Outlet />
      <Footer />
    </>
  );

}

export default StoreLayout;