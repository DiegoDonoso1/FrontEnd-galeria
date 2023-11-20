import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2s3IIQQmA8fDj0q0leL28yKKgjadl3f4",
  authDomain: "imagenes-galeria.firebaseapp.com",
  projectId: "imagenes-galeria",
  storageBucket: "imagenes-galeria.appspot.com",
  messagingSenderId: "1076497356791",
  appId: "1:1076497356791:web:c43b1add7861ede39600f2",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export default app;
