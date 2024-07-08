
import { FaInfoCircle } from 'react-icons/fa';

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className={`p-4 shadow-lg rounded-lg ${color}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-2xl">{icon}</div>
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="text-xl">{value}</p>
                    </div>
                </div>
                <button className="text-blue-500 flex items-center hover:text-blue-700">
                    <FaInfoCircle className="mr-1" /> Details
                </button>
            </div>
        </div>
    );
};

export default StatsCard;
