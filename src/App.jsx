/* eslint-disable no-unused-vars */

import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home.jsx";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";
import SingleBlog from "./pages/single-blog.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

import CreateBlog from "./pages/CreateBlogPage.jsx";
import UpdateBlog from "./pages/UpdateBlogPage.jsx";

import { Routes, Route } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Profile />} path="/profile" />
          <Route element={<SingleBlog />} path="/singleBlog/:id" />
          <Route element={<CreateBlog />} path="/createBlog/" />
          <Route element={<UpdateBlog />} path="/updateBlog/:id" />
        </Route>

        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<PageNotFound />} path="*" />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
