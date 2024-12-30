import React from "react";
import { Bar } from "react-chartjs-2";

interface ProductiveDaysProps {
  hoursCount: { [key: string]: number }; // This will now map days of the week to counts
}

const ProductiveDays: React.FC<ProductiveDaysProps> = ({ hoursCount }) => {
  // Prepare chart data using the hoursCount for each day of the week
  const chartData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Days of the week
    datasets: [
      {
        label: "Notes Taken",
        data: [
          hoursCount["Sunday"] || 0,   // Notes for Sunday
          hoursCount["Monday"] || 0,   // Notes for Monday
          hoursCount["Tuesday"] || 0,  // Notes for Tuesday
          hoursCount["Wednesday"] || 0, // Notes for Wednesday
          hoursCount["Thursday"] || 0, // Notes for Thursday
          hoursCount["Friday"] || 0,   // Notes for Friday
          hoursCount["Saturday"] || 0, // Notes for Saturday
        ],
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
          text: "Day of Week",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Notes Count",
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
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Peak Productivity Hours (Weekly)</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProductiveDays;
