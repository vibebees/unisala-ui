import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import { University } from "./University";
import { SuggestedSpace } from "./SuggestedSpace";
import { getNewsFeed } from "../../../datasource/graphql/user";
import { FeedSkeleton } from "../skeleton/feedSkeleton";
import { Event } from "../events";
import { ApiError } from "../errorHandler/ApiError";
import { USER_SERVICE_GQL } from "../../../datasource/servers/types";
import { motion } from "framer-motion";
import Thread from "../thread";
import { FetchFeedV2Query } from "src/types/gqlTypes/graphql";

const NoContentCard = () => (
  <div className="flex flex-col items-center justify-center p-8 md:p-12 m-4 bg-white rounded-lg BorderCard h-52 md:h-64 border border-gray-200">
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

const InfiniteFeed: React.FC<FeedProps> = ({ feedType, feedId }) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const fetchedPages = useRef(new Set()); // To track fetched pages
  const { data, loading, fetchMore, error } = useQuery<FetchFeedV2Query>(
    getNewsFeed,
    {
      variables: { feedQuery: { feedType, feedId, page } },
      context: { server: USER_SERVICE_GQL },
    }
  );

  useEffect(() => {
    if (data?.fetchFeedV2?.data && !fetchedPages.current.has(page)) {
      setPosts((currentPosts) => {
        if (!currentPosts) return data.fetchFeedV2?.data as unknown as IPost[];
        return [
          ...currentPosts,
          ...(data?.fetchFeedV2?.data as unknown as IPost[]),
        ];
      });
      fetchedPages.current.add(page); // Mark this page number as fetched
    }
  }, [data?.fetchFeedV2?.data, page]);

  const loadMore = async (event: any) => {
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
                // eslint-disable-next-line no-unsafe-optional-chaining
                ...(prev?.fetchFeedV2?.data || []),
                // eslint-disable-next-line no-unsafe-optional-chaining
                ...(fetchMoreResult?.fetchFeedV2?.data || []),
              ],
            },
          };
        },
      });
      if (
        result?.data?.fetchFeedV2 &&
        result.data.fetchFeedV2.data &&
        result.data.fetchFeedV2.data.length > 0
      ) {
        setPage(nextPage); // Only update the page if new data was fetched
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    event?.target?.complete(); // Ensure the IonInfiniteScroll is reset
  };

  console.log("error", error);

  if (error && !loading) return <ApiError />;
  if (loading && !posts) return <FeedSkeleton />;
  if (!loading && posts && posts?.length == 0) return <NoContentCard />;

  return (
    <div>
      {posts &&
        posts.map((post, index) => (
          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={`${post._id}-${index}`}
          >
            {post.type === "event" && <Event event={post.event} />}
            {post.type === "post" && (
              <Thread thread={post} feedId={feedId} feedType={feedType} />
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
          </motion.div>
        ))}
      <IonInfiniteScroll threshold="50px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  );
};

export default InfiniteFeed;
