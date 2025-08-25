import  { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

const DeliveryCard = ({ title, items }) => {
  // Pagination states
  const itemsPerPage = 5; // প্রতি পেজে কতটা আইটেম দেখাবেন
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-blue-100 border-[2px] hover:border-blue-400 text-black p-2 md:p-7 lg:p-7 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div>
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-4 text-xl">
            No data found for <span className="font-bold">{title}</span>
          </p>
        ) : (
          paginatedItems.map((item, index) => (
            <div
              key={index}
              className="p-3 mb-3 border border-black rounded-md flex justify-between items-center hover:bg-gray-100 transition"
            >
              <div>
                <h3 className="font-medium text-lg">{item.Customer_Name}</h3>
                <p className="text-gray-500">Order ID: {item?.CnNumber}</p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end text-gray-600">
                  <FaPhoneAlt className="mr-1" /> {item.Customer_Contact_Number}
                </p>
                <p className="text-green-600 font-semibold">
                  ৳ {item?.Total_Charge || 0}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {items.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === 1
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Prev
          </button>
          <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryCard;
