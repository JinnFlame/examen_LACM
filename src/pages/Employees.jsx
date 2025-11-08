import React, { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import EmployeeForm from "../components/EmployeeForm";
import useCount from "../hooks/useCount";

export default function Employees() {
  const { employees, loading, error, addEmployee, updateEmployee, deleteEmployee } = useContext(EmployeeContext);
  
  const [editing, setEditing] = useState(null);
  
  const { count, inc } = useCount("employees_view_count");

  useEffect(() => { inc(); }, []); // contar visitas a la página

  if (loading) return <div className="container">Cargando...</div>;
  if (error) return <div className="container alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Empleados</h2>
        <small className="text-muted">Vistas: {count}</small>
      </div>

      <div className="row">
        
        <div className="col-md-4">
          <EmployeeForm
            initial={editing}
            
            onCancel={() => setEditing(null)}
            
            onSave={async (data) => {
              if (editing) {
                await updateEmployee(editing.id, data);
              } else {
                await addEmployee(data);
              }
              setEditing(null);
            }}
          />
        </div>

        <div className="col-md-8">
          <h4>Lista de Empleados</h4>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Puesto</th>
                  <th>Sueldo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">No hay empleados registrados.</td>
                  </tr>
                )}
                
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name} {emp.apeP} {emp.apeM}</td>
                    <td>{emp.puesto}</td>
                    <td>${Number(emp.sueldo).toLocaleString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-primary" 
                          onClick={() => setEditing(emp)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-danger" 
                          onClick={() => { if(confirm('¿Seguro que deseas eliminar?')) deleteEmployee(emp.id); }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        </div> 

      </div> 

    </div>
  );
}