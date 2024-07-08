
import { Chart } from 'react-google-charts';

const ParcelPieChart = ({ data }) => {
    const chartData = [
        ['Category', 'Value'],
        ['Parcel Booking', data.parcelBooking],
        ['Delivered', data.delivered],
        ['Partially Delivered', data.partiallyDelivered],
        ['Processing', data.processing],
        ['Cancelled', data.cancelled],
        ['Deleted', data.deleted],
    ];

    return (
        <div>
            
            <Chart
                chartType="PieChart"
                data={chartData}
                options={{
                    pieSliceText: 'label',
                    slices: {
                        0: { color: '#3498db' },
                        1: { color: '#2ecc71' },
                        2: { color: '#f39c12' },
                        3: { color: '#1abc9c' },
                        4: { color: '#e74c3c' },
                        5: { color: '#95a5a6' },
                    },
                    is3D:true
                }}
                width={"100%"}
                height={"400px"}
            />
            {/* <div className="flex justify-center mt-4">
                <div className="flex items-center mr-4">
                    <span className="block w-4 h-4 mr-2" style={{ backgroundColor: '#3498db' }}></span> Parcel Booking
                </div>
                <div className="flex items-center mr-4">
                    <span className="block w-4 h-4 mr-2" style={{ backgroundColor: '#2ecc71' }}></span> Delivered
                </div>
                <div className="flex items-center mr-4">
                    <span className="block w-4 h-4 mr-2" style={{ backgroundColor: '#f39c12' }}></span> Partially Delivered
                </div>
                <div className="flex items-center mr-4">
                    <span className="block w-4 h-4 mr-2" style={{ backgroundColor: '#1abc9c' }}></span> Processing
                </div>
                <div className="flex items-center mr-4">
                    <span className="block w-4 h-4 mr-2" style={{ backgroundColor: '#e74c3c' }}></span> Cancelled
                </div>
                <div className="flex items-center">
                    <span className="block w-4 h-4 mr-2" style={{ backgroundColor: '#95a5a6' }}></span> Deleted
                </div>
            </div> */}
        </div>
    );
};

export default ParcelPieChart;
