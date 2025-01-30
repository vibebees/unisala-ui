import React from 'react';

export interface SpaceCategory {
  _id: string;
  name?: string;
  description?: string;
}

interface SpaceCardProps {
  topic: SpaceCategory;
}

export const SpaceCard = ({ topic }: SpaceCardProps) => {
  const tagUrl = `/universe/tags/${topic.name?.toLowerCase().replace(/\s+/g, '-')}-${topic._id}`;

  return (
    <a 
      href={tagUrl}
      className="block group"
      data-astro-reload
    >
      <div className="px-4 py-3 rounded-lg bg-white dark:bg-gray-900 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-transparent hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
          #{topic.name}
          </h3>
        </div>
        
        {topic.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 line-clamp-1 pl-6">
            {topic.description}
          </p>
        )}
      </div>
    </a>
  );
};

export default SpaceCard;