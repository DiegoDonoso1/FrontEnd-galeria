import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImages } from "../services/GalleryService";
import ImageCard from "./ImageCard";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await getImages();
        setImages(imageData.data);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
      {images.map((image) => (
        <Link key={image._id} to={`/dibujo/${image._id}`}>
          <ImageCard image={image} />
        </Link>
      ))}
    </div>
  );
}
