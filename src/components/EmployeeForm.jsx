import React, { useState, useEffect } from "react"; // 1. Importar useEffect

// Función helper para no repetir la lógica del estado inicial
const getInitialState = (initial) => {
  return initial ? {
    name: initial.name || "",
    apeP: initial.apeP || "",
    apeM: initial.apeM || "",
    sueldo: initial.sueldo || 0,
    antiguedad: initial.antiguedad || 0,
    puesto: initial.puesto || "",
    status: initial?.status ?? true
  } : {
    name: "", apeP: "", apeM: "", sueldo: 0, antiguedad: 0, puesto: "", status: true
  };
};

export default function EmployeeForm({ initial = null, onSave, onCancel }) {
  // 2. Usar la función helper para el estado inicial
  const [form, setForm] = useState(() => getInitialState(initial));
  const [errors, setErrors] = useState({});

  // 3. AGREGAR ESTE useEffect
  // Esto "resetea" el formulario cada vez que el prop 'initial' cambia
  // (por ej, cuando seleccionas un empleado de la lista o le das a "cancelar")
  useEffect(() => {
    setForm(getInitialState(initial));
    setErrors({}); // También limpia los errores
  }, [initial]);


  function validate() {
    const e = {};
    if (!form.name) e.name = "Nombre requerido";
    if (!form.apeP) e.apeP = "Apellido paterno requerido";
    if (!form.puesto) e.puesto = "Puesto requerido";
    if (Number(form.sueldo) <= 0) e.sueldo = "Sueldo debe ser mayor a 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // normalizar tipos
    const payload = {
      ...form,
      sueldo: Number(form.sueldo),
      antiguedad: Number(form.antiguedad),
      status: !!form.status
    };
    onSave(payload);
  }

  // El JSX interno del formulario no necesita cambios
  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      {/* Este título se actualizará automáticamente gracias al useEffect */}
      <h5>{initial ? "Editar empleado" : "Nuevo empleado"}</h5>
      <div className="row">
        <div className="mb-3 col-md-12"> {/* Ajustado a 12 col para mejor fit */}
          <label>Nombre</label>
          <input className={"form-control " + (errors.name ? "is-invalid" : "")}
            value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3 col-md-6"> {/* Ajustado a 6 col */}
          <label>Apellido P</label>
          <input className={"form-control " + (errors.apeP ? "is-invalid" : "")}
            value={form.apeP} onChange={e=>setForm({...form, apeP:e.target.value})} />
          {errors.apeP && <div className="invalid-feedback">{errors.apeP}</div>}
        </div>
        <div className="mb-3 col-md-6"> {/* Ajustado a 6 col */}
          <label>Apellido M</label>
          <input className="form-control" value={form.apeM} onChange={e=>setForm({...form, apeM:e.target.value})} />
        </div>
      </div>

      <div className="row">
        <div className="mb-3 col-md-6"> {/* Ajustado a 6 col */}
          <label>Sueldo</label>
          <input type="number" className={"form-control " + (errors.sueldo ? "is-invalid" : "")}
            value={form.sueldo} onChange={e=>setForm({...form, sueldo:e.target.value})} />
          {errors.sueldo && <div className="invalid-feedback">{errors.sueldo}</div>}
        </div>
        <div className="mb-3 col-md-6"> {/* Ajustado a 6 col */}
          <label>Antiguedad (años)</label>
          <input type="number" className="form-control" value={form.antiguedad} onChange={e=>setForm({...form, antiguedad:e.target.value})} />
        </div>
        <div className="mb-3 col-md-12"> {/* Ajustado a 12 col */}
          <label>Puesto</label>
          <input className={"form-control " + (errors.puesto ? "is-invalid" : "")} value={form.puesto} onChange={e=>setForm({...form, puesto:e.target.value})} />
          {errors.puesto && <div className="invalid-feedback">{errors.puesto}</div>}
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          {/* El botón ahora es más inteligente */}
          {initial ? "Cancelar Edición" : "Limpiar"}
        </button>
      </div>
    </form>
  );
}