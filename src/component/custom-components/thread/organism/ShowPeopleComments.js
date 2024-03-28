import { useEffect, useState } from "react"
import { IonButton, IonSpinner } from "@ionic/react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import Comment from "../Comment"
import { USER_SERVICE_GQL } from "servers/types"
import { GetCommentList } from "graphql/user"

function ShowOtherComments({
  postId = "",
  parentId = "",
  user,
  setRefetchPosts,
  numberOfComments,
  singlePost = false,
  postCommentsCount
}) {
  const [showMore, setShowMore] = useState(false)

  const [refetchComments, setRefetchComments] = useState(false)
  const [getCommentList, { data, loading, refetch }] = useLazyQuery(
    GetCommentList,
    {
      context: { server: USER_SERVICE_GQL }
    }
  )

  useEffect(() => {
    // Check if postId and parentId are not null/undefined before executing the query
    if (postId !== null && parentId !== null) {
      getCommentList({
        variables: {
          postId,
          parentId
        }
      })
    }
  }, [postId, parentId, getCommentList])


  useEffect(() => {
    if (refetchComments) {
      refetch()
      setRefetchComments(false)
    }
  }, [refetchComments, refetch])

  if (loading) return <IonSpinner />

  if (singlePost) {
    return (
      <>
        {data?.commentList?.data?.map((reply, i) => {
          return (
            <Comment
              comment={reply}
              key={i}
              singlePost={singlePost}
              postId={postId}
              parentId={parentId}
              setRefetchComments={setRefetchComments}
            />
          )
        })}
      </>
    )
  }

  return (
    <>
      {data?.commentList?.data?.slice(0, numberOfComments).map((reply, i) => {
        return (
          <Comment
            comment={reply}
            key={i}
            singlePost={singlePost}
            postId={postId}
            parentId={parentId}
            setRefetchComments={setRefetchComments}
          />
        )
      })}
      {!singlePost && postCommentsCount && postCommentsCount > 1 && (
        <Link
          to={`thread/${postId}`}
          className=" block ml-7  mt-3 text-blue-600 text-sm font-medium hover:text-neutral-800"
        >
          View all comments
        </Link>
      )}
    </>
  )
}

export default ShowOtherComments
