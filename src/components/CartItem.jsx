function CartItem({ item }) {
  return (
    <div className="border p-4 flex justify-between">
      <div>
        <h4>{item.name}</h4>
        <p>Qty: {item.quantity}</p>
      </div>

      <div>
        ₦{item.price * item.quantity}
      </div>
    </div>
  );
}

export default CartItem;