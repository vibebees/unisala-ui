import React from 'react';
import { format } from 'date-fns';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CoreFeed } from './corefeed';
import { extractHeading, threadPointer } from '@/utils/lib/utils';
import linkifyHtml from 'linkify-html';
const ArticleCard = ({ article }) => (
  <div className="mb-6 p-4 bg-white rounded-lg shadow">
    <div className="flex items-center mb-2">
      <Avatar.Root className="inline-flex h-8 w-8 rounded-full">
        <Avatar.Image
          className="h-full w-full object-cover rounded-full"
          src={article?.user?.picture || "/default-avatar.png"}
          alt={article?.user?.firstName}
        />
        <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-gray-300 text-sm font-medium uppercase text-gray-800 rounded-full">
          {article?.user?.firstName[0]}
        </Avatar.Fallback>
      </Avatar.Root>
      <span className="ml-2 text-sm font-medium">{article?.user?.firstName} {article?.user?.lastName}</span>
      {article?.publication && <span className="text-sm text-gray-500 ml-1">in {article?.publication}</span>}
    </div>
    <h2 className="text-xl font-bold mb-1">{article.title}</h2>
    <p className="text-gray-600 mb-2 line-clamp-2">{article.subtitle}</p>
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>{format(new Date(article.date), 'MMM d')} · {article.readTime} min read</span>
      <div className="flex items-center">
        <span className="mr-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{article.topic}</span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="min-w-[220px] bg-white rounded-md shadow-lg p-1">
            <DropdownMenu.Item className="text-sm px-2 py-1 hover:bg-gray-100 rounded">
              Save
            </DropdownMenu.Item>
            <DropdownMenu.Item className="text-sm px-2 py-1 hover:bg-gray-100 rounded">
              Hide this story
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>
);

const StaffPick = ({ article }) => (
  <div className="flex items-start mb-4">
    <Avatar.Root className="inline-flex h-6 w-6 rounded-full">
      <Avatar.Image
        className="h-full w-full object-cover rounded-full"
        src={article.user.picture || "/default-avatar.png"}
        alt={article.user.firstName}
      />
      <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-gray-300 text-xs font-medium uppercase text-gray-800 rounded-full">
        {article.user.firstName[0]}
      </Avatar.Fallback>
    </Avatar.Root>
    <div className="ml-3">
      <a href={'/'+ threadPointer(article)}>
      <h3 className="text-sm font-medium">{linkifyHtml(extractHeading(article?.title?? article?.postText))}</h3>
      <p className="text-xs text-gray-500">{article.user.firstName} {article.user.lastName}</p>
    </a>
    </div>
  </div>
);

const TopicBadge = ({ topic }) => (
  <span className="mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{topic}</span>
);

const MediumFeed = ({ articles, staffPicks, topics }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 md:pr-8">

          <CoreFeed articles={ articles} />
        </div>
        <div className="md:w-1/4">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Staff Picks</h2>
            {staffPicks.map((pick, index) => (
              <StaffPick key={index} article={pick} />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Recommended topics</h2>
            <div className="flex flex-wrap">
              {topics.map((topic, index) => (
                <a href={'/universe/tags/' + topic?._id}>
                  <TopicBadge key={index} topic={topic?.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumFeed;