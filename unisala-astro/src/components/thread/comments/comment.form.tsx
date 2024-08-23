import { CtaLogin } from '@/components/ui/ctaLogin';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddComment, GetCommentList } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { sendGAEvent } from '@/utils/analytics/events';
import { getCache } from '@/utils/cache';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  replyTo?: string;
}


const CommentForm: React.FC<CommentFormProps> = ({ postId = '', parentId, replyTo }) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const userData = getCache('authData');



  const [addComment, { loading }] = useAstroMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      if (data?.addComment?.status?.success) {
        const newComment = data.addComment.data;
        console.log('New comment:', newComment);

        const existingData: { commentList?: any } | null = cache.readQuery({
          query: GetCommentList,
          variables: { postId },
        });

        if (existingData?.commentList) {
          const updatedData = {
            commentList: {
              ...existingData.commentList,
              data: [newComment, ...existingData.commentList.data],
            },
          };

          cache.writeQuery({
            query: GetCommentList,
            variables: { postId },
            data: updatedData,
          });
        }
      }
    },
    onCompleted: (data: any) => {
      if (data?.addComment?.status?.success) {
        setCommentText('');
        toast.success('Comment posted successfully!');

      } else {
        toast.error(data?.addComment?.status?.message || 'Failed to post comment. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Error submitting comment:', error);
      toast.error('An error occurred while submitting your comment. Please try again.');
    },
  });

  const submitComment = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const variables = {
      postId,
      commentText,
      parentId,
      replyTo,
    };

    try {
      const result = await addComment({ variables });
      sendGAEvent('thread_action', {
        category: 'threads',
        label: 'add_comment',
        postId,
      })
      if (result?.data?.addComment?.status?.success) {
        setCommentText('');
        toast.success('Comment posted successfully!');

      } else {
        setError(result?.data?.addComment?.status?.message);
        toast.error('Failed to post comment. Please try again.');

      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('An error occurred while submitting your comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  function adjustHeight(element: HTMLElement) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
  }


  if (userData === null) {
    return (
      <section className='bg-white dark:bg-gray-900 py-8 lg:py-6 antialiased'>
        <div className='max-w-4xl mx-auto px-4 flex items-center'>
          <CtaLogin message='I want to comment' />
        </div>
    </section>
    )
  }

  return (
    <form onSubmit={submitComment} className='className="prose dark:prose-invert max-w-none"'>
<div className='py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700'>        <textarea
          id='comment'
          rows={4}
          className='px-0 w-full text-sm sm:text-base text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          placeholder='Write a comment...'
          required
          value={commentText}
          onChange={(e) => {
            
            setCommentText(e.target.value);
            adjustHeight(e.target);
            if (!hasStartedTyping) {
              setHasStartedTyping(true);
              sendGAEvent('thread_action', {
                category: 'threads',
                label: 'typing_comment',
                postId,
              });
            }
          }}
          disabled={isSubmitting}
          style={{ minHeight: '24px', resize: 'none', overflow: 'hidden' }}
        ></textarea>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 dark:bg-gray-600 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50 transition-colors duration-200'        disabled={isSubmitting}
      >
        {loading ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  );
};

export default CommentForm;