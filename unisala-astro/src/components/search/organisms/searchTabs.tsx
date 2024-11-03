import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { SidebarTopics } from '../molecules/sidebar/sideBarTopics';
import { SidebarUsers } from '../molecules/sidebar/sideBarUser';
import { cn } from '@/utils/lib/utils';
import { UserCard, type User } from '../molecules/cards/userCard';
import { PostCard, type Post } from '../molecules/cards/postCard';
import { TopicCard, type Topic } from '../molecules/cards/topicCard';


interface SearchTabsProps {
    loading?: boolean;
    posts: Post[];
    users: User[];
    topics: Topic[];
  }
  
  export const SearchTabs = ({ loading, posts, users, topics }: SearchTabsProps) => {
    const tabs = [
      { value: 'stories', label: 'Stories', items: posts },
      { value: 'people', label: 'People', items: users },
      { value: 'topics', label: 'Topics', items: topics },
      { value: 'publications', label: 'Publications', items: [] },
      { value: 'lists', label: 'Lists', items: [] }
    ];
  
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      );
    }
  
    return (
      <Tabs.Root defaultValue="stories" className="w-full">
        <ScrollArea.Root className="w-full" type="scroll">
          <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-8 overflow-x-auto">
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
        </ScrollArea.Root>
  
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <ScrollArea.Root className="h-[calc(100vh-350px)] sm:h-[calc(100vh-400px)]">
              <ScrollArea.Viewport className="h-full w-full">
                <Tabs.Content value="stories" className="space-y-4">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                  {posts.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No stories found
                    </div>
                  )}
                </Tabs.Content>
  
                <Tabs.Content value="people" className="space-y-4">
                  {users.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                  {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No people found
                    </div>
                  )}
                </Tabs.Content>
  
                <Tabs.Content value="topics">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topics.map(topic => (
                      <TopicCard key={topic.id} topic={topic} />
                    ))}
                  </div>
                  {topics.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No topics found
                    </div>
                  )}
                </Tabs.Content>
  
                <Tabs.Content value="publications" className="space-y-4">
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Publications coming soon
                  </div>
                </Tabs.Content>
  
                <Tabs.Content value="lists" className="space-y-4">
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Lists coming soon
                  </div>
                </Tabs.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar 
                orientation="vertical"
                className="flex select-none touch-none p-0.5 bg-gray-100 dark:bg-gray-800 transition-colors duration-150 ease-out hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <ScrollArea.Thumb className="flex-1 bg-gray-300 dark:bg-gray-600 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
  
          {/* Sidebar - Hidden on mobile, shown at lg breakpoint */}
          <div className="hidden lg:block space-y-6">
            <SidebarTopics topics={topics.slice(0, 5)} />
            <SidebarUsers users={users.slice(0, 5)} />
          </div>
  
          {/* Mobile-only bottom section for sidebar content */}
          <div className="lg:hidden space-y-4">
            <SidebarTopics topics={topics.slice(0, 3)} />
            <SidebarUsers users={users.slice(0, 3)} />
          </div>
        </div>
      </Tabs.Root>
    );
  };