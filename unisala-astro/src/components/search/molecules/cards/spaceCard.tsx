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
    >
      <div className="px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
        <div className="flex items-center gap-2">
          <span className="text-lg text-primary-500 dark:text-primary-400">#</span>
          <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
            {topic.name}
          </h3>
        </div>
        
        {topic.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1 pl-6">
            {topic.description}
          </p>
        )}
      </div>
    </a>
  );
};
