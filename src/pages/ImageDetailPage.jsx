import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImage, deleteImage } from "../services/GalleryService";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

// eslint-disable-next-line react/prop-types
export default function ImageDetailPage({ isAuthenticated }) {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await deleteImage(id);
      setIsModalOpen(false);
      setToastMessage("Imagen eliminada con éxito");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-end p-4">
        {isAuthenticated && (
          <DeleteButton onOpenModal={() => setIsModalOpen(true)} />
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        >
          <p>¿Estás seguro de que deseas eliminar esta imagen?</p>
        </Modal>
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      </div>
      <div className="pt-8 flex flex-col md:flex-row container mx-auto items-center justify-center h-full px-4">
        {
          <img
            className="max-h-[60vh] md:max-h-[80vh] object-contain mb-4 md:mb-0 md:mr-8 w-full md:w-1/2"
            src={`${image.imgUrl}`}
            alt={image.name}
          />
        }

        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-3">{image.name}</h2>
          <p className="text-lg">{image.description}</p>
          <a
            href={image.imgUrl}
            download
            className="text-[#6A64F1] hover:text-blue-800 text-lg"
          >
            <i className="fas fa-download pt-4"></i> Descargar Imagen
          </a>
        </div>
      </div>
    </>
  );
}
