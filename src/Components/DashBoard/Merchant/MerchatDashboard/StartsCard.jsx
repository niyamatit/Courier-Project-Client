
import { FaInfoCircle } from 'react-icons/fa';

const StatsCard = ({ title, value, icon, color, percentage,percentageColor,iconColor }) => {
    return (
        <div className={`p-4 shadow-lg hover:shadow-2xl rounded-lg ${color}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`text-2xl mb-7 ${iconColor}`}>{icon}</div>
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <div className='flex'>
                        <p className="text-2xl font-bold ">{value}</p>
                        <p className={`mt-3 text-[14px] font-medium ${percentageColor}`}>({percentage})</p>
                        </div>
                    </div>
                </div>
                <button className="text-blue-500 flex mt-2 items-center hover:text-blue-700">
                    <FaInfoCircle className="mr-1" /> Details
                </button>
            </div>
        </div>
    );
};

export default StatsCard;
