import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react/prop-types
export default function LoginForm({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user") {
      setUser(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !password) {
      setError("Por favor, rellena todos los campos.");
      return; // Detener la ejecución si hay campos vacíos
    }
    try {
      // Llama a la función login y pasa las credenciales
      const response = await login({ user, password });
      const decodedToken = jwtDecode(response.token);

      // Guardar el token y el nombre de usuario en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", decodedToken.user);

      onLoginSuccess(decodedToken.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[550px] bg-white">
      <form className="py-6 px-9" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="user"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Usuario
          </label>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="usuario123"
            onChange={handleInputChange}
            value={user}
            className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
              !password && error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={password}
            className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
              !password && error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <button
            type="submit"
            className=" w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-[#5854d6]"
          >
            Iniciar sesión
          </button>
          {error && (
            <div
              className=" mb-4 mt-4 p-4 text-center text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
