/* eslint-disable no-unused-vars */

import React from "react";
import Header from "./Header.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
