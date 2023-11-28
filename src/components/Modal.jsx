// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, onClose, onConfirm, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded max-w-lg w-4/5">
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-[#6A64F1] hover:bg-gray-400 text-white p-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-400 hover:bg-red-600 text-white p-2 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
