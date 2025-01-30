import React from "react";
import Thread from "../thread";

export const Post = ({ post, feedType, feedId }) => {
  return (
    <Thread
      thread={post}
      id={post._id}
      feedType={feedType}
      feedId={feedId}
      key={post?._id || post}
    />
  );
};
