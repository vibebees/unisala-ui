import React from 'react';
import { format } from 'date-fns';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { extractHeading, threadPointer } from '@/utils/lib/utils';
import linkifyHtml from 'linkify-html';
import { Button } from '../ui/button';
import CoreFeed from './corefeed';


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
      <a href={'/' + threadPointer(article)} data-astro-reload>
        <h3 className="text-sm font-medium">{linkifyHtml(extractHeading(article?.title ?? article?.postText))}</h3>
        <p className="text-xs text-gray-500">{article.user.firstName} {article.user.lastName}</p>
      </a>
    </div>
  </div>
);

const TopicBadge = ({ topic, id }) => (
  <a href={`/universe/tags/${id}`} data-astro-reload
  className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition duration-300 ease-in-out"

  >
    <span className="font-medium">#</span>{topic}
    </a>
);

const MediumFeed = ({ articles, staffPicks, topics }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 md:pr-8">
        <CoreFeed articles={articles} />
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
                <TopicBadge
                  key={index}
                  topic={topic?.name}
                  id={topic?._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MediumFeed;