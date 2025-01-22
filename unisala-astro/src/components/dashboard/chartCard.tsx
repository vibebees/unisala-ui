import React from "react";
import { Bar, Line } from "react-chartjs-2";

interface ChartCardProps {
  title: string;
  type: "bar" | "line";
  data: any;
  options: any;
  colors?: string[]; // Array of colors for datasets
  datasetNames?: string[]; // Array of names for datasets
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data, options, colors, datasetNames }) => {
  // Modify datasets dynamically based on passed props
  const modifiedData = {
    ...data,
    datasets: data.datasets.map((dataset: any, index: number) => ({
      ...dataset,
      backgroundColor: colors?.[index] || dataset.backgroundColor,
      borderColor: colors?.[index] || dataset.borderColor,
      label: datasetNames?.[index] || dataset.label,
    })),
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      {type === "bar" && <Bar data={modifiedData} options={options} />}
      {type === "line" && <Line data={modifiedData} options={options} />}
    </div>
  );
};

export default ChartCard;
