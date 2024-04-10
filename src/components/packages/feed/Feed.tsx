import React from "react"
import { useQuery } from "@apollo/client"
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent} from "@ionic/react"
import {Event} from "../events"
import {getNewsFeed, getUserGql} from "../../../datasource/graphql/user"
import {useState} from "react"
import {useSelector} from "react-redux"
import {USER_SERVICE_GQL} from "../../../datasource/servers/types"
import {FeedSkeleton} from "../skeleton/feedSkeleton"
import { Post } from "./Post"
import { University } from "./University"
import { SuggestedSpace } from "./SuggestedSpace"

const InfiniteFeed = ({ allProps, feedType, feedId }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { data: userInfoData } = useQuery(getUserGql, {
    variables: {
      username: user?.username
    },
    context: {
      server: USER_SERVICE_GQL
    }
  })

  const [page, setPage] = useState(0)
  const { data, loading, fetchMore } = useQuery(getNewsFeed, {
    variables: {
      feedQuery: {
        feedType,
        feedId,
        page: 0
      }
    },
    context: { server: USER_SERVICE_GQL }
  })

  const Posts = data?.fetchFeedV2?.data

  if (!Posts && loading) {
    return <FeedSkeleton />
  }

  const loadMore = (e) => {
    setPage((prev) => prev + 1)
    fetchMore({
      variables: {
        feedQuery: {
          page: page + 1,
          feedId,
          feedType
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          fetchFeedV2: {
            ...prev?.fetchFeedV2,
            data: [
              ...(prev?.fetchFeedV2?.data || []),
              ...(fetchMoreResult?.fetchFeedV2?.data || [])
            ]
          }
        }
      }
    })
    setTimeout(() => {
      e.target.complete()
    }, 1000)
  }

  const events = Posts?.filter(
    (post) =>
      post.type === "event" && post.event !== null && post.event !== undefined
  )?.map((post) => post.event)
  return (
    <div>
      <Event events={events} />

      {Posts?.map((post, index) => {
        const keyBase = `post-${index}`
        return (
          <div className="mt-5" key={post._id || keyBase}>
            {post.type === "post" && (
              <Post
                post={post}
                index={index}
                allProps={allProps}
                feedType={feedType}
                feedId={feedId}
              />
            )}
            {post.type === "university" && (
              <University
                studyLevel={userInfoData?.getUser?.user?.studyLevel}
                post={post}
                key={`university-${keyBase}`}
              />
            )}
            {post.type === "suggestedSpace" && (
              <SuggestedSpace
                data={post?.suggestedSpace?.spaces}
                post={post}
                title={"Suggested Space"}
                key={`suggestedSpace-${keyBase}`}
                type="space"
              />
            )}
            {post.type === "suggestedOrgs" && (
              <SuggestedSpace
                data={post?.suggestedOrgs?.spaces}
                post={post}
                title={"Suggested Orgs"}
                key={`suggestedOrgs-${keyBase}`}
                type="org"
              />
            )}
          </div>
        )
      })}
      <IonInfiniteScroll threshold="50px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  )
}

export default InfiniteFeed
