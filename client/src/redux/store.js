// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userSlice from './slices/user.js';
import productSlice from './slices/products.js'
import ordersSlice from './slices/orders.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','products','orders']

};

const rootReducer = combineReducers({
  user: userSlice,
  products: productSlice,
  orders: ordersSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
