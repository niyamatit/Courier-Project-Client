

const StatsCard = ({ title, value, icon, color }) => {
    return (
        <div className={`p-4 shadow-lg rounded-lg ${color}`}>
            <div className="flex items-center">
                <div className="text-2xl">{icon}</div>
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-xl">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
