import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices';
import wishlistReducer from './slices/wishlistSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer 
  },
});

export default store;
