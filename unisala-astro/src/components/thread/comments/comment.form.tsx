import { userServiceGql } from '@/datasource/servers';
import { fetchApi } from '@/utils/api.utility';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  replyTo?: string;
  onCommentAdded: (newComment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId ='', parentId, replyTo, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (variables: any) => {
    const query = `
      mutation addComment(
        $postId: String!
        $commentText: String
        $parentId: String
        $replyTo: String
      ) {
        addComment(
          postId: $postId
          commentText: $commentText
          parentId: $parentId
          replyTo: $replyTo
        ) {
          status {
            success
            message
          }
          data {
            _id
            userId
            postId
            parentId
            commentText
            commentImage
            date
            repliesCount
            upVoteCount
            replyTo
            upVoted
            user {
              _id
              firstName
              lastName
              username
              picture
            }
          }
        }
      }
    `;

    return fetchApi(userServiceGql, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  };

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
      const result = await addComment(variables);
      if (result.data.addComment.status.success) {
        onCommentAdded(result.data.addComment.data);
        setCommentText('');
        toast.success('Comment posted successfully!');

      } else {
        setError(result.data.addComment.status.message);
        toast.error('Failed to post comment. Please try again.');

      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('An error occurred while submitting your comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={submitComment} className='mb-6'>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-blue-800 dark:border-gray-700'>
        <textarea
          id='comment'
          rows={6}
          className='px-0 w-full text-sm sm:text-base text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          placeholder='Write a comment...'
          required
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isSubmitting}
        ></textarea>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-50'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  );
};

export default CommentForm;