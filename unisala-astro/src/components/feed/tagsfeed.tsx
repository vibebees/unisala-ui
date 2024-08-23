import React, { useState, useEffect, useRef } from "react";
import { ArticleCard } from "./articlecard";
import type { IPost } from "@/types/post";
import { EmptySpacePrompt } from "../ui/nocontent";
import { Search } from "lucide-react";
import { transformToUrlFriendly } from "@/utils/lib/URLupdate";
import { extractHeading, threadPointer } from "@/utils/lib/utils";
import linkifyHtml from "linkify-html";
import { DialogTitle } from "@radix-ui/react-dialog";



const images = [
    "https://i.ibb.co/Rz2S3kg/Screenshot-2024-08-23-at-3-46-20-PM.png",
"https://i.ibb.co/cNBfq71/Screenshot-2024-08-23-at-3-46-28-PM.png",
"https://i.ibb.co/3pSYmTj/Screenshot-2024-08-23-at-3-46-35-PM.png",
"https://i.ibb.co/nD4cbmV/Screenshot-2024-08-23-at-3-46-45-PM.png",
"https://i.ibb.co/HKmKqFn/Screenshot-2024-08-23-at-3-46-54-PM.png",
"https://i.ibb.co/vXFT8Jt/Screenshot-2024-08-23-at-3-47-10-PM.png",
"https://i.ibb.co/wSv5VWJ/Screenshot-2024-08-23-at-3-47-03-PM.png",
"https://i.ibb.co/5cYkYK7/Screenshot-2024-08-23-at-3-47-18-PM.png",
"https://i.ibb.co/8Ptrjc3/Screenshot-2024-08-23-at-3-47-24-PM.png",
"https://i.ibb.co/S0ZJKSx/Screenshot-2024-08-23-at-3-47-30-PM.png",
"https://i.ibb.co/4g6YvD5/Screenshot-2024-08-23-at-3-47-38-PM.png",
]
const TopicBadge = ({ topic, id }: { topic: string; id: string }) => (
    <a
      href={`/universe/tags/${transformToUrlFriendly(topic, id)}`}
      data-astro-reload
      className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition duration-300 ease-in-out"
    >
      <span className="font-medium">#</span>
      {topic}
    </a>
  );
  
  const StaffPick = ({ article }: { article: IPost }) => {
    const title = article?.title && article?.title.length > 2 ? article?.title : article?.postText;
    return (
      <div className="flex items-start mb-4">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={`https://api.multiavatar.com/` + article.user.firstName + `.svg`}
          alt="Author avatar"
        />
        <div className="ml-3">
          <a href={'/' + threadPointer(article)} data-astro-reload>
            <h3 className="text-sm font-medium">
              {linkifyHtml(extractHeading(title))}
              </h3>
            <p className="text-xs text-gray-500">{article.user.firstName} {article.user.lastName}</p>
          </a>
        </div>
      </div>
    );
  }
  
  
  const CoreFeed = ({ articles, title, id }: { articles: IPost[]; title: string; id: string }) => {
    if (articles.length === 0) {
      return (
        <div className="max-w-screen-md mx-auto px-4 py-8">
          <EmptySpacePrompt spaceName={title} id={id} />
        </div>
      );
    }
  
    //randomly select image from images array
    const image = images[Math.floor(Math.random() * images.length)];
    return (
      <div>
      <h1 className="font-signature text-center italic text-xl lg:text-3xl text-black dark:text-white tracking-wide border-b-2 border-indigo-300 dark:border-gray-600 pb-2 mb-4 shadow-sm">
           #{title}
      </h1>
            <img src={image}
                alt={title + "unisala image"}
            />
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    );
  };
  
  const MediumFeed = ({ articles, staffPicks, topics, title = "", id }: { articles: IPost[]; staffPicks: IPost[]; topics: any; title: string; id: string }) => {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full lg:w-3/4 lg:pr-8">
            <CoreFeed articles={articles} title={title} id={id} />
            

          </div>

          <div className="md:w-1/4">
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Staff Picks</h2>
              {staffPicks?.map((pick: IPost, index: number) => (
                <StaffPick key={index} article={pick} />
              ))}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Recommended topics</h2>
              <div className="flex flex-wrap">
                {topics.map((topic: { name: string; _id: string }, index: number) => (
                  <TopicBadge key={index} topic={topic?.name} id={topic?._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default MediumFeed;