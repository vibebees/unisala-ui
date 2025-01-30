import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import { University } from "./University";
import SuggestedSpace from "./SuggestedSpace";
import { getNewsFeed } from "@datasource/graphql/user";
import { FeedSkeleton } from "../skeleton/feedSkeleton";
import Event from "../events";
import { ApiError } from "../errorHandler/ApiError";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { motion } from "framer-motion";
import Thread from "../thread";
import { FetchFeedV2Query } from "src/types/gqlTypes/graphql";

interface FeedProps {
  feedType: string;
  feedId?: string;
}

const InfiniteFeed: React.FC<FeedProps> = ({ feedType, feedId }) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const { data, loading, fetchMore, error } = useQuery<FetchFeedV2Query>(
    getNewsFeed,
    {
      variables: { feedQuery: { feedType, feedId, page } },
      context: { server: USER_SERVICE_GQL },
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data?.fetchFeedV2?.data) {
      console.log("new data arrived data", data?.fetchFeedV2?.data);
      setPosts((prevPosts) => {

        return data?.fetchFeedV2?.data
      });
    }
  }, [data?.fetchFeedV2?.data]);

  const [lastFetchedPage, setLastFetchedPage] = useState(0);

  const loadMore = async (event: any) => {
    const nextPage = lastFetchedPage + 1;

    try {
      const result = await fetchMore({
        variables: { feedQuery: { page: nextPage, feedId, feedType } },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            fetchFeedV2: {
              ...prev.fetchFeedV2,
              data: [
                ...(prev.fetchFeedV2.data || []),
                ...(fetchMoreResult.fetchFeedV2.data || []),
              ],
            },
          };
        },
      });
      if (
        result?.data?.fetchFeedV2 &&
        result.data.fetchFeedV2.data.length > 0
      ) {
        setLastFetchedPage(nextPage); // Update the last fetched page
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    event?.target?.complete();
  };

  if (error && !loading) return <ApiError />;
  if (loading && !posts) return <FeedSkeleton />;
  if (!loading && posts && posts?.length == 0) return <NoContentCard />;

  return (
    <div className="w-full">
      {posts?.map((post, index) => (
        <motion.div
          key={post._id ?? index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="first:mt-0 mt-3"
        >
          {post.type === "event" && <Event event={post.event} />}
          {post.type === "post" && (
            <Thread thread={post} feedId={feedId} feedType={feedType} />
          )}
          {post.type === "university" && <University post={post} />}
          {post.type === "suggestedSpace" && (
            <SuggestedSpace data={post?.suggestedSpace?.spaces} />
          )}
          {post.type === "suggestedOrgs" && (
            <SuggestedSpace data={post?.suggestedOrgs?.spaces} />
          )}
        </motion.div>
      ))}
      <IonInfiniteScroll threshold="50px" onIonInfinite={e => {
        loadMore(e);
      }}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  );
};

export default InfiniteFeed;

const NoContentCard = () => (
  <div className="flex flex-col items-center justify-center p-8 md:p-12 m-4 bg-white rounded-lg BorderCard h-52 md:h-64 border border-gray-200">
    <span className="text-5xl md:text-6xl">📭</span>
    <p className="text-gray-800 text-md md:text-lg mt-4">
      No content on this page
    </p>
  </div>
);
