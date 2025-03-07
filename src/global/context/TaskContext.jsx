import { createContext, useState } from "react";
import { message } from "antd";
import api from "../../api/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  // Obtener lista de tareas
  const getTasks = async (page = 1, limit = 5, order = "-created_at") => {
    try {
      setLoading(true);
      const response = await api.get(
        `/tasks?page=${page}&limit=${limit}&order=${order}`
      );

      setTasks(response.data.data || []);
      setPagination({
        current: page,
        pageSize: limit,
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      message.error("No se pudieron cargar las tareas");
      return { items: [] };
    } finally {
      setLoading(false);
    }
  };

  // Obtener detalle de una tarea
  const getTaskById = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${id}`);
      setCurrentTask(response.data.data.task);
      return response.data.data.task;
    } catch (error) {
      console.error(`Error al obtener la tarea ${id}:`, error);
      message.error("No se pudo cargar el detalle de la tarea");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva tarea
  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await api.post("/tasks/create", taskData);
      message.success("Tarea creada exitosamente");

      // Actualizar la lista de tareas
      await getTasks(pagination.current, pagination.pageSize);

      return response.data;
    } catch (error) {
      console.error("Error al crear tarea:", error);
      message.error("No se pudo crear la tarea");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar tarea existente
  const updateTask = async (id) => {
    try {
      setLoading(true);
      const response = await api.patch(`/tasks/update/${id}`);
      message.success("Tarea actualizada exitosamente");

      // Actualizar la lista de tareas y el detalle de la tarea actual
      if (currentTask && currentTask.id === id) {
        setCurrentTask(response.data);
      }
      await getTasks(pagination.current, pagination.pageSize);

      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la tarea ${id}:`, error);
      message.error("No se pudo actualizar la tarea");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/tasks/delete/${id}`);
      message.success("Tarea eliminada exitosamente");

      // Actualizar la lista de tareas
      await getTasks(pagination.current, pagination.pageSize);

      // Si la tarea eliminada es la actual, limpiar el estado
      if (currentTask && currentTask.id === id) {
        setCurrentTask(null);
      }

      return true;
    } catch (error) {
      console.error(`Error al eliminar la tarea ${id}:`, error);
      message.error("No se pudo eliminar la tarea");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Limpiar la tarea actual
  const clearCurrentTask = () => {
    setCurrentTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        currentTask,
        loading,
        pagination,
        getTasks,
        getTaskById,
        createTask,
        updateTask,
        deleteTask,
        clearCurrentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
