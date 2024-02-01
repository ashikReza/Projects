import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext.jsx"; 

export const useTaskContext = () => useContext(TaskContext);
