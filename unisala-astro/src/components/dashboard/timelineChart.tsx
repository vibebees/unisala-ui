import React from "react";

interface TimelineEvent {
  milestone: string;
  date: string;
}

interface TimelineChartProps {
  title: string;
  data: TimelineEvent[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ title, data }) => {
  return (
    <div className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-4">
        {data.map((event, index) => (
          <li key={index} className="flex items-start space-x-4">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                {event.milestone}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineChart;
