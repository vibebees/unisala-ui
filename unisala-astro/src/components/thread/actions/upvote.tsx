import React, { useState } from 'react';
import type { HTMLAttributes } from "astro/types";
import { FireIconFilled, FireIconOutline } from '@/components/packages/icons/fire';
import { CommentIconFilled, CommentIconOutline } from '@/components/packages/icons/comments';
import { useAstroMutation } from '@/datasource/apollo-client';
import toast from 'react-hot-toast';
import { UpVote } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { BookmarkIconFilled, BookmarkIconOutline } from '@/components/packages/icons/bookmark';
import { CopyIconFilled, CopyIconOutline } from '@/components/packages/icons/copy';

interface Props extends HTMLAttributes<"div"> {
  heading: string;
  username: string;
  date: string;
  initialClaps: number;
  comments: number;
  postId: string;
  className?: string;
  showBorder?: boolean;
  upVoted?: boolean;
}

const ThreadActionTsx: React.FC<Props> = ({ initialClaps, comments, postId, showBorder , upVoted}) => {
  const [upVoteLoading, setUpVoteLoading] = useState(false);
  const [upVoteError, setUpVoteError] = useState<any>(null);
  const [upvoteCount, setUpvoteCount] = useState(initialClaps);
  const [isUpvoted, setIsUpvoted] = useState(upVoted);
  const [bookmarkOn, setBookmarkOn] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const [UpVotePost, { loading }] = useAstroMutation(UpVote, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      postId,
    },
    onCompleted: (data) => {
      const { upVotesCount, success, message } = data.upVote;
      setUpvoteCount(upVotesCount);
      setIsUpvoted(success);
      toast.success(message);
    },
    onError: (error) => {
      setUpVoteError(error);
      toast.error(`Error upvoting post: ${error?.message}`);
    },
  });

  const handleUpvote = async () => {
    setUpVoteLoading(true);
    try {
      await UpVotePost();
    } catch (error) {
      setUpVoteError(error);
    } finally {
      setUpVoteLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-between text-gray-500 ${showBorder && "border-t border-b"} py-4`}>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-1 hover:text-gray-700"
          onClick={handleUpvote}
          disabled={loading}
        >
          {upVoteLoading || loading ? (
            <div className="w-4 h-4 border-2 border-gray-500 rounded-full animate-spin"></div>
          ) : (
            <>
              {true ? <FireIconFilled /> : <FireIconOutline />}
              <span>{upvoteCount}</span>
            </>
          )}
        </button>
        <button className="flex items-center space-x-1 hover:text-gray-700">
          {comments === 0 ? <CommentIconOutline /> : <CommentIconFilled />}
          <span>{comments}</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-700" onClick={e => setBookmarkOn(!bookmarkOn)}>
        {bookmarkOn ? <BookmarkIconFilled /> : <BookmarkIconOutline />}
        </button>

        <button className="hover:text-gray-700"  onClick={e => setCopyLink(!copyLink)}>
        {copyLink ? <CopyIconFilled /> : <CopyIconOutline />}
        </button>
      </div>
      {upVoteError && <p className="text-red-500">{upVoteError.message}</p>}
    </div>
  );
};

export default ThreadActionTsx;