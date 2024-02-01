import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext"; 

export const useTaskContext = () => useContext(TaskContext);
