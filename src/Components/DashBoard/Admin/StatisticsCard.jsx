

// const StatisticsCard = ({ title, value, icon, color }) => {
//     return (
//         <div className={`p-6 shadow-lg hover:shadow-2xl  rounded-lg ${color}`}>
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                     <div className="text-4xl">{icon}</div>
//                     <div className="ml-4 text-center">
//                         <h2 className="text-lg font-semibold">{title}</h2>
//                         <p className="text-xl font-bold text-[35px]">{value}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StatisticsCard;


import React, { useState, useEffect } from 'react';

// Helper function to format the value with comma separators
const formatValue = (val) => {
  // Return non-string/non-number values as is
  if (typeof val !== 'string' && typeof val !== 'number') {
    return val;
  }

  // Extract any non-numeric prefix (like '$')
  const prefix = String(val).match(/^[^0-9]*/)?.[0] || '';
  
  // Extract the number part
  const numberPart = String(val).replace(/^[^0-9]*/, '');
  
  // Add commas for thousands separators
  const formattedNumber = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return `${prefix}${formattedNumber}`;
};


const StatisticsCard = ({ title, value, icon }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the entry animation once the component is mounted
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Format the value for display
  const displayValue = formatValue(value);

  return (
    <div
      className={`
        group p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50
        border border-blue-100 shadow-md 
        transition-all duration-500 ease-out
        hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className="
            p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
            text-white shadow-lg shadow-blue-500/50
            transition-all duration-300 ease-in-out
            group-hover:scale-110 group-hover:rotate-6"
        >
          <div className="text-3xl">{icon}</div>
        </div>

        {/* Text content */}
        <div className="text-right">
          <h3 className="text-base font-medium text-blue-900/60">
            {title}
          </h3>
          <p className="text-4xl font-bold text-blue-900 mt-1">
            {displayValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;