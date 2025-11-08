export const initialState = {
  employees: [],
  loading: true,
  error: null
};

export function employeeReducer(state, action) {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload, loading: false };
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.payload] };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map(e => e.id === action.payload.id ? action.payload : e)
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(e => e.id !== action.payload)
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
