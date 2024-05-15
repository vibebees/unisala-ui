import React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "../../../defaults/index";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types";
import { GetCommentList } from "../../../../datasource/graphql/user";
import { CommentListQuery } from "src/types/gqlTypes/graphql";
import { useAuth } from '@context/AuthContext';
import { set } from 'cypress/types/lodash';

interface ShowOtherCommentsProps {
  postId?: string;
  parentId?: string;
  singlePost?: boolean;
  postCommentsCount?: number;
}

function ShowOtherComments({
  postId = "",
  parentId = "",
  singlePost = false,
  postCommentsCount,
}: ShowOtherCommentsProps) {
  const [refetchComments, setRefetchComments] = useState(false);
  const {user} = useAuth();
  const [getCommentList, { data, loading, refetch }] =
    useLazyQuery<CommentListQuery>(GetCommentList, {
      context: { server: USER_SERVICE_GQL },
    });

    const [comments, setComments] = useState(data?.commentList?.data ?? []);
    const [commentToShow, setCommentToShow] = useState(data?.commentList?.data[0] ?? {});

    useEffect(() => {
      if (postId !== null && parentId !== null) {
        getCommentList({
          variables: {
            postId,
            parentId,
          },
        });
      }
    }, [postId, parentId, getCommentList]);

  useEffect(() => {
    if (refetchComments) {
      refetch();
      setRefetchComments(false);
    }
  }, [refetchComments, refetch]);

  const userComment = (commentData, userId) => {
    // Filter the comments to find those made by the specified user
    const userComments = commentData.filter(comment => comment.userId === userId);
    console.log({userId, commentData})
    // Sort the filtered comments by date in descending order to get the most recent one at the beginning
    const sortedComments = userComments.sort((a, b) => new Date(b.date).getTime() -  new Date(a.date).getTime() );

    // Return the most recent comment if it exists
    if(sortedComments.length > 0) {
      setCommentToShow(sortedComments[0]);
    }else{
      setCommentToShow(commentData[0]);
    }
  };

// Example usage: Assume '64886e0066a911b4081d0166' is the userId of the user you're interested in
  const [updateComment, setUpdatComment] = useState(false);
  useEffect(() => {

    if (data?.commentList?.data) {
      setComments(data?.commentList?.data);
      //prioritize user commemnts to display

      setCommentToShow(data?.commentList?.data[0] ?? {});
      userComment(data?.commentList?.data, user?.id);
    }
  },[data, loading, updateComment])

  if (loading)
    return (
      <div className="w-full h-10 grid place-content-center">
        <div className="w-fit h-fit scale-75">
          <Spinner />;
        </div>
      </div>
    );

  if (singlePost) {
    return (
      <>
        {comments?.map((reply: any, i) => {
          return <Comment {...reply} singlePost={singlePost} key={i} />;
        })}
      </>
    );
  }

  return (
    <>
      {
        // check if comments to show exist or not

      commentToShow?.postId &&<Comment
        {...(commentToShow as any)}
        key={0}
        singlePost={singlePost}
        postId={postId}
        parentId={parentId}
        setRefetchComments={setRefetchComments}
      />}
      {!singlePost && postCommentsCount && postCommentsCount > 1 && (
        <Link
          to={`thread/${postId}`}
          className=" block ml-7  mt-3 text-blue-600 text-sm font-medium hover:text-neutral-800"
        >
          View all comments
        </Link>
      )}
    </>
  );
}

export default ShowOtherComments;
