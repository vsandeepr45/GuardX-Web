import React from "react";
import ReactDOM from "react-dom/client";

import {
    BrowserRouter
} from "react-router-dom";

import App from "./App";

import "./styles/global.css";
import "./styles/theme.css";
import "./styles/dashboard.css";
import "./styles/company.css";
import "./styles/patrol.css";

import {
    AuthProvider
} from "./context/AuthContext";

import {
    ThemeProvider
} from "./context/ThemeContext";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(

    <AuthProvider>

        <ThemeProvider>

            <BrowserRouter>

                <App />

            </BrowserRouter>

        </ThemeProvider>

    </AuthProvider>

);