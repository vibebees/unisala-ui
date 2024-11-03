export interface Topic {
    id: string;
    name: string;
    description: string;
    followersCount: number;
    postsCount: number;
    image?: string;
  }
  interface TopicCardProps {
    topic: Topic;
  }
  
  export const TopicCard = ({ topic }: TopicCardProps) => (
    <div className="p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      {topic.image && (
        <div className="mb-3 relative h-24 sm:h-32 rounded-lg overflow-hidden">
          <img 
            src={topic.image} 
            alt={topic.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{topic.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {topic.description}
      </p>
      <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span>{topic.followersCount.toLocaleString()} followers</span>
        <span>·</span>
        <span>{topic.postsCount.toLocaleString()} posts</span>
      </div>
    </div>
  );