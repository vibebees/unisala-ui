import React, { useState, useEffect, useRef } from 'react';
import { ArticleCard } from './articlecard';
import type { IPost } from '@/types/post';

const MediumStyleFeed = ({ articles }: { articles: IPost[] | [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: Node | null; }) => {
      if (suggestionsRef.current && (suggestionsRef.current as HTMLElement).contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filteredSuggestions = articles
        .filter(article => 
          article.title.toLowerCase().includes(value.toLowerCase()) ||
          article.postText.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);  // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (article: IPost) => {
    setSearchQuery(article.title);
    setShowSuggestions(false);
    // Navigate to the article or update the feed as needed
    console.log('Selected article:', article);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In Astro, we'll use a regular form submission to navigate
    window.location.href = `/universe/search?search=${encodeURIComponent(searchQuery)}`;
  };

  const filteredArticles = articles.filter((article) =>
    article?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article?.postText?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <div className="mb-8 relative">
        {/* <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form> */}
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((article, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(article)}
              >
                {article?.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-8">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default MediumStyleFeed;