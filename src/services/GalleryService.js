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
        "Content-Type": "application/json",
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

const deleteImage = async (imageId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/dibujos/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la imagen:", error.response.data);
    throw error;
  }
};

const getRandomLyrics = async () => {
  try {
    // Suponiendo que tienes un endpoint '/canciones/frase-aleatoria' en tu backend
    const response = await api.get("/canciones");
    return response.data; // Devuelve la letra obtenida
  } catch (error) {
    console.error("Error al obtener la frase aleatoria:", error);
    throw error;
  }
};

export { getImages, getImage, uploadImage, deleteImage, getRandomLyrics };
