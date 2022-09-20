import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const itemExists = state.items.find((item) => item.id === newItem.id);

      if (!itemExists) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          quantity: newItem.quantity,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        itemExists.quantity++;
        itemExists.totalPrice += newItem.price;
      }
      state.totalQuantity++;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalQuantity--;
    },
  },
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const cartUISlice = createSlice({
  name: "cartUI",
  initialState: {
    isShown: true,
  },
  reducers: {
    toggleCartButton(state) {
      state.isShown = !state.isShown;
    },
  }
});
const reduxStore = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUI: cartUISlice.reducer,
    notifications: notificationSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export const notificationActions = notificationSlice.actions;
export const cartUIActions = cartUISlice.actions;
export default reduxStore;

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://cart-project-72d3b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
