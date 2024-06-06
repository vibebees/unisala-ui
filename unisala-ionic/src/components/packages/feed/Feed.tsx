import React, { useState, useEffect } from 'react';
import {
  InfiniteScroll,
  InfiniteScrollContent,
  Item,
  Label
} from '@components/defaults';
import { FetchFeedV2Query } from 'src/types/gqlTypes/graphql';
import { getNewsFeed } from '@datasource/graphql/user';
import { USER_SERVICE_GQL } from '@datasource/servers/types';
import { useQuery } from '@apollo/client';
import { ApiError } from '../errorHandler/ApiError';
import { FeedSkeleton } from '../skeleton/feedSkeleton';
import Thread from '../thread';
import { motion } from 'framer-motion';
import SuggestedSpace from './SuggestedSpace';
import { University } from './University';
import Event from '../events';
import { Spinner } from '@components/defaults';
import { NoContentCard } from '../NoContentCard';

function Example({ feedType, feedId }) {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [noContent, setNoContent] = useState(false);
  const { data, loading, fetchMore, error } = useQuery<FetchFeedV2Query>(
    getNewsFeed,
    {
      variables: { feedQuery: { feedType, feedId, page } },
      context: { server: USER_SERVICE_GQL }
    }
  );
  const [lastFetchedPage, setLastFetchedPage] = useState(0);

  useEffect(() => {
    if (data?.fetchFeedV2?.data) {
      setPosts(() => {
        return data?.fetchFeedV2?.data;
      });
    }
  }, [data]);

  const loadMorePost = async () => {
    if (noContent) return;
    const nextPage = lastFetchedPage + 1;
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
              ...(fetchMoreResult.fetchFeedV2.data || [])
            ]
          }
        };
      }
    });
    if (
      result?.data?.fetchFeedV2 &&
      result?.data?.fetchFeedV2?.data.length > 0
    ) {
      setLastFetchedPage(nextPage); // Update the last fetched page
    } else {
      setNoContent(true);
    }
  };

  if (error && !loading) return <ApiError />;
  if (loading && !posts) return <FeedSkeleton />;
  if (!loading && posts && posts?.length == 0) return <NoContentCard />;

  return (
    <div className='w-full'>
      {posts?.map((post, index) => (
        <motion.div
          key={post._id ?? index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='first:mt-0 mt-3'
        >
          {post.type === 'event' && <Event event={post.event} />}
          {post.type === 'post' && (
            <Thread thread={post} feedId={feedId} feedType={feedType} />
          )}
          {post.type === 'university' && <University post={post} />}
          {post.type === 'suggestedSpace' && (
            <SuggestedSpace data={post?.suggestedSpace?.spaces} />
          )}
          {post.type === 'suggestedOrgs' && (
            <SuggestedSpace data={post?.suggestedOrgs?.spaces} />
          )}
        </motion.div>
      ))}
      <InfiniteScroll
        onIonInfinite={(ev) => {
          loadMorePost();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <InfiniteScrollContent></InfiniteScrollContent>
      </InfiniteScroll>
    </div>
  );
}
export default Example;
