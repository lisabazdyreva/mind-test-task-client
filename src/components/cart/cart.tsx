import CartItem from "../cart-item/cart-item.tsx";
import type { Cart } from "../../types/cart-item.ts";

interface ICartProps {
  cartItems: Cart;
}

const Cart = ({ cartItems }: ICartProps) => {
  return (
    <div>
      <h1>Your user cart id {cartItems[0]?.cartId || "none"}</h1>
      <ul>
        <li>Name, price, quantity</li>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    </div>
  );
};

export default Cart;
