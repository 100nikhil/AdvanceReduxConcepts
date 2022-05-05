import uiSliceReducer from "./ui-slice";
import cartSliceReducer from "./cart-slice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  //"cart": cartSliceReducer,
  reducer: {
    ui: uiSliceReducer,
    cart: cartSliceReducer
  },
});

export default store;
