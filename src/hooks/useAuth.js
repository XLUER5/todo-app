import { useContext } from "react";
import AuthContext from "../global/context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Error en el uso de useAuth");
  }

  return context;
};

export default useAuth;
