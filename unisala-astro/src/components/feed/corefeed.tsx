import React, { useState } from 'react';
import { formatDate } from '@/utils/date';
import { extractImageFromPostText } from '@/utils/lib/image';
import { calculateReadTime, threadPointer } from '@/utils/lib/utils';
import type { IPost } from '@/types/post';

const ArticleCard = ({ article }) => {
  const imageUrl = extractImageFromPostText({ user: false, postText: article.postText });
  const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

  const title = article?.title ? stripHtml(article.title) : '';
  const postText = stripHtml(article?.postText || '');

  const displayTitle = title || postText.substring(0, 100);
  const displayBody = title ? postText.substring(0, 160) : postText.substring(0, 160);
  return (
    <div className="py-8 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <img
          className="w-8 h-8 rounded-full mr-2"
          src={`https://api.multiavatar.com/${article?.user?.firstName}.svg`}
          alt="Author avatar"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">{article?.user?.firstName} {article?.user?.lastName}</span>
        <span className="mx-2 text-gray-500">·</span>
        <span className="text-sm text-gray-500">{article?.date ? formatDate(article.date) : 'No Date'}</span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="md:pr-8 md:w-2/3">
          <a
            href={'/' + threadPointer(article)}
            className="text-xl font-bold text-gray-900 hover:underline dark:text-white mb-2 block"
            data-astro-reload
          >
            {displayTitle}
          </a>
          {displayBody && (
            <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
              {displayBody}{displayBody.length === 160 && '...'}
            </p>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <span>{calculateReadTime(article.postText) || 'few min read'}</span>
            <span className="mx-2">·</span>
            <span>{article?.postTags?.tagType || 'General'}</span>
          </div>
        </div>
        {imageUrl && (
          <div className="md:w-1/3 mt-4 md:mt-0">
            <img
              className="w-full h-32 object-cover rounded"
              src={imageUrl}
              alt="Article cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MediumStyleFeed = ({ articles = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('-------> searchQuery', searchQuery);
  };

  const filteredArticles = articles.filter((article) =>
    article?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article?.postText?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      {/* <div className="mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}
      <div className="space-y-8">
        {filteredArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default MediumStyleFeed;