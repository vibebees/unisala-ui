import React from "react";
import { Bar, Line } from "react-chartjs-2";

interface ChartCardProps {
  title: string;
  type: "bar" | "line";
  data: any;
  options: any;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data, options }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      {type === "bar" && <Bar data={data} options={options} />}
      {type === "line" && <Line data={data} options={options} />}
    </div>
  );
};

export default ChartCard;
