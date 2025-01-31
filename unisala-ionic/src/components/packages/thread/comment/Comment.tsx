import React, { FC, useState } from "react";
import "../index.css";
import ShowMore from "../organism/ShowPeopleComments";
import ThreadHeader from "../organism/ThreadHeader";
import EditComments from "./EditComment";
import { ThreadFooter } from "../organism";
import { useAuth } from "@context/AuthContext";
import CommentOptions from "./CommentOptions";
import AuthValidator from "../../authentication/AuthValidator";

interface CommentProps {
  __typename?: "Comment";
  _id: string;
  userId: string;
  postId: string;
  parentId?: string | null;
  commentText: string;
  commentImage?: string | null;
  date: any;
  repliesCount: number;
  upVoteCount: number;
  replyTo?: string | null;
  upVoted: boolean;
  user: {
    __typename?: "user";
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    picture?: string | null;
  };
  singlePost: boolean;
  setRefetchComments: any;
}

const Comment: FC<CommentProps> = ({
  postId,
  parentId,
  singlePost,
  _id,
  commentText,
  date,
  repliesCount,
  upVoteCount,
  upVoted,
  user,
  replyTo,
}) => {
  const { user: loggedInUser } = useAuth();
  const [editable, setEditable] = useState(false);
  return (
    <div className="relative mt-2 mb-4 max-md:mx-1  rounded-lg shadow-sm commentShadow mx-6">
      <div className="pt-3  pl-4 max-md:pl-1 pb-2 rounded-xl relative BorderCard bg-neutral-100 commentShadow w-full">
        <ThreadHeader
          date={date}
          firstName={user?.firstName}
          lastName={user?.lastName}
          profilePic={user?.picture || ""}
          username={user?.username}
        />

        {editable ? (
          <div className="py-4">
            <EditComments
              text={commentText}
              _id={_id}
              setEditable={setEditable}
            />
          </div>
        ) : (
          <div className="ql-editor">
            {replyTo && (
              <span className="text-sm h-fit pr-2 text-blue-600 font-medium">
                {`@${replyTo}`}
              </span>
            )}
            <p dangerouslySetInnerHTML={{ __html: commentText }} />
          </div>
        )}

        <AuthValidator>
          <ThreadFooter
            _id={_id}
            postId={postId}
            isReply={true}
            parentId={parentId || _id}
            replyTo={user?.username}
            upVoted={upVoted}
            upVoteCount={upVoteCount}
            singlePost={singlePost}
            saved={false}
          />

          {user?.username === loggedInUser?.username && (
            <CommentOptions
              _id={_id}
              parentId={parentId}
              postId={postId}
              singlePost={singlePost}
              setEditable={setEditable}
            />
          )}
        </AuthValidator>
      </div>
      <div className="ml-20 max-md:ml-8 max-sm:ml-4 border-l-2 max-md:pl-12 max-sm:pl-0 border-opacity-30 border-neutral-400">
        {repliesCount > 0 && singlePost && (
          <ShowMore postId={postId} parentId={_id} singlePost={singlePost} />
        )}
      </div>
    </div>
  );
};

export default Comment;
