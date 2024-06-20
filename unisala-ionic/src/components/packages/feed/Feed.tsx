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
import { Chips } from '../chips';
import { getFeedChipValues, getQueryParams } from '@utils/lib/URLupdate';
import { useLocation } from 'react-router';

function Example({ feedType, feedId }) {

  const location = useLocation();
  const queryParams = getQueryParams(location.search);
  const filterParams = queryParams.getAll('f'); // Get all 'f' parameters as an array



  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [ noContent, setNoContent ] = useState(false);

  const { data, loading, fetchMore, error, refetch } = useQuery<FetchFeedV2Query>(
    getNewsFeed,
    {
      variables: {
        feedQuery: {
          feedType, feedId, page,
          filterByTags:  getFeedChipValues(filterParams)
        }
      },
      context: { server: USER_SERVICE_GQL }
    }
  );

  useEffect(() => {
    refetch({
      feedQuery: {
        feedType, feedId, filterByTags:  getFeedChipValues(filterParams), page: 0
      }
    }).then(result => {
      if (result?.data && result?.data?.fetchFeedV2?.data.length > 0) {
        setPosts(result?.data?.fetchFeedV2?.data);
        setNoContent(false);
      } else {
        setPosts([]);
        setNoContent(true);
      }
    });
  }, [filterParams.join(',')]); // Effect dependency on filterParams as a string


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
      <Chips />
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
