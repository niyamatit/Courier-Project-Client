import { Chart } from "chart.js";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

const DashBoardChart = ({data}) => {

    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [filteredData, setFilteredData] = useState(data);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const filterData = (data, from, to) => {
        if (!from && !to) return data;

        const fromDate = from ? new Date(from) : new Date('1970-01-01');
        const toDate = to ? new Date(to) : new Date();

        const filteredIndices = data.labels
            .map((label, index) => ({ label, index }))
            .filter(item => {
                const date = new Date(item.label);
                return date >= fromDate && date <= toDate;
            })
            .map(item => item.index);

        const filteredLabels = filteredIndices.map(index => data.labels[index]);
        const filteredPickup = filteredIndices.map(index => data.pickup[index]);
        const filteredDelivered = filteredIndices.map(index => data.delivered[index]);

        return {
            labels: filteredLabels,
            pickup: filteredPickup,
            delivered: filteredDelivered,
        };
    };

    useEffect(() => {
        setFilteredData(filterData(data, fromDate, toDate));
    }, [data, fromDate, toDate]);

    useEffect(() => {
        let chartInstance = null;

        if (canvasRef.current) {
            chartInstance = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: filteredData.labels,
                    datasets: [
                        {
                            label: 'Pickup',
                            data: filteredData.pickup,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Delivered',
                            data: filteredData.delivered,
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
    }, [filteredData]);

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
                <label>From Date: </label>
                <DatePicker selected={fromDate} onChange={date => setFromDate(date)} />
            </div>
            <div>
                <label>To Date: </label>
                <DatePicker selected={toDate} onChange={date => setToDate(date)} />
            </div>
        </div>
        <canvas ref={canvasRef} />
    </div>
    );
};

export default DashBoardChart;