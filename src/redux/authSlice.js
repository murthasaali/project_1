import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    products: [],
    userToken: null,
    isSignIn: true,
    isAbout:false,
    isLogin:false,
    isCollection:false,
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
    setIsabout: (state, action) => {
      state.isAbout = action.payload;
    },
    setIslogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setIscollection: (state, action) => {
      state.isCollection = action.payload;
    },
  }
});

export const {setIscollection, setToken, setUserToken, setProducts, setSignIn ,setIsabout,setIslogin} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserToken = (state) => state.auth.userToken;
export const selectProducts = (state) => state.auth.products;
export const selectIsabout = (state) => state.auth.isAbout;
export const selectIslogin = (state) => state.auth.isLogin;
export const selectIscollection = (state) => state.auth.isCollection;

export default authSlice.reducer;
