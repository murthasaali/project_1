import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    products: [],
    userToken: null,
    isSignIn: true,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save the token to local storage
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    // other reducers
  },
});

export const { setToken, setUserToken, setProducts, setSignIn } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserToken = (state) => state.auth.userToken;
export const selectProducts = (state) => state.auth.products;

export default authSlice.reducer;
