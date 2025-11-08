import React, { useState, useEffect } from "react";
import { apiGet } from "../api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("app_user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("app_user", JSON.stringify(user));
  }, [user]);

  async function login({ username, password }) {
    // valida contra endpoint users
    try {
      const users = await apiGet("usuario");
      const found = users.find(u => u.username === username && u.password === password);
      if (!found) throw new Error("Credenciales incorrectas");
      setUser({ id: found.id, username: found.username, nombre: found.nombre, estado: found.estado });
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message || "Error login" };
    }
  }

  function logout() {
    setUser(null);
    // localStorage cleared by effect
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}