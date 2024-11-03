import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { cn } from '@/utils/lib/utils';
import type { IPost } from "@/types/post";
import { UserCard, type User } from '../molecules/cards/userCard';
import { PostCard } from '../molecules/cards/postCard';
import { SpaceCard, type SpaceCategory } from '../molecules/cards/spaceCard';

interface SearchTabsProps {
    loading?: boolean;
    posts: IPost[];
    users: User[];
    spaces: SpaceCategory[];
}
  
export const SearchTabs = ({ loading, posts, users, spaces }: SearchTabsProps) => {
  const tabs = [
    { value: 'stories', label: 'Stories', items: posts },
    { value: 'people', label: 'People', items: users },
    { value: 'spaces', label: 'Spaces', items: spaces },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <Tabs.Root defaultValue="stories" className="w-full max-w-screen-2xl mx-auto">
      <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-8 overflow-x-auto px-4 md:px-6">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "px-3 sm:px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              "hover:text-primary-600 dark:hover:text-primary-400",
              "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
            )}
          >
            {tab.label}
            {tab.items.length > 0 && (
              <span className="ml-1 sm:ml-2 text-xs text-gray-500">
                ({tab.items.length})
              </span>
            )}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
  
      <div className="px-4 md:px-6">
        <Tabs.Content value="stories" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No stories found
            </div>
          )}
        </Tabs.Content>
  
        <Tabs.Content value="people" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
            {users.map(user => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No people found
            </div>
          )}
        </Tabs.Content>
  
        <Tabs.Content value="spaces">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
            {spaces.map(topic => (
              <SpaceCard key={topic.id} topic={topic} />
            ))}
          </div>
          {spaces.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No spaces found
            </div>
          )}
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
};