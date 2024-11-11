// components/feed/StaffPick.tsx
import React from 'react';
import { extractHeading, threadPointer } from '@/utils/lib/utils';
import linkifyHtml from 'linkify-html';
import type { IPost } from "@/types/post";

export const StaffPick: React.FC<{ article: IPost }> = ({ article }) => (
  <div className="flex items-start mb-4">
    <img
      className="w-10 h-10 rounded-full mr-2"
      src={`https://api.multiavatar.com/${article.user.firstName}.svg`}
      alt="Author avatar"
    />
    <div className="ml-3">
      <a href={'/' + threadPointer(article)} data-astro-reload>
        <h3 className="text-sm font-medium">{linkifyHtml(extractHeading(article?.title ?? article?.postText))}</h3>
        <p className="text-xs text-gray-500">{article.user.firstName} {article.user.lastName}</p>
      </a>
    </div>
  </div>
);

// components/feed/TopicBadge.tsx
import { transformToUrlFriendly } from '@/utils/lib/URLupdate';

export const TopicBadge: React.FC<{ topic: string; id: string }> = ({ topic, id }) => (
  <a
    href={`/universe/tags/${transformToUrlFriendly(topic, id)}`}
    data-astro-reload
    className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition duration-300 ease-in-out"
  >
    <span className="font-medium">#</span>{topic} 
  </a>
);

// components/feed/CoverImage.tsx
interface CoverImageProps {
  articles: IPost[];
  showImage: boolean;
  randomImage: string;
  title: string;
}

export const CoverImage: React.FC<CoverImageProps> = ({ 
  articles, 
  showImage, 
  randomImage,
  title 
}) => {
  if (!articles.length || !showImage || !randomImage) return null;

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <div className="relative w-full max-w-4xl mx-auto mb-8 group">
        {/* Main image with blur effect */}
        <div className="relative">
          <img
            src={randomImage}
            alt={`${title} unisala image`}
            className="w-full h-full object-contain min-h-[400px] filter transition-all duration-300"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 transition-all duration-300" />
        </div>
        
        {/* Centered subscription prompt */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
     
            <div className="inline-block">
              <SubscriptionPopup 
                courseName={title}
                spaceId=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// components/feed/NoArticleCard.tsx
import { EmptySpacePrompt } from "../ui/nocontent";
import SubscriptionPopup from '../newsletter/subscriptionPopUp';

export const NoArticleCard: React.FC<{ title: string; id: string }> = ({ title, id }) => (
  <div className="max-w-screen-md mx-auto px-4 py-8">
    <EmptySpacePrompt spaceName={title} id={id} />
  </div>
);