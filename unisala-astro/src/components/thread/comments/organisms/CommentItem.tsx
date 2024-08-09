import { useAstroMutation, useAstroQuery } from "@/datasource/apollo-client";
import { DeleteComment, GetCommentList } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { useState } from "react";
import { CommentHeader } from "./CommentHeader";
import type { Comment } from "@/types/comment";
import { CommentBody } from "./CommentBody";
import { CommentFooter } from "./CommentFooter";
import { CommentSkeleton } from "./CommentSkeleton";
import { CommentList } from "./CommentList";
import { ReplyBox } from "./ReplyBox";
import { toast } from "react-hot-toast";
import { sendGAEvent } from "@/utils/analytics/events";
import { getCache } from "@/utils/cache";

export const CommentItem: React.FC<{ comment: Comment, nestedComment:boolean }> = ({ comment, nestedComment = false }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error, data } = useAstroQuery(GetCommentList, {
    variables: { postId: comment.postId, parentId: comment._id },
    skip: !showReplies,
    context: { server: USER_SERVICE_GQL },
  });
  const userData = getCache('authData');

  const handleViewReplies = () => {
    setShowReplies(true);
    sendGAEvent('thread_action', {
      category: 'threads',
      label: 'view_replies',
      postId: comment.postId,
      commentId: comment._id,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
 
  const [deleteComment] = useAstroMutation(DeleteComment, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: comment._id },
    update: (cache, { data }) => {
      if (data?.deleteComment?.status?.success) {
        // Remove the comment from the cache
        const variables: { postId: string; parentId?: string | null } = { postId: comment.postId };

        if (comment.parentId) {
          variables.parentId = comment.parentId;
        }

        const cacheKey = { 
          query: GetCommentList, 
          variables: variables
        };

        const existingData : {commentList?: any} | null = cache.readQuery(cacheKey);
        if (existingData?.commentList) {
          const updatedData = {
            commentList: {
              ...existingData.commentList,
              data: existingData.commentList.data.filter((c: Comment) => c._id !== comment._id),
            },
          };
          cache.writeQuery({
            ...cacheKey,
            data: updatedData,
          });
        }

        // Update the parent comment or post reply count
        const parentType = comment.parentId ? "Comment" : "Post";
        const parentId = comment.parentId || comment.postId;
        cache.modify({
          id: cache.identify({ __typename: parentType, _id: parentId }),
          fields: {
            repliesCount: (prevCount: number) => prevCount - 1,
          },
        });
      }
    },
    onCompleted: (data) => {
      if (data?.deleteComment?.status?.success) {
        toast.success(data.deleteComment.status.message || 'Comment removed successfully!');
      } else {
        toast.error(data?.deleteComment?.status?.message || 'Failed to remove comment. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Error removing comment:', error);
      toast.error('An error occurred while removing your comment. Please try again.');
    },
  });

  const handleDelete = async () => {
    try {
      await deleteComment({ variables: { id: comment._id } });
      sendGAEvent('thread_action', {
        category: 'threads',
        label: 'delete_comment',
        postId: comment.postId,
        commentId: comment._id,
      })
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  };

  return (
    <article className='p-6 mb-3 text-base bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full'>
      <CommentHeader comment={comment} onEdit={handleEdit} onDelete={handleDelete} />
      {isEditing && userData !==null ? (
        <ReplyBox
          postId={comment.postId}
          parentId={comment.parentId}
          onCancel={() => {
            setIsEditing(false)
            sendGAEvent('thread_action', {
              category: 'threads',
              label: 'cancel_edit_comment',
              postId: comment.postId,
              commentId: comment._id,
            })
          }}
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
          <CommentFooter onReply={() => {
            setShowReplyBox(true);
            sendGAEvent('thread_action', {
              category: 'threads',
              label: 'reply_comment_button',
              postId: comment.postId,
              commentId: comment._id,
              parentId: comment.parentId,
              nestedComment,
            });
          }} />
        </>
      )}
      {showReplyBox && !isEditing  && (
        <ReplyBox
          previousReplyExist={!!comment.repliesCount}
          parentId={comment.parentId || comment._id}
          postId={comment.postId}
          onCancel={() => {
            setShowReplyBox(false);
            sendGAEvent('thread_action', {
              category: 'threads',
              label: 'reply_comment_cancel',
              postId: comment.postId,
              commentId: comment._id,
              parentId: comment.parentId,
            });
          }}
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
            <CommentList comments={data?.commentList?.data} nestedComment ={true} />
          )}
        </div>
      )}
    </article>
  );
};