import { useAstroMutation } from '@/datasource/apollo-client';
import { AddComment, GetCommentList } from '@/datasource/graphql/user';
import { userServiceGql } from '@/datasource/servers';
import { client } from '@/datasource/servers/endpoints';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { fetchApi } from '@/utils/api.utility';
import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  replyTo?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId ='', parentId, replyTo }) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
 


  const [addComment, { loading }] = useAstroMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      if (data?.addComment?.status?.success) {
        const newComment = data.addComment.data;
        console.log('New comment:', newComment);
    
        const existingData = cache.readQuery({
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
          console.log('Updated data:', updatedData);
    
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

  function adjustHeight(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
  }
  return (
    <form onSubmit={submitComment} className='mb-6'>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-blue-800 dark:border-gray-700'>
        <textarea
          id='comment'
          rows={4}
          className='px-0 w-full text-sm sm:text-base text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          placeholder='Write a comment...'
          required
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            adjustHeight(e.target);
          }}
  disabled={isSubmitting}
  style={{ minHeight: '24px', resize: 'none', overflow: 'hidden' }}
></textarea>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-50'
        disabled={isSubmitting}
      >
        {loading ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  );
};

export default CommentForm;