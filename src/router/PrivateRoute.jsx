import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Spin } from "antd";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Mostrar indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Renderizar las rutas hijas si está autenticado
  return <Outlet />;
};

export default PrivateRoute;
