import { useState } from "react";
import { uploadCalendar } from "../services/GalleryService";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase/firebase"; // Asegúrate de que la ruta sea correcta
import Toast from "./Toast";

export function UploadFormCalendar() {
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [fileError, setFileError] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const handleDayChange = (e) => {
    setDay(e.target.value);
    if (!e.target.value.trim()) {
      setNameError("El nombre del dibujo no puede estar vacío.");
    } else {
      setNameError("");
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!e.target.value.trim()) {
      setDescriptionError("La descripción no puede estar vacía.");
    } else {
      setDescriptionError("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setFile(file);
      setFileError(""); // Esto se ejecuta solo cuando hay un archivo seleccionado

      // Opcional: Mostrar una vista previa de la imagen
      // Crear una URL para la imagen seleccionada
      const filePreviewUrl = URL.createObjectURL(file);
      setFilePreview(filePreviewUrl);
    } else {
      console.log("No file selected");
      setFile(null); // Esto asegura que el estado file se restablezca si el usuario limpia la selección
      setFilePreview(null);
      setFileError("Por favor, selecciona un archivo para subir.");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (!e.target.value.trim()) {
      setDescriptionError("La descripción no puede estar vacía.");
    } else {
      setDescriptionError("");
    }
  };

  const uploadImageToFirebase = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Imprime el estado del archivo para verificar
    console.log("File state:", file);

    // Si hay errores, no proceder con la subida
    if (!day.trim() || !title.trim() || !description.trim() || !file) {
      if (!day.trim()) setNameError("El dia del dibujo no puede estar vacío.");
      if (!description.trim())
        setDescriptionError("La descripción no puede estar vacía.");
      if (!imagePath.trim())
        setFileError("Por favor, selecciona un archivo para subir.");
      return;
    }
    const imgUrl = await uploadImageToFirebase(file);
    const itemData = {
      day,
      title,
      imagePath: imgUrl, // Usa la URL de Firebase aquí
      description,
    };

    // Llamar al servicio uploadImage
    try {
      const result = await uploadCalendar(itemData);
      setToastMessage("Imagen subida con éxito", result);
      setTimeout(() => {
        navigate("/calendario");
        // Limpiar el formulario
        setDay("");
        setTitle("");
        setImagePath("");
        setDescription("");
        setFile(null);
      }, 1500);
    } catch (error) {
      setToastMessage("Error al subir el evento");
      alert("Error al subir la imagen: " + error.response.data);
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-6 px-9" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nombre del dibujo o imagen
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="13"
              onChange={handleTitleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {nameError && (
              <div className="text-sm text-red-500">{nameError}</div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="day"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Número día imagen
            </label>
            <input
              type="number"
              name="day"
              id="day"
              value={day}
              placeholder="Este es un capibara lindo"
              onChange={handleDayChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {descriptionError && (
              <div className="text-sm text-red-500">{descriptionError}</div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Descripción de la imagen
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              placeholder="Este es un capibara lindo"
              onChange={handleDescriptionChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {descriptionError && (
              <div className="text-sm text-red-500">{descriptionError}</div>
            )}
          </div>
          <div className="mb-6 pt-4">
            <label
              htmlFor="file"
              className="mb-5 block text-xl font-semibold text-[#07074D]"
            >
              Subir imagen
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center cursor-pointer"
            >
              <span className="mb-2 text-xl font-semibold text-[#07074D]">
                Suelta la imagen acá o haz clic para seleccionar
              </span>
              <div className="mt-2 rounded border border-[#e0e0e0] py-2 px-4 text-base font-medium text-[#07074D]">
                Selecciona un archivo
              </div>
            </label>
            {filePreview && (
              <>
                <div className="pt-2 flex justify-between items-start">
                  <span className="text-green-500">
                    Imagen cargada: {file.name}
                  </span>
                  <button
                    onClick={() => {
                      setFile(null);
                      setFilePreview(null);
                      setFileError("");
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
            {fileError && (
              <div className="mb-4 mt-4 p-4 text-center text-sm text-red-700 bg-red-100 rounded-lg">
                {fileError}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-[#5854d6]"
            >
              Subir dibujo
            </button>
          </div>
        </form>
      </div>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}
