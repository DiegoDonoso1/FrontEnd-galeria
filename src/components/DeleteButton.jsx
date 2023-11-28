// eslint-disable-next-line react/prop-types
export default function DeleteButton({ onOpenModal }) {
  return (
    <button
      onClick={onOpenModal}
      className="bg-red-400 hover:bg-red-600 text-white p-2 rounded"
    >
      Eliminar
    </button>
  );
}
