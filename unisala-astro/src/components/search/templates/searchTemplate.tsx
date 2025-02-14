import { useCallback, useEffect, useState } from 'react';
import { useAstroQuery } from "@/datasource/apollo-client";
import { Search } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { SearchInput } from '../atoms/searchInput';
import { SearchTabs } from '../organisms/searchTabs';

// Strict debounce function
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const SearchTemplate = ({ initialQuery = 'popular' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000); // 1 second debounce

  // Update URL when debounced query changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (debouncedSearchQuery) {
      url.searchParams.set('q', debouncedSearchQuery);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  }, [debouncedSearchQuery]);

  // Only make API call with debounced value
  const { loading, error, data } = useAstroQuery(Search, {
    variables: { q: debouncedSearchQuery, post: true },
    context: { server: USER_SERVICE_GQL },
    skip: debouncedSearchQuery.length < 3,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      {/* Hero Section with Search */}
      <div className="py-8">
        <div className="relative w-full h-64 bg-purple-50 dark:bg-gray-800 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 flex items-center justify-center flex-col space-y-6 p-4">
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Unisala..."
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      {debouncedSearchQuery && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Results for <span className="text-primary-600 dark:text-primary-400">{debouncedSearchQuery}</span>
          </h2>
        </div>
      )}

      {/* Search Results */}
      <SearchTabs
        loading={loading}
        posts={data?.search?.posts || []}
        users={data?.search?.users || []}
        spaces={data?.search?.spaces || []}
      />

      {error && (
        <div className="text-red-500 dark:text-red-400 p-4 text-center">
          {error.message}
        </div>
      )}
    </div>
  );
};