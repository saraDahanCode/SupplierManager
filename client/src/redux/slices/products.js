import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { addProduct, getProducts } from "../../api/Products";
const initialState = {
  products: [],
  loadingProducts: false,
  error: null
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch owber products');
    }
  }
);

export const addProductBySupplier = createAsyncThunk(
  'products/addProductBySupplier',
  async (formData , { rejectWithValue }) => {
    console.log('addProductBySupplier',formData)
    try {
      return await addProduct(formData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.error.message;
        state.products=[];
      })

      .addCase(addProductBySupplier.fulfilled, (state, action) => {
          state.products.push(...action.payload);

      });
  }});

 export default productsSlice.reducer;
