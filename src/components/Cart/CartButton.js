import classes from "./CartButton.module.css";
import { cartUIActions } from "../../redux/redux";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  function toggleButtonHandler() {
    dispatch(cartUIActions.toggleCartButton());
  }

  return (
    <button className={classes.button} onClick={toggleButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
