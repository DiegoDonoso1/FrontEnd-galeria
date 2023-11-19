import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { UploadForm } from "./components/UploadForm";
import Navbar from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import ImageDetailPage from "./pages/ImageDetailPage";
import LoginForm from "./components/LoginForm";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Si el token ha expirado
        handleLogout();
      } else {
        // Si el token aún es válido
        setUsername(localStorage.getItem("username"));
      }
    } else {
      // Si no hay token
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <>
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          username={username}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dibujo/:id" element={<ImageDetailPage />} />
          <Route
            path="/form"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                element={<UploadForm />}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
