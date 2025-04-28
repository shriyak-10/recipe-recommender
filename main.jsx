// src/main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Make sure this file exists and is the main component
import "./styles.css";  // Import styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
