import React from "react";
import { Bar } from "react-chartjs-2";

interface PeakUsageBarChartProps {
  hoursCount: { [key: string]: number };
  title?: string;
  barColor?: string;
}

const PeakUsageBarChart: React.FC<PeakUsageBarChartProps> = ({ 
  hoursCount, 
  title ="",
  barColor = "rgba(33, 45, 215, 0.6)"
}) => {
  // Prepare chart data using the hoursCount
  const chartData = {
    labels: Object.keys(hoursCount).map(hour => `${hour}:00`), // Format hours for labels
    datasets: [
      {
        label:title,
        data: Object.values(hoursCount), // Use the count of drafts as the data
        backgroundColor: barColor, // Color for bars
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
      <Bar data={chartData} options={chartOptions} />
  );
};

export default PeakUsageBarChart;
