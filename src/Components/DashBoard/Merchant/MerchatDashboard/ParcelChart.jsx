import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ParcelChart = ({ data }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        let chartInstance = null;

        if (canvasRef.current) {
            chartInstance = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Pickup',
                            data: data.pickup,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Delivered',
                            data: data.delivered,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });

            chartRef.current = chartInstance;
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ParcelChart;
