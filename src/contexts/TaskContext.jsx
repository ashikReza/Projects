/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */

import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducers/TaskReducer";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext }; // Exporting TaskContext for use in other components
