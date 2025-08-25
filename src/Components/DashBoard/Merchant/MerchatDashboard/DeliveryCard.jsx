import { FaPhoneAlt } from "react-icons/fa";

const DeliveryCard = ({ title, items }) => {
  return (
    <div className="bg-blue-100 border-[2px] hover:border-blue-400 text-black p-2 md:p-7 lg:p-7 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div>
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-4 text-xl">No data found for <span className="font-bold">{title}</span></p>
        ) : (
          items.map((item, index) => (
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
    </div>
  );
};

export default DeliveryCard;
