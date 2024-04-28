import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  IonAlert,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { Post } from "./Post"; // Assuming this is the right import for your Post component
import { University } from "./University";
import { SuggestedSpace } from "./SuggestedSpace";
import { getNewsFeed, getUserGql } from "../../../datasource/graphql/user";
import { FeedSkeleton } from "../skeleton/feedSkeleton";
import { Event } from "../events";
import { ApiError } from "../errorHandler/ApiError";
import { userName } from "../../../utils/cache";
import { USER_SERVICE_GQL } from "../../../datasource/servers/types";
import { Card } from "../../defaults";
import { unstable_batchedUpdates } from "react-dom";

const NoContentCard = () => (
  <div className="flex flex-col items-center justify-center p-8 md:p-12 m-4 bg-white rounded-lg shadow-lg h-52 md:h-64 border border-gray-200">
    <span className="text-5xl md:text-6xl">📭</span>
    <p className="text-gray-800 text-md md:text-lg mt-4">
      No content on this page
    </p>
  </div>
);

interface FeedProps {
  feedType: string;
  feedId?: string;
}

interface Post {
  _id?: string;
  type: "post" | "event" | "university" | "suggestedSpace" | "suggestedOrgs";
  event?: any;
  suggestedSpace?: { spaces: any[] };
  suggestedOrgs?: { spaces: any[] };
}
const InfiniteFeed: React.FC<FeedProps> = ({ feedType, feedId }) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchedPages = useRef(new Set()); // To track fetched pages
  const { data, loading, fetchMore, error } = useQuery(getNewsFeed, {
    variables: { feedQuery: { feedType, feedId, page } },
    context: { server: USER_SERVICE_GQL },
  });

  useEffect(() => {
    if (data?.fetchFeedV2?.data && !fetchedPages.current.has(page)) {
      setPosts((currentPosts) => [...currentPosts, ...data.fetchFeedV2.data]);
      fetchedPages.current.add(page); // Mark this page number as fetched
    }
  }, [data?.fetchFeedV2?.data, page]);
  console.log(posts?.length, "posts");
  const loadMore = async (event: CustomEvent<void>) => {
    const nextPage = page + 1;
    if (fetchedPages.current.has(nextPage)) {
      event?.target?.complete(); // Complete the event if the page has already been fetched
      return;
    }

    try {
      const result = await fetchMore({
        variables: { feedQuery: { page: nextPage, feedId, feedType } },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            fetchFeedV2: {
              ...prev?.fetchFeedV2,
              data: [
                ...prev?.fetchFeedV2?.data,
                ...fetchMoreResult?.fetchFeedV2?.data,
              ],
            },
          };
        },
      });
      if (result.data.fetchFeedV2.data.length > 0) {
        setPage(nextPage); // Only update the page if new data was fetched
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    event?.target?.complete(); // Ensure the IonInfiniteScroll is reset
  };

  if (error) return <ApiError />;
  if (loading && posts.length === 0) return <FeedSkeleton />;
  if (posts.length === 0) return <NoContentCard />;

  return (
    <div>
      {posts.map((post, index) => (
        <div key={`${post._id}-${index}`} className="mt-5">
          {post.type === "event" && <Event event={post.event} />}
          {post.type === "post" && (
            <Post
              post={post}
              index={index}
              feedType={feedType}
              feedId={feedId}
            />
          )}
          {post.type === "university" && (
            <University studyLevel={post.studyLevel} post={post} />
          )}
          {post.type === "suggestedSpace" && (
            <SuggestedSpace spaces={post.suggestedSpace.spaces} />
          )}
          {post.type === "suggestedOrgs" && (
            <SuggestedSpace spaces={post.suggestedOrgs.spaces} />
          )}
        </div>
      ))}
      <IonInfiniteScroll threshold="50px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  );
};

export default InfiniteFeed;
