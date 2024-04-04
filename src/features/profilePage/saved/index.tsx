import { useState } from "react"
import {
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Query } from "@apollo/client/react/components"
import StateMessage from "../../../components/packages/stateMessage"
import emptyState from "../../../assets/emptyState.png"
import { GetSavedList } from "../../../datasource/graphql/user"
import Thread from "../../../components/packages/thread"
import CourseCard from "../../../components/packages/courseCard"
import {ThreadSkeleton} from "../../../components/packages/skeleton/threadSkeleton"
import { USER_SERVICE_GQL } from "../../../datasource/servers/types"

function index({ userId, firstName }) {
  return (
    <Query
      query={GetSavedList}
      fetchPolicy={"network-only"}
      variables={{ userId, page: 0 }}
      context={{ server: USER_SERVICE_GQL }}
    >
      {({ data, loading, fetchMore }) => {
        const { Posts } = data?.savedList || []
        const { totalPosts } = data?.savedList || 0
        const { user } = useSelector((state) => state.userProfile)
        const [page, setPage] = useState(0)

        if (!data?.savedList.totalPosts) {
          return (
            <IonCard>
              <StateMessage
                title={
                  user._id === userId
                    ? `You have not saved anything yet!`
                    : `${firstName} has not saved anything yet!`
                }
                subtitle="All the saved posts will be visible here"
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
                    <CourseCard allProps={item}/>
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
                    <Thread thread={item} id={item?._id} />
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
                        savedList: {
                          ...prev.savedList,
                          Posts: [
                            ...prev.savedList.Posts,
                            ...fetchMoreResult.savedList.Posts
                          ]
                        }
                      })
                    }
                  })
                  setTimeout(() => e.target.complete(), 500)
                }}
              >
                <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            )}
          </div>
        )
      }}
    </Query>
  )
}

export default index
