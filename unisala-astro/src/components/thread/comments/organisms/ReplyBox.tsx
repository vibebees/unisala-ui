import { CtaLogin } from "@/components/ui/ctaLogin";
import { useAstroMutation } from "@/datasource/apollo-client";
import { AddComment, GetCommentList, EditComment } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { sendGAEvent } from "@/utils/analytics/events";
import { getCache } from "@/utils/cache";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';
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
    const [addComment, { loading: addCommentLoading }] = useAstroMutation(AddComment, {
      context: { server: USER_SERVICE_GQL },
      update: (cache, { data }) => {
        if (data?.addComment?.status?.success) {
          const newComment = data.addComment.data;
          
          /*
            Handle cache updates 3 scenarios:
            1. New top-level comment
            2. Reply to an existing comment
            3. Reply to a reply (nested reply) in an existing comment
          */
          // reply to a comment 
          if (parentId) {
            /*
              we need to handle replies in two cases:
              1. User just reply to a brand new comment that has no replies yet
                  a. reflect new reply to the comment
              2. User reply to a comment that already has replies
                a. Reply before fetching existing replies
                    a. update total replies count
                b. Reply after fetching existing replies

            */
           // for 1a and 2a
           const topLevelCacheKey = { query: GetCommentList, variables: { postId } };

           const repliesCacheKey = { query: GetCommentList, variables: { postId, parentId } };
         
            // Read cache data
            const topLevelData = cache.readQuery<CommentListData>(topLevelCacheKey);
            const repliesData = cache.readQuery<CommentListData>(repliesCacheKey);

            // Update top-level comment's reply count
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

            // Update replies list if it exists
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
            // This is a new top-level comment
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
        })
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
        })      }

      setReplyText('');
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
    const userData = getCache('authData');


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
      <div className="mt-4">
        <textarea
          ref={textareaRef}

          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={replyText}
          onChange={(e) => {
            setReplyText(e.target.value);
            // only send ga event once
            if (replyText.length === 1 && e.target.value.length > 0) {
              sendGAEvent('thread_action', {
                category: 'threads',
                label: 'reply_comment_typing',
                postId,
                commentId
              });
            }
          }}
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