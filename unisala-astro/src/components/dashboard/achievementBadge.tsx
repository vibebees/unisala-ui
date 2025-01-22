import React from "react";

// Define the available colors as a union type
type BadgeColor = 'orange' | 'blue' | 'green' | 'gray';

interface BadgeProps {
  color: BadgeColor;
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ color, label }) => {
  const colorClasses = {
    orange: "bg-orange-100 text-orange-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
  } as const;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]}`}
    >
      {label}
    </span>
  );
};

interface AchievementBadgeProps {
  title: string;
  description: string;
  badges: { label: string; color: BadgeColor }[];
  level?: number; // Gamified level
  progressStars?: number; // Number of stars
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  badges,
  level = 1,
  progressStars = 3,
}) => {
  return (
    <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative">
      {/* Gamified Banner */}
  
      {/* Header Section */}
      <div className="mb-4 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white flex items-center justify-center text-lg font-bold">
          {title[0]}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      {/* Gamified Level */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Level {level}
        </p>
        <div className="flex gap-1 mt-2">
          {[...Array(progressStars)].map((_, index) => (
            <span key={index} className="text-yellow-500 text-lg">
              ★
            </span>
          ))}
          {[...Array(5 - progressStars)].map((_, index) => (
            <span key={index} className="text-gray-300 text-lg">
              ☆
            </span>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex gap-2 flex-wrap">
        {badges.map((badge, index) => (
          <Badge key={index} color={badge.color} label={badge.label} />
        ))}
      </div>
    </div>
  );
};

export default AchievementBadge;