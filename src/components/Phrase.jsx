import { useState } from "react";
import { getRandomLyrics } from "../services/GalleryService";
import Loader from "./Loader";

export default function Phrase() {
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const fetchLyricsOnClick = async () => {
    setIsLoading(true); // Iniciar el loader
    setIsMessageVisible(true);
    try {
      const data = await getRandomLyrics();
      setLyrics(data.lyrics);
      setSong(data.name);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
      // Establecer una frase por defecto en caso de fallo
      setLyrics("My thoughts will echo your name until I see you again.");
    } finally {
      setIsLoading(false); // Detener el loader
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {!isLoaded && (
        <button
          className="bg-[#6A64F1] text-white font-semibold py-2 px-4 rounded hover:bg-[#5854d6] focus:outline-none focus:ring-2 focus:ring-purple-300"
          onClick={fetchLyricsOnClick}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Mostrar Frase"}
        </button>
      )}
      {isLoading && <Loader />}
      {isLoaded && isMessageVisible && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{song} </h2>
          <p className="mt-4 text-gray-600">{lyrics}</p>
          <button
            className="text-red-400 text-sm my-4 font-semibold"
            onClick={() => setIsMessageVisible(false)} // Ocultar el mensaje
          >
            Cerrar mensaje
          </button>
        </>
      )}
      {isLoaded && !isMessageVisible && (
        <button
          className="text-purple-500 text-sm font-semibold my-4 "
          onClick={() => setIsMessageVisible(true)} // Mostrar el mensaje nuevamente
        >
          Mostrar mensaje nuevamente
        </button>
      )}
    </div>
  );
}
