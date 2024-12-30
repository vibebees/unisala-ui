import React from "react";
import { Bar } from "react-chartjs-2";

interface PeakUsageBarChartProps {
  hoursCount: { [key: string]: number };
}

const PeakUsageBarChart: React.FC<PeakUsageBarChartProps> = ({ hoursCount }) => {
  // Prepare chart data using the hoursCount
  const chartData = {
    labels: Object.keys(hoursCount).map(hour => `${hour}:00`), // Format hours for labels
    datasets: [
      {
        label: "Notes Updated",
        data: Object.values(hoursCount), // Use the count of drafts as the data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hour of Day",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Draft Count",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Peak Productivity Hours</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PeakUsageBarChart;
