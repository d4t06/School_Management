import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeProvider from "./stores/ThemeContext.tsx";
import AuthProvider from "./stores/AuthContext.tsx";
import ToastProvider from "./stores/ToastContext.tsx";
import ToastPortal from "./components/ToastPortal.tsx";
// import Auth from "./components/Auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          {/* <Auth> */}
          <ToastPortal autoClose />
          <App />
          {/* </Auth> */}
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
