import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, requestStatus: null },
  reducers: {
    toggle(state){
      state.cartIsVisible = !state.cartIsVisible;
    },
    changeRequestStatus(state, action){
      state.requestStatus = action.payload;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;