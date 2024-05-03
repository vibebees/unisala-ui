import React from "react";
import { useEffect, useState } from "react";
import { Spinner } from "../../../defaults/index";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types";
import { GetCommentList } from "../../../../datasource/graphql/user";
import { CommentListQuery } from "src/types/gqlTypes/graphql";

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
  const [getCommentList, { data, loading, refetch }] =
    useLazyQuery<CommentListQuery>(GetCommentList, {
      context: { server: USER_SERVICE_GQL },
    });

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
        {data?.commentList?.data?.map((reply: any, i) => {
          console.log("reply", reply);
          return <Comment {...reply} singlePost={singlePost} key={i} />;
        })}
      </>
    );
  }

  return (
    <>
      {data?.commentList?.data?.slice(0, 1).map((reply, i) => {
        return (
          <Comment
            {...(reply as any)}
            key={i}
            singlePost={singlePost}
            postId={postId}
            parentId={parentId}
            setRefetchComments={setRefetchComments}
          />
        );
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
  );
}

export default ShowOtherComments;
