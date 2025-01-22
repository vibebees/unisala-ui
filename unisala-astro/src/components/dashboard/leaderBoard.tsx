import React from "react";

interface LeaderboardProps {
  title: string;
  data: { user: string; value: string | number }[];
  metric: string; // e.g., "WPM", "Notes Shared"
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, data, metric }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {data.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                {index + 1}.
              </span>
              <span>{entry.user}</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
              {entry.value} {metric}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
