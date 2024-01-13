import "./firebaseConfig"; // Path to your config file
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // If using Firebase Authentication

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
