import { useEffect, useState } from "react"
import {
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import { Link } from "react-router-dom"
import StateMessage from "component/stateMessage"
import emptyState from "assets/emptyState.png"
import { useSelector } from "react-redux"
import { Query } from "@apollo/client/react/components"
import { USER_SERVICE_GQL } from "servers/types"
import { GetUserPost } from "graphql/user/"
import Thread from "component/thread"
import CourseCard from "component/courseCard"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"

function index({ userId, firstName }) {
  return (
    <Query
      query={GetUserPost}
      variables={{ userId, page: 0 }}
      context={{ server: USER_SERVICE_GQL }}
    >
      {({ data, loading, fetchMore, refetch }) => {
        const { Posts } = data?.getDicussionUniWall || []
        const { totalPosts } = data?.getDicussionUniWall || 0
        const { user } = useSelector((state) => state.userProfile)
        const [page, setPage] = useState(0)

        if (!data?.getDicussionUniWall.length) {
          return (
            <IonCard className="max-md:mx-1">
              <StateMessage
                title={
                  user._id === userId
                    ? `You have not posted anything yet!`
                    : `${firstName} has not posted anything yet!`
                }
                subtitle="All the posts will be visible here"
              >
                <img src={emptyState} alt="empty state" className="state-img" />
              </StateMessage>
            </IonCard>
          )
        }

        return (
          <div>
            {Array.isArray(Posts) &&
              Posts.map((item, index) => {
                return item.type === "university" ? (
                  <Link key={index} to={`/university/${index}`}>
                    <CourseCard allProps={item} />
                  </Link>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderTop: "1px solid #e0e0e0"
                    }}
                    className="thread-card"
                    key={index}
                  >
                    <Thread refetch={refetch} thread={item} id={item?._id} />
                  </div>
                )
              })}

            {loading &&
              ["0", "1", "2"].map((item) => {
                return <ThreadSkeleton key={item} />
              })}

            {totalPosts > Posts.length && (
              <IonInfiniteScroll
                onIonInfinite={(e) => {
                  setPage(page + 1)
                  fetchMore({
                    variables: {
                      userId,
                      page: page + 1
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev
                      return Object.assign({}, prev, {
                        getDicussionUniWall: {
                          ...prev.getDicussionUniWall,
                          Posts: [
                            ...prev.getDicussionUniWall.Posts,
                            ...fetchMoreResult.getDicussionUniWall.Posts
                          ]
                        }
                      })
                    }
                  })
                  setTimeout(() => e.target.complete(), 500)
                }}
              >
                <IonInfiniteScrollContent loadingText="loading..."></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            )}
          </div>
        )
      }}
    </Query>
  )
}

export default index
