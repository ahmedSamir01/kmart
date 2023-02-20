import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FetchData from "server/fetchData";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  () => FetchData("/products")
);
const productsSlice = createSlice({
  initialState: [],
  name: "productsSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productsSlice.reducer;
