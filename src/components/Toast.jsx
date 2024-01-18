// eslint-disable-next-line react/prop-types
export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-center items-center">
      <div className="bg-purple-300 font-semibold text-white py-3 px-4 rounded flex items-center">
        {message}
        <button onClick={onClose} className="ml-4 text-lg">
          &times;
        </button>
      </div>
    </div>
  );
}
