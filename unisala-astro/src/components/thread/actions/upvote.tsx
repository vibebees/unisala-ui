import React, { useState } from 'react';
import type { HTMLAttributes } from "astro/types";
import { FireIconFilled, FireIconOutline } from '@/components/packages/icons/fire';
import { CommentIconFilled, CommentIconOutline } from '@/components/packages/icons/comments';
import { useAstroMutation } from '@/datasource/apollo-client';
import { toast } from 'react-hot-toast';
import { GetCommentList, UpVote } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { BookmarkIconFilled, BookmarkIconOutline } from '@/components/packages/icons/bookmark';
import { CopyIconFilled, CopyIconOutline } from '@/components/packages/icons/copy';
import { client } from '@/datasource/servers/endpoints';
import { sendGAEvent } from '@/utils/analytics/events';

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

const ThreadActionTsx: React.FC<Props> = ({ initialClaps, comments, postId, showBorder, upVoted }) => {
  const [upVoteLoading, setUpVoteLoading] = useState(false);
  const [upVoteError, setUpVoteError] = useState<any>(null);
  const [upvoteCount, setUpvoteCount] = useState(initialClaps);
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
      toast.success(message);
    },
    onError: (error) => {
      setUpVoteError(error);
      toast.error(`Error upvoting post: ${error?.message}`);
    },
  });

  const handleCopyLink = async () => {
    try {
      sendGAEvent('thread_action', {
        category: 'threads',
        label: 'copy_thread_link',
        postId,
      });
      await navigator.clipboard.writeText(window.location.href);
      setCopyLink(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopyLink(false), 3000); // Reset icon after 3 seconds
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleUpvote = async () => {
    sendGAEvent('thread_action', {
      category: 'threads',
      label: 'upvote',
      postId,
    });
    setIsUpvoted(!isUpvoted);
    setUpVoteLoading(true);
    try {
      await UpVotePost();
    } catch (error) {
      setUpVoteError(error);
    } finally {
      setUpVoteLoading(false);
    }
  };

  const data = client.readQuery({
    query: GetCommentList,
    variables: { postId },
  }), 
  commentList = data?.getCommentList

  const [isUpvoted, setIsUpvoted] = useState(commentList?.isPostUpVotedByCurrentUser);
  return (
    <div className={`flex items-center justify-between text-gray-500 ${showBorder && "border-t border-b"} py-4`}>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-1 hover:text-gray-700"
          onClick={handleUpvote}
          disabled={loading}
        >
          <>
            {isUpvoted ? <FireIconFilled /> : <FireIconOutline />}
            <span>{upvoteCount}</span>
          </>
        </button>
        <button className="flex items-center space-x-1 hover:text-gray-700">
          {comments === 0 ? <CommentIconOutline /> : <CommentIconFilled />}
          <span>{comments}</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-700" onClick={e => setBookmarkOn(!bookmarkOn)}>
          {/* {bookmarkOn ? <BookmarkIconFilled /> : <BookmarkIconOutline />} */}
        </button>

        <button className="hover:text-gray-700" onClick={handleCopyLink}>
        {copyLink ? <CopyIconFilled /> : <CopyIconOutline />}
        </button>
      </div>
      {upVoteError && <p className="text-red-500">{upVoteError.message}</p>}
    </div>
  );
};

export default ThreadActionTsx;