import { SearchTemplate } from "./templates/searchTemplate";

export interface SearchProps {
    initialQuery?: string;
  }
  
  // Export main component with proper typing
  export default function Search({ initialQuery = '' }: SearchProps) {
    return <SearchTemplate initialQuery={initialQuery} />;
  }