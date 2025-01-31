import React from 'react';
import { extractHeading, threadPointer } from '@/utils/lib/utils';
import linkifyHtml from 'linkify-html';
import { transformToUrlFriendly } from '@/utils/lib/URLupdate';
import { ArticleCard } from "./articlecard";
import type { IPost } from "@/types/post";

interface FeedProps {
  articles: IPost[];
  staffPicks?: IPost[];
  topics?: { name: string; _id: string }[];
  title?: string;
  id?: string;
  showStaffPicks?: boolean;
  showTopics?: boolean;
  showImage?: boolean;
  images?: string[];
}

const StaffPick: React.FC<{ article: IPost }> = ({ article }) => (
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

const TopicBadge: React.FC<{ topic: string; id: string }> = ({ topic, id }) => (
  <a
    href={`/universe/tags/${transformToUrlFriendly(topic, id)}`}
    data-astro-reload
    className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition duration-300 ease-in-out"
  >
    <span className="font-medium">#</span>{topic}
  </a>
);

const ConfigurableFeed: React.FC<FeedProps> = ({
  articles,
  staffPicks = [],
  topics = [],
  title = "",
  id = "",
  showStaffPicks = true,
  showTopics = true,
  showImage = true,
  images = []
}) => {

  const randomImage = images.length > 0 ? images[Math.floor(Math.random() * images.length)] : null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="font-signature text-center italic text-xl lg:text-3xl text-black dark:text-white tracking-wide border-b-2 border-indigo-300 dark:border-gray-600 pb-2 mb-4 shadow-sm">
        #{title}
      </h1>
      {showImage && randomImage && (
        <img src={randomImage} alt={`${title} unisala image`} className="w-full mb-4" />
      )}
      <div className="flex flex-col md:flex-row">
        <div className={`w-full ${(showStaffPicks || showTopics) ? 'lg:w-3/4 lg:pr-8' : ''}`}>
          {articles?.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
        {(showStaffPicks || showTopics) && (
          <div className="md:w-1/4">
            {showStaffPicks && staffPicks.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Staff Picks</h2>
                {staffPicks.map((pick, index) => (
                  <StaffPick key={index} article={pick} />
                ))}
              </div>
            )}
            {showTopics && topics.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4">Recommended topics</h2>
                <div className="flex flex-wrap">
                  {topics.map((topic, index) => (
                    <TopicBadge key={index} topic={topic.name} id={topic._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurableFeed;