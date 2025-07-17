// ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrders, getSupplierOrders, addOrder, updateOrderBySupplier, updateOrderByOwner } from '../../api/Orders';

const initialState = {
    supplierOrders: [],
    ownerOrders: [],
    loadingOwner: false,
    loadingSupplier: false,
    errorOwner: null,
    errorSupplier: null,
}


export const fetchOwnerOrders = createAsyncThunk(
    'orders/fetchOwnerOrders',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllOrders();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch admin orders');
        }
    }
);
export const fetchSupplierOrders = createAsyncThunk(
    'orders/fetchSupplierOrders',
    async (_, { rejectWithValue }) => {
        console.log("fetchSupplierOrders");
        try {
            return await getSupplierOrders();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch supplier orders');
        }
    }
);
export const addOwnerOrder = createAsyncThunk(
    'orders/addOwnerOrder',
    async (newOrder, { rejectWithValue }) => {
        try {
            return await addOrder(newOrder);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const confirmOrder = createAsyncThunk(
    'orders/confirmOrder',
    async (id, { rejectWithValue }) => {
        console.log('confirmOrder')
        try {
            const updatedOrder = await updateOrderBySupplier(id);
            return updatedOrder;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const completeOrder = createAsyncThunk(
    'orders/completeOrder',
    async (id, { rejectWithValue }) => {
        console.log('completeOrder')
        try {
            const updatedOrder = await updateOrderByOwner(id);
            return updatedOrder;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.ownerOrders = [];
            state.supplierOrders = [];
        },
        extraReducers: (builder) => {
            builder
                // fetching owner orders
                .addCase(fetchOwnerOrders.pending, (state) => {
                    state.loadingOwner = true;
                    state.errorOwner = null;
                })
                .addCase(fetchOwnerOrders.fulfilled, (state, action) => {
                    state.loadingOwner = false;
                    state.errorOwner = null;
                    state.ownerOrders = action.payload
                })
                .addCase(fetchOwnerOrders.rejected, (state, action) => {
                    state.loadingOwner = false;
                    state.errorOwner = action.error.message;
                })

                // fetching supplier orders
                .addCase(fetchSupplierOrders.pending, (state) => {
                    state.loadingSupplier = true;
                    state.errorSupplier = null;
                })
                .addCase(fetchSupplierOrders.fulfilled, (state, action) => {
                    state.loadingSupplier = false;
                    state.supplierOrders = action.payload;
                })
                .addCase(fetchSupplierOrders.rejected, (state, action) => {
                    state.loadingSupplier = false;
                    state.errorSupplier = action.error.message;
                })
                // adding order
                .addCase(addOwnerOrder.fulfilled, (state, action) => {
                    state.ownerOrders.push(action.payload);
                })
                // confirm order 
                .addCase(confirmOrder.fulfilled, (state, action) => {
                    const updated = action.payload;
                
                    state.supplierOrders = state.supplierOrders.map(order =>
                        order._id === updated._id ? updated : order
                    );
                 
                })
                // complete order
                .addCase(completeOrder.fulfilled, (state, action) => {
                    const updated = action.payload;
                  
                    state.ownerOrders = state.ownerOrders.map(order =>
                        order._id === updated._id ? updated : order
                    );
                   
                });





        },
   } });

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
