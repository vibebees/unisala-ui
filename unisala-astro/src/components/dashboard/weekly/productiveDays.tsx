import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = (title: string, maxY: number, horizontalLines: number[]) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: maxY, // Extend Y-axis to accommodate horizontal bars
      title: {
        display: true,
        text: 'Notes Count',
      },
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Day of the Week',
      },
    },
  },
});

interface ProductiveDaysProps {
  dayCount: { [key: string]: number };
  title: string;
  lineColor?: string;
  fillColor?: string;
  horizontalLines?: number[];
}

export const ProductiveDays: React.FC<ProductiveDaysProps> = ({
  dayCount,
  title,
  lineColor = 'rgb(53, 162, 235)',
  fillColor = 'rgba(53, 162, 235, 0.5)',
  horizontalLines = [],
}) => {
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Notes Created',
        data: labels.map((label) => dayCount[label]),
        borderColor: lineColor,
        backgroundColor: fillColor,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  // Calculate maximum Y value
  const maxDataValue = Math.max(...Object.values(dayCount));
  const maxY = Math.max(maxDataValue, ...horizontalLines) + 2; // Add buffer above highest line

  return <Line options={options(title, maxY, horizontalLines)} data={data} />;
};
