import React from "react";

interface SuggestionsListProps {
  suggestions: string[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Personalized Suggestions
      </h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            • {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;
