import React, { useState } from 'react';
import type { HTMLAttributes } from "astro/types";
import { UpVoteIcon } from '@/components/packages/icons';

interface Props extends HTMLAttributes<"div"> {
  heading: string;
  username: string;
  date: string;
  claps: number;
  comments: number;
  postId: string;
  className?: string;
  showBorder?: boolean;
}

const ThreadAction: React.FC<Props> = ({ claps, comments, postId, showBorder}) => {
  const [upVoteLoading, setUpVoteLoading] = useState(false);
  const [upVoteError, setUpVoteError] = useState<any>(null);

  const handleUpvote = async () => {
    try {
      setUpVoteLoading(true);
      // Call the upvote mutation here
      // ...
      setUpVoteLoading(false);
    } catch (error) {
      setUpVoteError(error);
      setUpVoteLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-between text-gray-500 ${showBorder && "border-t border-b"} py-4`}>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 hover:text-gray-700" onClick={handleUpvote}>
          {upVoteLoading ? (
            <div className="w-4 h-4 border-2 border-gray-500 rounded-full animate-spin"></div>
          ) : (
            <>
              <UpVoteIcon />
              <span>{claps}</span>
            </>
          )}
        </button>
        <button className="flex items-center space-x-1 hover:text-gray-700">
          {/* <Icon name="lucide:message-circle"/> */}
          <span>{comments}</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-700">
          {/* <Icon name="lucide:bookmark"  /> */}
        </button>
        <button className="hover:text-gray-700">
          {/* <Icon name="lucide:share" /> */}
        </button>
      </div>
      {upVoteError && <p className="text-red-500">{upVoteError.message}</p>}
    </div>
  );
};

export default ThreadAction;