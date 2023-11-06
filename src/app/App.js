import React from "react";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Home from "../pages/home/Home";
import Profile from "../pages/auth/Profile";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import User from "../pages/user/User";
import UserList from "../pages/user/UserList";
import Product from "../pages/product/Product";
import ProductList from "../pages/product/ProductList";
import PrivateRoute from "./PrivateRoute";
import AuthVerify from "../components/common/authverify";
import LoadingSpinner from "../components/common/LoadingSpinner";
import "antd/dist/antd.css";
import "../assets/styles/main.css";
import "../assets/styles/npp.css";
import "../assets/styles/plugins/fontawesome-free/css/all.min.css";
import "../assets/styles/responsive.css";

function App() {
  return (
    <div>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/users/create">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/users/list">
            <UserList />
          </PrivateRoute>
          <PrivateRoute path="/users/:id/edit">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/product/create">
            <Product />
          </PrivateRoute>
          <PrivateRoute path="/product/list">
            <ProductList />
          </PrivateRoute>
          <PrivateRoute path="/product/:id/edit">
            <Product />
          </PrivateRoute>
          <PrivateRoute >
            <Home />
          </PrivateRoute>
        </Switch>
        <AuthVerify />
        <ToastContainer />
      </div>
      <div id="overlay">
        <LoadingSpinner />
      </div>
    </div>
  );
}

export default App;
