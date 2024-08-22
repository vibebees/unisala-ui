import React, { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./articlecard";
import type { IPost } from "@/types/post";

const MediumStyleFeed = ({ articles, title = " Recommended articles" }: { articles: IPost[], title:string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const handleSuggestionClick = (article: IPost) => {
    setSearchQuery(article.title);
    setShowSuggestions(false);
    // Navigate to the article or update the feed as needed
    console.log("Selected article:", article);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    // In Astro, we'll use a regular form submission to navigate
    window.location.href = `/universe/search?search=${encodeURIComponent(
      searchQuery
    )}`;
  };

  const filteredArticles = articles.filter(
    (article) =>
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
        <h1 className="font-bold text-xl lg:text-2xl text-neutral">
         {title}
        </h1>
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10   w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            {suggestions.map((article: IPost, index) => (
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
      <div className="">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default MediumStyleFeed;
