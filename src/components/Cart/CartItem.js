import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/redux";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;

  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch(cartActions.addToCart({
      id,
      price,
      title,
      quantity,
    }));
  }

  function removeFromCartHandler() {
    dispatch(cartActions.removeFromCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
