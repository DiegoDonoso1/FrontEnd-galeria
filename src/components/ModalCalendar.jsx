/* eslint-disable react/prop-types */
export default function Modal({ isOpen, onClose, dayDetails }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white p-4 max-w-md mx-auto rounded-md z-10 relative">
        {/* Contenedor para el título y la "x" */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">{dayDetails.title}</h2>
          {/* Botón "x" en la esquina superior derecha */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer text-2xl p-2"
          >
            &times;
          </button>
        </div>
        {/* Contenido del modal */}
        <img
          src={dayDetails.imagePath}
          alt={dayDetails.title}
          className="w-4/6 rounded-md mb-2 mx-auto"
        />
        <p className="text-gray-700 text-center">
          {dayDetails.description} lorem
        </p>
      </div>
    </div>
  );
}
