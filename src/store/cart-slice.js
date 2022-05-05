import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, changed: false},
  reducers: {
    replaceCart(state, action){
      //We put || condition cause when there is nothing in backend it will return undefined.
      //which inturn will make our state as undefined.
      state.items = action.payload.items||[];
      state.totalQuantity = action.payload.totalQuantity||0;
    },
    addItemToCart(state, action){
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id===newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if(!existingItem){
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      }
      else{
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action){
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id===id);
      state.totalQuantity--;
      state.changed = true;
      if(existingItem.quantity === 1){
        state.items = state.items.filter((item) => item.id !== id);
      }
      else{
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    }
  }
});

//below is an action creator
export const fetchRequest = () => {
  return (dispatch) => {
    const fetchData = async () => {
      const res = await fetch("https://react-backend-api-default-rtdb.firebaseio.com/cart.json");
      if(!res.ok){
        throw new Error("Something went wrong while fetching data!");
      }
      const data = await res.json();
      dispatch(cartActions.replaceCart(data));
      return data;
    }

    try{
      fetchData();
    }
    catch(err){
      console.log(err);
    }
  }
}

//below is an action-creator
export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {

      dispatch(uiActions.changeRequestStatus("Pending..."));

      const res = await fetch("https://react-backend-api-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if(!res.ok){
        throw new Error("Some error occured!");
      }

      console.log("The request is sent successfully!");
      dispatch(uiActions.changeRequestStatus("Success..."));
    };

    try{
      await sendRequest();
    }
    catch(err){
      console.log(err);
      dispatch(uiActions.changeRequestStatus("Error..."));
    }

  }
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;