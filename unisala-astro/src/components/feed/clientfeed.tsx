import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Avatar from '@radix-ui/react-avatar';
import { Search as SearchIcon } from 'lucide-react';
import { useAstroQuery } from "@/datasource/apollo-client";
import { Search } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { useEffect, useState } from "react";
import { cn } from '@/utils/lib/utils';

const SearchResult = () => {
  const tabs = [
    { value: 'stories', label: 'Stories' },
    { value: 'people', label: 'People' },
    { value: 'publications', label: 'Publications' },
    { value: 'topics', label: 'Topics' },
    { value: 'lists', label: 'Lists' }
  ];

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  }

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  });
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { loading, error, data } = useAstroQuery(Search, {
    variables: { q: debouncedSearchQuery, post: true },
    context: { server: USER_SERVICE_GQL },
    skip: debouncedSearchQuery.length < 3,
  });

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      {/* Hero Section with Search */}
      <div className="py-8">
        <div className="relative w-full h-64 bg-purple-50 dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 flex items-center justify-center flex-col space-y-6 p-4">
            <h1 className="text-4xl font-bold text-center dark:text-white">
              Search Unisala
            </h1>
            <div className="w-full max-w-2xl">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="search"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-4 pl-12 pr-4 text-base text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                  placeholder="Search Unisala..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Results for <span className="text-primary-600 dark:text-primary-400">{searchQuery}</span>
        </h2>
      </div>

      {/* Tabs Navigation */}
      <Tabs.Root defaultValue="stories" className="w-full">
        <ScrollArea.Root className="w-full" type="scroll">
          <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  "hover:text-primary-600 dark:hover:text-primary-400",
                  "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400",
                  "data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-400",
                )}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </ScrollArea.Root>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
              </div>
            )}
            
            {error && (
              <div className="text-red-500 dark:text-red-400 py-8 text-center">
                {error.message}
              </div>
            )}

            {!loading && !error && data?.search?.items && (
              <ScrollArea.Root className="h-[calc(100vh-400px)]">
                <ScrollArea.Viewport className="h-full w-full">
                  <div className="space-y-4">
                    {data.search.items.map((item: any) => (
                      <div 
                        key={item._id} 
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Avatar.Root className="flex-shrink-0">
                          <Avatar.Image
                            src={item.picture || `https://api.multiavatar.com/${item.name}.svg`}
                            alt={item.name}
                            className="h-12 w-12 rounded-full"
                          />
                          <Avatar.Fallback className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {item.name?.[0]?.toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          {item.type && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                              {item.type}
                            </p>
                          )}
                          <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {item.type === 'user' ? 'Follow' : 'View'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Topics Section */}
            {data?.search?.spaces && data.search.spaces.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                  Topics matching {searchQuery}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.search.spaces.map((space: any) => (
                    <button
                      key={space.name}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      {space.name}
                    </button>
                  ))}
                </div>
                <button className="mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                  See all
                </button>
              </div>
            )}

            {/* People Section */}
            {data?.search?.users && data.search.users.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                  People matching {searchQuery}
                </h3>
                <div className="space-y-4">
                  {data.search.users.map((user: any) => (
                    <div key={user.username} className="flex items-center gap-3">
                      <Avatar.Root>
                        <Avatar.Image
                          src={user.picture || `https://api.multiavatar.com/${user.name}.svg`}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <Avatar.Fallback className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {user.name?.[0]?.toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      </div>
                      <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
                  See all
                </button>
              </div>
            )}
          </div>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default SearchResult;