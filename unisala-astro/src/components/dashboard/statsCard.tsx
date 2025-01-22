import React from "react";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
}> = ({ title, value, subtitle }) => {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
      {subtitle && (
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</span>
      )}
    </div>
  );
};

export default StatCard;
