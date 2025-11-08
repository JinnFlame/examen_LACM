import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div className="container">
                                  <h2>Bienvenido al Examen AWP 2do Parcial</h2>
                                  <span>Hecho por Luis Andres Cisneros Mendoza</span>
                                </div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
