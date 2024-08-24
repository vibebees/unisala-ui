import { CtaLogin } from "@/components/ui/ctaLogin";
import { useAstroMutation } from "@/datasource/apollo-client";
import { AddComment, GetCommentList, EditComment } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { sendGAEvent } from "@/utils/analytics/events";
import { getCache } from "@/utils/cache";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Comment {
  _id: string;
  repliesCount: number;
  // Add other necessary fields
}

interface CommentListData {
  commentList: {
    data: Comment[];
    // Add other necessary fields
  };
}

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
  const quillRef = useRef<ReactQuill>(null);

  const [addComment, { loading: addCommentLoading }] = useAstroMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      if (data?.addComment?.status?.success) {
        const newComment = data.addComment.data;
        
        if (parentId) {
          const topLevelCacheKey = { query: GetCommentList, variables: { postId } };
          const repliesCacheKey = { query: GetCommentList, variables: { postId, parentId } };
        
          const topLevelData = cache.readQuery<CommentListData>(topLevelCacheKey);
          const repliesData = cache.readQuery<CommentListData>(repliesCacheKey);

          if (topLevelData?.commentList) {
            const updatedComments = topLevelData.commentList.data.map((comment: Comment) =>
              comment._id === parentId
                ? { ...comment, repliesCount: comment.repliesCount + 1 }
                : comment
            );

            cache.writeQuery({
              ...topLevelCacheKey,
              data: {
                commentList: {
                  ...topLevelData.commentList,
                  data: updatedComments,
                },
              },
            });
          }

          if (repliesData?.commentList) {
            cache.writeQuery({
              ...repliesCacheKey,
              data: {
                commentList: {
                  ...repliesData.commentList,
                  data: [newComment, ...repliesData.commentList.data],
                },
              },
            });
          }
        } else {
          const currentLevelCacheKey = {
            query: GetCommentList,
            variables: { postId }
          };
      
          const currentLevelData = cache.readQuery<CommentListData>(currentLevelCacheKey);
      
          if (currentLevelData?.commentList) {
            const updatedCurrentLevelData = {
              commentList: {
                ...currentLevelData.commentList,
                data: [newComment, ...currentLevelData.commentList.data],
              },
            };
      
            cache.writeQuery({
              query: GetCommentList,
              variables: { postId },
              data: updatedCurrentLevelData,
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
        const variables = { postId } as { postId: string; parentId?: string };
        if (parentId) {
          variables.parentId = parentId;
        }
        const cacheKey = {
          query: GetCommentList,
          variables
        };
        const existingData: { commentList?: any } | null = cache.readQuery(cacheKey);
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
      sendGAEvent('thread_action', {
        category: 'threads',
        label: 'edit_comment_done',
        postId,
      });
    } else {
      const result = await addComment({
        variables: {
          postId,
          parentId: parentId || undefined,
          commentText: replyText,
        }
      });
      sendGAEvent('thread_action', {
        category: 'threads',
        label: 'reply_comment_done',
        postId,
      });
    }

    setReplyText('');
  };

  const loading = addCommentLoading || updateLoading;
  const userData = getCache('authData');

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  if (userData === null) {
    return (
      <section className='bg-white dark:bg-gray-900 py-8 lg:py-6 antialiased'>
        <div className='max-w-4xl mx-auto px-4'>
          <CtaLogin message='Login to post comments' />
        </div>
      </section>
    )
  }

  return (
      <div className='bg-white dark:bg-gray-900 py-8 lg:py-6 antialiased'>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={replyText}
        onChange={(content) => {
          setReplyText(content);
          if (replyText.length === 0 && content.length > 0) {
            sendGAEvent('thread_action', {
              category: 'threads',
              label: 'reply_comment_typing',
              postId,
              commentId
            });
          }
        }}
        modules={modules}
        placeholder={isEditing ? "Edit your comment..." : "Write a reply..."}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2"
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