import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImages } from "../services/GalleryService";
import ImageCard from "./ImageCard";
import Loader from "./Loader";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await getImages();
        setImages(imageData.data);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setIsLoading(false); // Detener la carga una vez que se obtienen los datos
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
      {isLoading ? (
        <div className="col-span-2 md:col-span-4 flex justify-center">
          <Loader />
        </div>
      ) : (
        images.map((image) => (
          <Link key={image._id} to={`/dibujo/${image._id}`}>
            <ImageCard image={image} />
          </Link>
        ))
      )}
    </div>
  );
}
