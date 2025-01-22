import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Typing Speed", value: "52 WPM", subtitle: "Keep up the great work!" },
    { title: "Note Streak", value: "14 Days", subtitle: "Your best streak yet!" },
    { title: "Weekly Notes", value: "5" },
    { title: "Average Notes Per Week", value: "3.5", subtitle: "Consistent Progress!" },
  ];

  const popularTopics = ["React", "Data Science", "GraphQL"];
  const badges = ["First Note", "5-Day Streak"];
  const suggestions = ["Learn about GraphQL Queries", "Improve your React Hooks usage", "Explore Data Visualization techniques"];

  const leaderboardData = [
    { user: "Alice", wpm: 70 },
    { user: "Bob", wpm: 65 },
    { user: "Charlie", wpm: 60 },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Time Spent (minutes)",
        data: [30, 45, 50, 20, 40, 35, 25],
        backgroundColor: "#4F46E5",
        borderRadius: 4,
      },
    ],
  };

  const leaderboard = leaderboardData.map((entry, index) => (
    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
      {index + 1}. {entry.user} - {entry.wpm} WPM
    </li>
  ));

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle || undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Popular Topics */}
        {popularTopics.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Popular Topics
            </h3>
            <ul className="space-y-2">
              {popularTopics.map((topic, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-400">
                  • {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {badges.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Achievements
            </h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 rounded-md">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Personalized Suggestions
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-400">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Trends Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Learning Trends
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Bar data={chartData} />
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Leaderboard - Typing Speed
        </h3>
        <ul className="space-y-2">
          {leaderboard}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
