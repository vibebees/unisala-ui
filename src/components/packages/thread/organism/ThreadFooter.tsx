import React, { FC } from "react";
import { Buttons } from "../../../defaults/index";
import Share from "../../../packages/share";
import { Reply, Save, Upvote } from "../actions";

interface ThreadFooterProps {
  upVoteCount: number;
  upVoted: boolean;
  _id: string;
  postCommentsCount?: number;
  saved: boolean;
  isReply: boolean;
  replyTo: string;
  singlePost?: boolean;
  parentId: string;
}

const ThreadFooter: FC<ThreadFooterProps> = ({
  upVoteCount,
  upVoted,
  _id,
  postCommentsCount,
  saved,
  isReply,
  replyTo,
  singlePost,
  parentId,
}) => {
  const BASEURL = window.location.origin;
  return (
    <div className="thread_footer mw-full px-5   flex justify-start  gap-x-12">
      <Upvote
        upVoteCount={upVoteCount}
        postId={_id}
        upVoted={upVoted}
        isReply={isReply}
      />
      <Reply
        repliesCount={postCommentsCount}
        isReply={isReply}
        replyTo={replyTo}
        singlePost={singlePost}
        parentId={parentId}
        postId={_id}
      />
      {!isReply && <Save postId={_id} saved={saved} thread={{}} />}

      {!isReply && (
        <Buttons className="ThreadFooterBtn h-7">
          <Share
            allProps={{
              link: `${BASEURL}/thread/${_id}`,
              btnstyle: {
                width: "55px",
                height: "55px",
                backgroundColor: "transparent",
              },
              Iconstyle: {
                color: "gray ",
                width: "18px",
                height: "18px",
              },
              showAddList: false,
            }}
          />
        </Buttons>
      )}
    </div>
  );
};

export default ThreadFooter;
