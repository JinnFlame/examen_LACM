import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    const res = await login(form);
    if (!res.ok) {
      setError(res.message || "Error");
    } else {
      navigate("/employees");
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input required value={form.username} onChange={e=>setForm({...form, username:e.target.value})}
            className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input required type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}
            className="form-control" />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
    </div>
  );
}
