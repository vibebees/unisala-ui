import { useAstroQuery } from "@/datasource/apollo-client";
import { GetCommentList } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { useState } from "react";
import { CommentHeader } from "./CommentHeader";
import type { Comment } from "@/types/comment";
import { CommentBody } from "./CommentBody";
import { CommentFooter } from "./CommentFooter";
import { CommentSkeleton } from "./CommentSkeleton";
import { CommentList } from "./CommentList";
import { ReplyBox } from "./ReplyBox";

export const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error, data } = useAstroQuery(GetCommentList, {
    variables: { postId: comment.postId, parentId: comment._id },
    skip: !showReplies,
    context: { server: USER_SERVICE_GQL },
  });

  const handleViewReplies = () => {
    setShowReplies(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log("Deleting comment:", comment._id);
  };

  return (
    <article className='p-6 mb-3 text-base bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full'>
      <CommentHeader comment={comment} onEdit={handleEdit} onDelete={handleDelete} />
      {isEditing ? (
        <ReplyBox
          postId={comment.postId}
          parentId={comment.parentId}
          onCancel={() => setIsEditing(false)}
          commentText={comment.commentText}
          previousReplyExist={!!comment.repliesCount}
          onReplyAdded={() => {
            setIsEditing(false);
            // Optionally refresh comments or update local state
          }}
          isEditing={true}
          commentId={comment._id}
        />
      ) : (
        <>
          <CommentBody commentText={comment.commentText} />
          <CommentFooter onReply={() => setShowReplyBox(true)} />
        </>
      )}
      {showReplyBox && !isEditing && (
        <ReplyBox
          previousReplyExist={!!comment.repliesCount}
          parentId={comment.parentId || comment._id}
          postId={comment.postId}
          onCancel={() => setShowReplyBox(false)}
        />
      )}
      {(comment?.repliesCount ?? 0) > 0 && (
        <div className='pl-6 mt-4'>
          {!showReplies ? (
            <button
              onClick={handleViewReplies}
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              View {comment.repliesCount} {comment.repliesCount === 1 ? 'reply' : 'replies'}
            </button>
          ) : loading ? (
            <CommentSkeleton />
          ) : error ? (
            <p className="text-red-500">Error loading replies</p>
          ) : (
            <CommentList comments={data?.commentList?.data} />
          )}
        </div>
      )}
    </article>
  );
};