import React, { useReducer, useEffect } from "react";
import { employeeReducer, initialState } from "../reducers/employeeReducer";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";
import { EmployeeContext } from "./EmployeeContext";

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Cargar empleados desde API al inicio
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiGet("empleado");
        if (!mounted) return;
        dispatch({ type: "SET_EMPLOYEES", payload: data });
        // guardar en localStorage
        localStorage.setItem("empleado", JSON.stringify(data));
      } catch (err) {
        // fallback a localStorage
        const saved = localStorage.getItem("empleado");
        if (saved) {
          dispatch({ type: "SET_EMPLOYEES", payload: JSON.parse(saved) });
        } else {
          dispatch({ type: "ERROR", payload: err.message });
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  // acciones CRUD que sincronizan con API y dispatch local
  async function addEmployee(obj) {
    const saved = await apiPost("empleado", obj);
    dispatch({ type: "ADD_EMPLOYEE", payload: saved });
    persist();
  }
  async function updateEmployee(id, obj) {
    const updated = await apiPut("empleado", id, obj);
    dispatch({ type: "UPDATE_EMPLOYEE", payload: updated });
    persist();
  }
  async function deleteEmployee(id) {
    await apiDelete("empleado", id);
    dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    persist();
  }

  function persist() {
    localStorage.setItem("empleado", JSON.stringify(state.employees));
  }

  return (
    <EmployeeContext.Provider value={{
      employees: state.employees,
      loading: state.loading,
      error: state.error,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      dispatch
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}
