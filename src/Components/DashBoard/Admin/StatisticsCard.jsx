

const StatisticsCard = ({ title, value, icon, color }) => {
    return (
        <div className={`p-6 shadow-lg hover:shadow-2xl  rounded-lg ${color}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-4xl">{icon}</div>
                    <div className="ml-4 text-center">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="text-xl font-bold text-[35px]">{value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard;