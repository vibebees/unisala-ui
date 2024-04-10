import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { IonAlert, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
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


const NoContentCard = () => (
<div className="flex flex-col items-center justify-center p-8 md:p-12 m-4 bg-white rounded-lg shadow-lg h-52 md:h-64 border border-gray-200">
  <span className="text-5xl md:text-6xl">📭</span>
  <p className="text-gray-800 text-md md:text-lg mt-4">
    No content on this page
  </p>
</div>

);




interface FeedProps {
  allProps: any;  // Define specific types based on usage
  feedType: string;
  feedId: string;
}

interface Post {
  _id?: string;
  type: 'post' | 'event' | 'university' | 'suggestedSpace' | 'suggestedOrgs';
  event?: any;  // Define specific event types
  suggestedSpace?: { spaces: any[] };  // Define space types
  suggestedOrgs?: { spaces: any[] };  // Define org types
}

const InfiniteFeed: React.FC<FeedProps> = ({ allProps, feedType, feedId }) => {

  const { data: userInfoData } = useQuery(getUserGql, {
    variables: { username: userName },
    context: { server: USER_SERVICE_GQL },
    skip: !userName,
    fetchPolicy: 'cache-first'
  });

  const [page, setPage] = useState(0);
  const { data, loading, fetchMore, error } = useQuery(getNewsFeed, {
    variables: { feedQuery: { feedType, feedId, page } },
    context: { server: "USER_SERVICE_GQL" }
  });
  if (error) return <ApiError/>

  const posts: Post[] = data?.fetchFeedV2?.data;

  if (loading && !posts) return <FeedSkeleton />;

  const loadMore = async (event: CustomEvent<void>) => {
    try {
      await fetchMore({
        variables: { feedQuery: { page: page + 1, feedId, feedType } },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            fetchFeedV2: {
              ...prev.fetchFeedV2,
              data: [...prev.fetchFeedV2.data, ...fetchMoreResult.fetchFeedV2.data]
            }
          });
        }
      });
      event?.detail?.complete();
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
    setPage(page + 1);
  };
  if (posts?.length === 0) {
    return <NoContentCard/>
  }
  return (
    <div>
      {posts?.map((post, index) => (
        <div className="mt-5" key={post._id || `post-${index}`}>
          {post.type === "event" &&  <Event events={post} />}
          {post.type === "post" && <Post post={post} index={index} allProps={allProps} feedType={feedType} feedId={feedId} />}
          {post.type === "university" && <University studyLevel={userInfoData?.getUser?.user?.studyLevel} post={post} />}
          {post.type === "suggestedSpace" && <SuggestedSpace data={post.suggestedSpace?.spaces} post={post} title="Suggested Space" type="space" />}
          {post.type === "suggestedOrgs" && <SuggestedSpace data={post.suggestedOrgs?.spaces} post={post} title="Suggested Orgs" type="org" />}
        </div>
      ))}

      <IonInfiniteScroll threshold="50px" onIonInfinite={(e: CustomEvent<void>) => loadMore(e)}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  );
};

export default InfiniteFeed;
