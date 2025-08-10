// src/components/modals/BranchViewModal.jsx

import { FaTimes } from "react-icons/fa";

const BranchViewModal = ({ isOpen, onClose, branchData }) => {
  if (!isOpen || !branchData) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-8 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-xl animate-fade-in-down">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Branch Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
          <p>
            <strong className="font-semibold">From Country:</strong>{" "}
            {branchData.fromCountry}
          </p>
          <p>
            <strong className="font-semibold">To Country:</strong>{" "}
            {branchData.toCountry}
          </p>
          <p>
            <strong className="font-semibold">Delivery Time:</strong>{" "}
            {branchData.deliveryTime}
          </p>
          <p>
            <strong className="font-semibold">Courier Company:</strong>{" "}
            {branchData.deliveryCompany}
          </p>
          <p>
            <strong className="font-semibold">Custom Amount:</strong> ৳
            {branchData.customAmount}
          </p>
          <p>
            <strong className="font-semibold">Agent Amount:</strong> ৳
            {branchData.agentAmount}
          </p>
          <p>
            <strong className="font-semibold">Customer Amount:</strong> ৳
            {branchData.customerAmount}
          </p>
          <p>
            <strong className="font-semibold">Merchant Amount:</strong> ৳
            {branchData.merchantAmount}
          </p>
          <p>
            <strong className="font-semibold">Other Company Amount:</strong> ৳
            {branchData.othersCompanyAmount}
          </p>
          <p>
            <strong className="font-semibold">Date Added:</strong>{" "}
            {new Date(branchData.date).toLocaleDateString()}
          </p>
          <p>
            <strong className="font-semibold">Last Updated:</strong>{" "}
            {new Date(branchData.updateDate).toLocaleDateString()}
          </p>
        </div>

        {branchData.products && branchData.products.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Products Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {branchData.products.map((product, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <p>
                    <strong className="font-medium">Name:</strong>{" "}
                    {product.name}
                  </p>
                  <p>
                    <strong className="font-medium">Unit:</strong>{" "}
                    {product.unit}
                  </p>
                  <p>
                    <strong className="font-medium">Price:</strong> ৳
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchViewModal;