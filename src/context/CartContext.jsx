import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // =========================
  // CART STATE (UNCHANGED)
  // =========================
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // 🔥 WISHLIST STATE (NEW)
  // =========================
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // =========================
  // ADD TO CART (UNCHANGED)
  // =========================
  const addToCart = (product) => {

    const sizeKey = product?.selectedSize?.label || "default";

    const existingIndex = cart.findIndex(
      item =>
        item._id === product._id &&
        (item.selectedSize?.label || "default") === sizeKey
    );

    if (existingIndex !== -1) {

      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += product.quantity || 1;
      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: product.quantity || 1,
          sizeKey,
        }
      ]);

    }
  };

  // =========================
  // 🔥 WISHLIST FUNCTIONS (NEW)
  // =========================
  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item._id === product._id);
    if (exists) return;

    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeFromCart = (id, sizeKey) => {
    setCart(
      cart.filter(item =>
        !(item._id === id &&
          (item.selectedSize?.label || "default") === sizeKey)
      )
    );
  };

  // =========================
  // INCREASE QTY
  // =========================
  const increaseQty = (id, sizeKey) => {
    setCart(
      cart.map(item =>
        item._id === id &&
        (item.selectedSize?.label || "default") === sizeKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // =========================
  // DECREASE QTY
  // =========================
  const decreaseQty = (id, sizeKey) => {
    setCart(
      cart.map(item =>
        item._id === id &&
        (item.selectedSize?.label || "default") === sizeKey &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // =========================
  // TOTAL
  // =========================
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      getCartTotal,

      // 🔥 EXPORT WISHLIST
      wishlist,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);