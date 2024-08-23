import React from 'react';
import { extractHeading, threadPointer } from '@/utils/lib/utils';
import linkifyHtml from 'linkify-html';
import CoreFeed from './corefeed';
import type { IPost } from '@/types/post';
import { transformToUrlFriendly } from '@/utils/lib/URLupdate';


const StaffPick = ({ article }: { article: IPost }) => (
  <div className="flex items-start mb-4">
    <img
      className="w-10 h-10 rounded-full mr-2"
      src={`https://api.multiavatar.com/` + article.user.firstName + `.svg`}
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


const TopicBadge = ({ topic, id }: { topic: string, id: string }) => (
  <a href={`/universe/tags/${transformToUrlFriendly(topic, id)}`} data-astro-reload
    className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition duration-300 ease-in-out"
  >
    <span className="font-medium">#</span>{topic}
  </a>
);

const MediumFeed = ({ articles, staffPicks, topics, title = "", id }: { articles: IPost[], staffPicks: IPost, topics: any, title:string, id:string }) => {
  return (
    <div className=" ">
      <div className="flex flex-col md:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-8">
          <CoreFeed articles={articles} title={title} id={id}/>
        </div>
        <div className="md:w-1/4">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Staff Picks</h2>
            {staffPicks?.map((pick: IPost, index: React.Key | null | undefined) => (
              <StaffPick key={index} article={pick} />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">Recommended topics</h2>
            <div className="flex flex-wrap">
              {topics.map((topic: { name: any; _id: any; }, index: React.Key | null | undefined) => (
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