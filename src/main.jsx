import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";
import { EmployeeProvider } from "./contexts/EmployeeProvider";
import "./index.css";

// registra WebComponent
import "./components/UserBadge";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
