 
// src/components/search/templates/SearchTemplate.tsx
import { useCallback, useEffect, useState } from 'react';
import { useAstroQuery } from "@/datasource/apollo-client";
import { Search } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { debounce } from '@/utils/analytics/events';
import { SearchInput } from '../atoms/searchInput';
import { SearchTabs } from '../organisms/searchTabs';

export const SearchTemplate = ({ initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const performSearch = useCallback(async (query: string) => {
    // Update the URL
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  }, []);

  // Create a debounced version of the search function
  const debouncedSearch = useCallback(
    debounce(performSearch, 300),
    []
  );

  const { loading, error, data } = useAstroQuery(Search, {
    variables: { q: searchQuery, post: true },
    context: { server: USER_SERVICE_GQL },
    skip: searchQuery.length < 3,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  }, [debouncedSearch]);

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
      {searchQuery && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Results for <span className="text-primary-600 dark:text-primary-400">{searchQuery}</span>
          </h2>
        </div>
      )}

      {/* Search Results */}
      <SearchTabs
        loading={loading}
        posts={data?.search?.posts || []}
        users={data?.search?.users || []}
        topics={data?.search?.topics || []}
      />

      {error && (
        <div className="text-red-500 dark:text-red-400 p-4 text-center">
          {error.message}
        </div>
      )}
    </div>
  );
};