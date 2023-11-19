import api from "./api";

// Función para iniciar sesión
const login = async (credentials) => {
  try {
    const response = await api.post("dibujos/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Guarda el token en localStorage
      return response.data; // Devuelve la respuesta para ser manejada por el componente que llamó a esta función
    }
  } catch (error) {
    const errorMessage = error.response?.data || "Error al iniciar sesión.";
    throw new Error(errorMessage);
  }
};

// Función para cerrar sesión
const logout = () => {
  localStorage.removeItem("token"); // Elimina el token de localStorage
};

// Puedes exportar cada función individualmente o como un objeto
export { login, logout };
