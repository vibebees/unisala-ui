import { useAstroMutation } from "@/datasource/apollo-client";
import { AddComment,  GetCommentList, EditComment } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';

export const ReplyBox: React.FC<{
  postId: string;
  parentId: string | null;
  onCancel: () => void;
  commentText?: string;
  previousReplyExist: boolean;
  onReplyAdded?: () => void;
  isEditing?: boolean;
  commentId?: string;
}> = ({ 
  postId, 
  parentId, 
  onCancel, 
  onReplyAdded, 
  previousReplyExist, 
  commentText = "",
  isEditing = false,
  commentId
}) => {
  const [replyText, setReplyText] = useState(commentText);

  const [addComment, { loading:addCommentLoading }] = useAstroMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      if (data?.addComment?.status?.success) {
        const newComment = data.addComment.data;

        // Update the current level comments
        const currentLevelCacheKey = { 
          query: GetCommentList, 
          variables: previousReplyExist ? { postId, parentId } : { postId }
        };
        const currentLevelData = cache.readQuery(currentLevelCacheKey);

        if (currentLevelData?.commentList) {
          const updatedCurrentLevelData = {
            commentList: {
              ...currentLevelData.commentList,
              data: [newComment, ...currentLevelData.commentList.data],
            },
          };
          cache.writeQuery({
            ...currentLevelCacheKey,
            data: updatedCurrentLevelData,
          });
        }

        // If this is a reply (not a top-level comment), update the parent comment's reply count
        if (parentId) {
          const topLevelCacheKey = { 
            query: GetCommentList, 
            variables: { postId , parentId, commentText: replyText}
          };
          const topLevelData = cache.readQuery(topLevelCacheKey);

          if (topLevelData?.commentList) {
            const updatedTopLevelData = {
              commentList: {
                ...topLevelData.commentList,
                data: topLevelData.commentList.data.map((comment: any) => 
                  comment._id === parentId 
                    ? { ...comment, repliesCount: (comment.repliesCount || 0) + 1 }
                    : comment
                ),
              },
            };
            cache.writeQuery({
              ...topLevelCacheKey,
              data: updatedTopLevelData,
            });
          }
        }
      }
    },
    onCompleted: (data: any) => {
      if (data?.addComment?.status?.success) {
        toast.success('Comment posted successfully!');
        onReplyAdded?.();
      } else {
        toast.error(data?.addComment?.status?.message || 'Failed to post comment. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Error submitting comment:', error);
      toast.error('An error occurred while submitting your comment. Please try again.');
    },
  });


  const [updateComment, { loading: updateLoading }] = useAstroMutation(EditComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      if (data?.editComment?.status?.success) {
        const updatedComment = data.editComment.data;
        let variables = { postId } as { postId: string; parentId?: string };
        if (parentId) {
            variables.parentId = parentId;
        }
        const cacheKey = { 
          query: GetCommentList, 
          variables
        };
        const existingData = cache.readQuery(cacheKey);
        if (existingData?.commentList) {
          const updatedData = {
            commentList: {
              ...existingData.commentList,
              data: existingData.commentList.data.map((comment: any) => 
                comment._id === updatedComment._id ? updatedComment : comment
              ),
            },
          };
          cache.writeQuery({
            ...cacheKey,
            data: updatedData,
          });
        }
      }
    },
    onCompleted: (data: any) => {
      if (data?.editComment?.status?.success) {
        toast.success('Comment updated successfully!');
        onReplyAdded?.();
      } else {
        toast.error(data?.editComment?.status?.message || 'Failed to update comment. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Error updating comment:', error);
      toast.error('An error occurred while updating your comment. Please try again.');
    },
  });

  const handleSubmit = async () => {
    if (!replyText.trim()) {
      toast.error('Please enter a comment before submitting.');
      return;
    }

    if (isEditing) {
      const result = await updateComment({ 
        variables: {
          commentId,
          commentText: replyText,
        }
      });
      console.log('Update Result:', result);
    } else {
      const result = await addComment({ 
        variables: {
          postId,
          parentId: parentId || undefined,
          commentText: replyText,
        }
      });
      console.log('Add Result:', result);
    }

    setReplyText('');
    onCancel();
  };

  const loading = addCommentLoading || updateLoading;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, [replyText]);
  return (
    <div className="mt-4">
      <textarea
              ref={textareaRef}

        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder={isEditing ? "Edit your comment..." : "Write a reply..."}
        style={{ minHeight: '60px', resize: 'none', overflow: 'hidden' }}

      />
      <div className="mt-2 flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {loading ? 'Posting...' : (isEditing ? 'Update' : 'Comment')}
        </button>
      </div>
    </div>
  );
};