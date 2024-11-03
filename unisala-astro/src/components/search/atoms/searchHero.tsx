import { SearchInput } from "./searchInput";

 
interface SearchHeroProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const SearchHero = ({ searchQuery, onSearch }: SearchHeroProps) => {
  return (
    <div className="relative w-full h-48 sm:h-64 bg-purple-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
      <div className="absolute inset-0 flex items-center justify-center flex-col space-y-4 sm:space-y-6 p-4">
        <div className="w-full max-w-[90%] sm:max-w-2xl">
          <SearchInput
            value={searchQuery}
            onChange={onSearch}
            placeholder="Search Unisala..."
          />
        </div>
      </div>
    </div>
  );
};
