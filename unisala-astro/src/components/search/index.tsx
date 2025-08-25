import { SearchTemplate } from "./templates/searchTemplate";

export interface SearchProps {
    initialQuery?: string;
  }
  
  // Export main component with proper typing
  export default function Search({ initialQuery = 'popular' }: SearchProps) {
    const currentUrl = new URL(window.location.href);
    const query = currentUrl.searchParams.get('q') ||  initialQuery;

    return <SearchTemplate initialQuery={query} />;
  }