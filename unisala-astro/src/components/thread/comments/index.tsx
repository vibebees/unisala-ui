import React, { useState, useEffect } from 'react';
import CommentForm from './comment.form';
import { userServer } from '@/datasource/servers/endpoints';

interface Comment {
  replies: any;
  _id: string;
  userId: string;
  postId: string;
  parentId: string | null;
  commentText: string;
  commentImage: string | null;
  date: string;
  repliesCount: number;
  upVoteCount: number;
  replyTo: string | null;
  upVoted: boolean;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    picture: string;
  };
}

interface CommentsProps {
  postId: string;
  parentId?: string;
}

const CommentFooter: React.FC = () => (
    <div className='flex items-center mt-4 space-x-4'>
      <button
        type='button'
        className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium'
      >
        <svg
          className='mr-1.5 w-3.5 h-3.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 18'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
          />
        </svg>
        Reply
      </button>
    </div>
  );


const CommentBody: React.FC<{ commentText: string }> = ({ commentText }) => (
    <div
      className='text-gray-500 dark:text-gray-400'
      dangerouslySetInnerHTML={{ __html: commentText }}
    />
  );

  const CommentOptionsButton: React.FC<{ commentId: string }> = ({ commentId }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    return (
      <div className="relative">
        <button
          id={`dropdownComment${commentId}`}
          onClick={toggleDropdown}
          className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          type='button'
        >
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 16 3'
          >
            <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
          </svg>
          <span className='sr-only'>Comment settings</span>
        </button>
        {isOpen && (
          <div
            id={`dropdownMenu${commentId}`}
            className='absolute right-0 mt-2 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
          >
            <ul
              className='py-1 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownMenuIconHorizontalButton'
            >
              <li>
                <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                  Edit
                </a>
              </li>
              <li>
                <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                  Remove
                </a>
              </li>
              <li>
                <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                  Report
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };


const CommentHeader: React.FC<{ comment: Comment }> = ({ comment }) => (
    <footer className='flex justify-between items-center mb-2'>
      <div className='flex items-center'>
        <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
          <img
            className='mr-2 w-6 h-6 rounded-full'
            src={comment?.user?.picture || 'https://via.placeholder.com/40'}
            alt={comment?.user?.firstName}
          />
          {comment?.user?.firstName} {comment?.user?.lastName}
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          <time
            dateTime={comment?.date}
            title={new Date(comment?.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          >
            {new Date(comment?.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </p>
      </div>
      <CommentOptionsButton commentId={comment._id} />
    </footer>
  );

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
    <article className='p-6 mb-3 text-base bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full'>
      <CommentHeader comment={comment} />
      <CommentBody commentText={comment.commentText} />
      <CommentFooter />
      {comment?.replies?.length > 0 && (
        <div className='pl-6 mt-4'>
         
        </div>
      )}
    </article>
  );


const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </>
  );

  const CommentSkeleton: React.FC = () => (
    <div className="animate-pulse p-6 mb-3 bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full">
      <div className="flex items-center space-x-3 mb-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
  
  const CommentsSketelon = () => (
    <>
    <CommentSkeleton />
    <CommentSkeleton />
    <CommentSkeleton />
  </>
  )

const Comments: React.FC<CommentsProps> = ({ postId, parentId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const query = `
        query commentList($postId: String!, $parentId: String) {
          commentList(postId: $postId, parentId: $parentId) {
            status {
              success
              message
            }
            validToken
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

      try {
        const response = await fetch(userServer, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { postId, parentId }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setComments(result.data.commentList.data);
      } catch (e) {
        console.error("Error fetching comments:", e);
        setError(e instanceof Error ? e.message : String(e));
      }finally{
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, parentId]);

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };
/*
  return (
    <section className='bg-white dark:bg-black-900 py-8 lg:py-6 antialiased'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white'>
            Discussion ({comments.length})
          </h2>
        </div>
        <CommentForm 
          postId={postId}
          onCommentAdded={handleCommentAdded}
        />
        {error && <p className="text-red-500">{error}</p>}
        {comments.map((comment) => (
          <article key={comment._id} className='p-6 mb-3 text-base bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full'>
            <footer className='flex justify-between items-center mb-2'>
              <div className='flex items-center'>
                <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                  <img
                    className='mr-2 w-6 h-6 rounded-full'
                    src={comment?.user?.picture || 'https://via.placeholder.com/40'}
                    alt={comment?.user?.firstName}
                  />
                  {comment?.user?.firstName} {comment?.user?.lastName}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  <time
                    dateTime={comment.date}
                    title={new Date(comment.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  >
                    {new Date(comment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </p>
              </div>
              <button
                id={`dropdownComment${comment._id}`}
                data-dropdown-toggle={`dropdownMenu${comment._id}`}
                className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                type='button'
              >
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 16 3'
                >
                  <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                </svg>
                <span className='sr-only'>Comment settings</span>
              </button>
              <div
                id={`dropdownMenu${comment._id}`}
                className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
              >
                <ul
                  className='py-1 text-sm text-gray-700 dark:text-gray-200'
                  aria-labelledby='dropdownMenuIconHorizontalButton'
                >
                  <li>
                    <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Remove
                    </a>
                  </li>
                  <li>
                    <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <div
              className='text-gray-500 dark:text-gray-400'
              dangerouslySetInnerHTML={{ __html: comment.commentText }}
            />
            <div className='flex items-center mt-4 space-x-4'>
              <button
                type='button'
                className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium'
              >
                <svg
                  className='mr-1.5 w-3.5 h-3.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 18'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
                  />
                </svg>
                Reply
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
*/
return (
    <section className='bg-white dark:bg-black-900 py-8 lg:py-6 antialiased'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white'>
            Discussion ({comments.length})
          </h2>
        </div>
        <CommentForm 
          postId={postId}
          onCommentAdded={handleCommentAdded}
        />
       {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <CommentsSketelon/>
        ) : (
          <CommentList comments={comments} />
        )}
        </div>
    </section>
  );
};

export default Comments;