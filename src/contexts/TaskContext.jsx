/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */

import {
  useState,
  createContext,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";
import { reducer, initialState } from "./reducers/TaskReducer.jsx";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const [loaded, setLoaded] = useState(false); // flag to indicate if tasks have been loaded
  const [favLoaded, setFavLoaded] = useState(false); // flag to indicate if favorite tasks count has been loaded

  // Load tasks from local storage on component mount on the client-side
  useLayoutEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch({ type: "LOAD_TASKS", payload: JSON.parse(storedTasks) });
    }
    setLoaded(true); // set the flag to true after loading tasks
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    if (loaded) {
      // only save tasks if they have been loaded
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    }
  }, [state.tasks, loaded]);

  // Load favorite tasks count from local storage on component mount on the client-side
  useLayoutEffect(() => {
    const storedFavCount = localStorage.getItem("favoriteTasksCount");
    if (storedFavCount) {
      dispatch({
        type: "TOGGLE_SHOW_FAVORITES",
        payload: JSON.parse(storedFavCount),
      });
    }
    setFavLoaded(true); // set the flag to true after loading favorite tasks count
  }, []);

  // Save favorite tasks count to local storage whenever it changes
  useEffect(() => {
    if (favLoaded) {
      // only save favorite tasks count if it has been loaded
      localStorage.setItem(
        "favoriteTasksCount",
        JSON.stringify(state.favoriteTasksCount)
      );
    }
  }, [state.favoriteTasksCount, favLoaded]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
