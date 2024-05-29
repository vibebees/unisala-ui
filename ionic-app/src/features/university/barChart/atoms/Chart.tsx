import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ObjectFilter from '../../../../utils/components/ObjectFilter';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ allProps }) => {
  const {
    chatLabels,
    data = {},
    header = "",
    YAxisLabel = "",
    maxvalue = null,
  } = allProps;
  const newData = { ...data };
  ObjectFilter(newData, -1);

  // Clean up data
  delete newData.__typename;
  delete newData.unitId;
  delete newData.grandTotal;

  const values = Object.values(newData);
  const labels = Object.keys(newData).map((key) => chatLabels[key]);

  const chartData = {
    labels,
    datasets: [
      {
        label: YAxisLabel,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: maxvalue ? maxvalue : undefined,
        title: {
          display: true,
          text: YAxisLabel,
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="h-4/5 pb-5">
      <h2 className="font-semibold px-7 py-4 text-lg">{header}</h2>
      <div>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
