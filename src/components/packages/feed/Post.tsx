import React from "react";
import Thread from "../thread";

export const Post = ({ post,  feedType, feedId }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "10px"
        // borderTop: "1px solid #e0e0e0"
      }}
      className="max-md:border-none"
    >
      <Thread
        thread={post}
        id={post._id}
        feedType={feedType}
        feedId={feedId}
        key={post?._id || post} />
    </div>
  );
};
