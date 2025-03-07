import { createContext, useState, useEffect } from "react";
import { message } from "antd";
import api from "../../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          setToken(storedToken);
          setEmail(localStorage.getItem("email"));
        } catch (error) {
          console.error("Error validando sesión:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email) => {
    try {
      setLoading(true);
      const response = await api.post("/login", { email });
      const { data } = response.data;

      const newToken = data.token;

      localStorage.setItem("token", newToken);
      localStorage.setItem("email", email);

      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      setToken(newToken);
      setEmail(email);

      message.success("¡Inicio de sesión exitoso!");
      return true;
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      message.error(
        "Error de inicio de sesión: " +
          (error.response?.data?.message || "Credenciales inválidas")
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setEmail("");
    message.success("Sesión cerrada");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, loading, email }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
