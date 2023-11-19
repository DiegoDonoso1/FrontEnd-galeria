import api from "./api";

const getImages = async () => {
  try {
    const response = await api.get("/dibujos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    throw error;
  }
};

const getImage = async (imageId) => {
  try {
    const response = await api.get(`/dibujos/${imageId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    throw error;
  }
};

const uploadImage = async (formData) => {
  try {
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem("token");
    const response = await api.post("/dibujos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Incluir el token en el header Authorization
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir la imagen:", error.response.data);
    throw error;
  }
};

export { getImages, getImage, uploadImage };
