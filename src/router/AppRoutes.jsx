import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import { Home } from "../pages/Home";
import CreateTask from "../pages/CreateTask";
import NotFound from "../pages/NotFound";
import TaskDetail from "../pages/TaskDetail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tasks/new" element={<CreateTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
