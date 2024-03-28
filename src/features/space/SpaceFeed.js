import { useState, useEffect, useRef } from "react"
import {
  IonText,
  IonCard,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from "@ionic/react"
import CourseCard from "component/courseCard"
import Thread from "component/thread"
import { Link } from "react-router-dom"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"
import { useLazyQuery, useQuery } from "@apollo/client"
import {
  GetAllPostBySpaceCategoryID,
  GetSpaceEvents,
  GetUserPost
} from "@graphql/user"
import { userServer } from "servers/endpoints"
import emptyState from "assets/emptyState.png"
import clsx from "clsx"

import { USER_SERVICE_GQL } from "servers/types"
import StateMessage from "component/stateMessage/index"
import { EventCard } from "component/events"
export const SpaceFeed = ({ userInfo, spaceId }) => {
  const [postList, setPostList] = useState([])
  const [page, setPage] = useState(0)

  const { data, error, refetch } = useQuery(GetAllPostBySpaceCategoryID, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: spaceId }
  })

  const { getAllPostBySpaceCategoryID: allPosts } = data || {}

  // const [getNextPage, { loading, data }] = useLazyQuery(
  //   GetUserPost(userInfo?._id, page)
  // )
  // useEffect(() => {
  //   axios.get(userServer + "/homepagefeed").then((res) => {
  //     setPostList(res?.data?.feed)
  //   })
  // }, [])

  const { data: eventsData } = useQuery(GetSpaceEvents, {
    context: {
      server: USER_SERVICE_GQL
    },
    variables: {
      spaceId
    }
  })

  useEffect(() => {
    const scrollToPost = () => {
      const fragment = window.location.hash.substring(1)
      const element = document.getElementById(fragment)

      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        })
      }
    }

    setTimeout(scrollToPost, 600)
  }, [])

  return (
    <>
      <div style={{ margin: "10px 0px 0px 0px" }} className="ThreadContainer">
        {allPosts?.posts?.length === 0 && (
          <StateMessage title="Be the first one to post in this space">
            <img src={emptyState} alt="empty state" className="state-img" />
          </StateMessage>
        )}

        {eventsData?.getAllEventBySpaceId?.event?.map((item) => (
          <div key={item?._id}>
            <EventCard data={item} />
          </div>
        ))}

        {Array.isArray(allPosts?.posts) &&
          allPosts?.posts.map((post, index) => {
            // const { post } = item
            return post.type === "uni" ? (
              <Link key={index} to={`/university/${post?.name}`}>
                <CourseCard allProps={post} />
              </Link>
            ) : (
              <div
                style={{
                  width: "100%",
                  marginTop: "10px"
                }}
                key={index}
              >
                <Thread thread={post} refetch={refetch} id={post?._id} />
              </div>
            )
          })}

        {/* <EventCard /> */}
      </div>

      {/* {loading &&
        ["0", "1", "2"].map((item) => {
          return <ThreadScaletion key={item} />
        })} */}

      {/* {data?.getUserPost?.Posts && (
        <IonCard>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "50px"
            }}
          >
            <img
              style={{ filter: "grayscale(80%)" }}
              src="https://cdn-icons-png.flaticon.com/128/7486/7486744.png"
              alt=""
            />
            <IonText color="dark">
              <h1 style={{ fontSize: "2.5rem" }}>Oops!</h1>
            </IonText>
            <br />
            <IonText color="medium">
              <h2>No data found.</h2>
            </IonText>
          </div>
        </IonCard>
      )} */}

      {/* <IonInfiniteScroll
        onIonInfinite={(e) => {
          setPage(page + 1)
          getNextPage()
          setTimeout(() => e.target.complete(), 500)
        }}
      >
        <IonInfiniteScrollContent loadingText=""></IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
    </>
  )
}
