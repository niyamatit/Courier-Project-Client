

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl mx-4 sm:mx-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto max-h-[75vh]">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t border-gray-300 px-4 py-2">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
