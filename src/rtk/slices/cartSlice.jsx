import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  initialState: [],
  name: "productsSlice",
  reducers: {
    addProduct: (state, action) => {
      const foundedProduct = state.find((e) => e.id === action.payload.id);
      if (foundedProduct) {
        foundedProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      return state.filter((e) => e.id !== action.payload);
    },
    removeProducts: () => [],
  },
});

export const { addProduct, removeProduct, removeProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
