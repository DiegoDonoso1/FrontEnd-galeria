import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImage } from "../services/GalleryService";

export default function ImageDetailPage() {
  const { id } = useParams();

  const [image, setImage] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await getImage(id);
        setImage(imageData.data);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };
    fetchImages();
  }, [id]);
  return (
    <div className="pt-14 flex flex-col md:flex-row container mx-auto items-center justify-center h-full px-4">
      <img
        className="max-h-[60vh] md:max-h-[80vh] object-contain mb-4 md:mb-0 md:mr-8 w-full md:w-1/2"
        src={`http://localhost:3000/${image.imgUrl}`}
        alt={image.name}
      />
      <div className="w-full md:w-1/3 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-3">{image.name}</h2>
        <p className="text-lg">{image.description}</p>
      </div>
    </div>
  );
}
