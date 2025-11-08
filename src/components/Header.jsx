import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">AWP - Examen</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            {isAuthenticated && (
              <li className="nav-item"><Link className="nav-link" to="/employees">Empleados</Link></li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="me-2">Hola, {user?.nombre || user?.username}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>Salir</button>
              </>
            ) : (
              <Link className="btn btn-outline-primary" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
