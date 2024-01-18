import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Navbar({ isAuthenticated, username, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="data:image/png;base64,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"
            className="h-8"
            alt="Logo galeria"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Galeria TKM
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`flex flex-col items-center justify-center w-full 
          md:flex-row md:items-end md:justify-between md:w-auto ${
            isMenuOpen || isMenuOpen === null ? "block" : "hidden md:block"
          }`}
          id="navbar-default"
        >
          <ul
            className="font-medium w-full flex flex-col items-center justify-center p-4 md:p-0 mt-4 
          border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 
          rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white  
           "
          >
            {isAuthenticated && (
              <>
                <li className="order-2 md:mb-0 mb-2 md:p-0 md:order-none">
                  <Link
                    to={"/form"}
                    className="relative inline-flex items-center justify-center 
                     text-white bg-purple-800 rounded md:bg-transparent md:text-purple-800 md:p-0
                    "
                    aria-current="page"
                  >
                    <span className="px-5 py-2.5">Subir imagen</span>
                  </Link>
                </li>
                <li className="order-1 md:order-none">
                  <div className="relative inline-flex items-center">
                    <span className="px-5 py-2.5">
                      Hola <span className="text-[#6A64F1]">{username}!</span>
                    </span>
                  </div>
                </li>
                <li className="order-1 md:order-none mb-2">
                  <Link
                    to="/calendario"
                    className="text-[#6A64F1] hover:text-blue-800"
                  >
                    Calendario
                  </Link>
                </li>
                <li className="order-3 md:order-none">
                  <button
                    onClick={onLogout}
                    className="relative inline-flex items-center justify-center p-0.5 md:mb-0 me-0 md:me-2
                    overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
                    bg-gradient-to-br from-purple-400 to-blue-400 group-hover:from-purple-600
                   group-hover:to-blue-500 hover:text-white  focus:ring-4 
                    focus:outline-none focus:ring-blue-300 "
                  >
                    <span
                      className="relative px-6 md:px-5 py-2.5 transition-all ease-in duration-75
                     bg-white  rounded-md group-hover:bg-opacity-0"
                    >
                      Cerrar Sesión
                    </span>
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-[#6A64F1] hover:text-blue-800"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/calendario"
                    className="text-[#6A64F1] hover:text-blue-800"
                  >
                    Calendario
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
