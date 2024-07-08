import  { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
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
            });

            chartRef.current = chartInstance;
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={canvasRef} />;
};

export default ParcelChart;
