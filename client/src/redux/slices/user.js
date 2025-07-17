

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supplierSignin, register } from '../../api/Suppliers.js';
import { ownerSignin } from '../../api/Owner.js';

const initialState = {
  userDetails: {
    role: '',
    email: '',
    companyName: '',
    phone: '',
    address: '',
    contactPerson: '',
    // עבור מנהל
    name: ''
  },
  loggedIn: false,
};


export const supplierRegister = createAsyncThunk(
  'user/supplierRegister',
  async (supplierDetails, { rejectWithValue }) => {
    console.log('supplierRegister')

    try {
      return await register(supplierDetails);

    } catch (err) {
      // מחזיר שגיאה עם מידע מותאם
      return rejectWithValue(err.message || 'Error saving supplier details');
    }
  }
);

export const supplierLogin = createAsyncThunk(
  'user/supplierLogin',
  async (supplierDetails, { rejectWithValue }) => {
    console.log('supplierLogin')
    try {
      return await supplierSignin(supplierDetails);

    } catch (err) {
      return rejectWithValue(err.message || 'Error logging in supplier');
    }
  }
);
export const ownerLogin = createAsyncThunk(
  'user/ownerLogin',
  async (ownerDetails, { rejectWithValue }) => {
    console.log('ownerLogin', ownerDetails)
    try {
      const data = await ownerSignin(ownerDetails);
      return data;
    } catch (err) {
      // נעיף שגיאה מותאמת אישית
      return rejectWithValue(err.message || 'Error logging in owner');
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
     
      state.userDetails = {
        role: '',
        email: '',
        companyName: '',
        phone: '',
        address: '',
        contactPerson: '',
        name: ''
      };
      state.loggedIn = false;
      localStorage.removeItem('jwtToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(supplierLogin.fulfilled, (state, action) => {
        const { supplier } = action.payload;
        state.userDetails = supplier;
        state.loggedIn = true;
        state.error = null;
      })
      .addCase(supplierLogin.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      .addCase(ownerLogin.fulfilled, (state, action) => {
       

        const { owner, accessToken } = action.payload;

        state.userDetails.name = owner.name;
        state.userDetails.role = owner.role;
        state.loggedIn = true;
        state.error = null;
        localStorage.setItem('jwtToken', accessToken)
      })
      .addCase(ownerLogin.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
