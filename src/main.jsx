import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/index.css";

import AuthProvider from "./providers/AuthProvider.jsx";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
