import type { SpaceCategory } from '../cards/spaceCard';

interface SidebarTopicsProps {
  topics: SpaceCategory[];
}

  export const SidebarTopics = ({ topics }: SidebarTopicsProps) => {
    if (!topics.length) return null;
  
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
        <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
          Popular Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic._id}
              className="px-2 sm:px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              {topic.name}
            </button>
          ))}
        </div>
        {topics.length > 5 && (
          <button className="mt-3 sm:mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
            See all
          </button>
        )}
      </div>
    );
  };
  