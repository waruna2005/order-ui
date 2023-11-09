import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../pages/auth/authSlice";
import homeReducer from "../pages/home/homeSlice";
import userReducer from "../pages/user/userSlice";
import productReducer from "../pages/product/productSlice";
import orderReducer from "../pages/order/orderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  users: userReducer,
  products: productReducer,
  orders: orderReducer
});

export default rootReducer;
