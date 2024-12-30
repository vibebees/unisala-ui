import React, { useState, useEffect } from "react";
import ChartCard from "../chartCard";
import { calculateMostActiveDay } from "../analytics";

const ProductiveDays = ({ drafts }: { drafts: { [key: string]: { createdAt: string; updatedAt: string } } }) => {
  const [mostActiveDay, setMostActiveDay] = useState<string>("");
  const [barChartData, setBarChartData] = useState({
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Notes Taken",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Run the effect only if drafts have changed
    if (drafts && Object.keys(drafts).length > 0) {
      const { mostActiveDay, dayCount } = calculateMostActiveDay(drafts);

      // Update only if the most active day has changed
      if (mostActiveDay !== mostActiveDay) {
        setMostActiveDay(mostActiveDay);
      }

      // Update the bar chart data only if the day count has changed
      setBarChartData((prevData) => {
        const newData = Object.values(dayCount);
        const prevDataValues = prevData.datasets[0].data;

        // Only update the state if the new data is different from the previous one
        if (JSON.stringify(newData) !== JSON.stringify(prevDataValues)) {
          return {
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          };
        }
        return prevData;
      });
    }
  }, [drafts]); // Add drafts as a dependency so the effect runs whenever drafts change

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        display: false, // Hide legend since we have title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Notes Count",
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Day of the Week",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
      <div className="h-64">
        <ChartCard
          title={`Weekly Notes Taken - Most Active Day: ${mostActiveDay}`}
          type="bar"
          data={barChartData}
          options={barChartOptions}
        />
      </div>
    </div>
  );
};

export default ProductiveDays;
