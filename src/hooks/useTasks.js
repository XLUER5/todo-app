import { useContext } from "react";
import TaskContext from "../global/context/TaskContext";

const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("Error en el contexto de tareas");
  }

  return context;
};

export default useTasks;
