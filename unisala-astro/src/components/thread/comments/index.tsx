import React from 'react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string | null;
}

interface Comment {
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
  user: User;
}

const comments = [
    {
      _id: '664f5920ae04741558fef983',
      userId: '64dd5983d1aa61cf8887f9fa',
      postId: '664ed6f5ae04741558fef7f1',
      parentId: null,
      commentText:
        "<p>Rejections are directly associated with losing interest  in the conversations or simply failing to persuade VO. It's very common for VO to reject even if you have full ride scholarships.</p><p><br></p><p><strong>In my context, i was rejected in my 1st attempt. </strong></p><p><br></p><p>My story and the answers were copied from internet. And it took VO only couple of seconds to deny my visa. As the story were told by may be hundreds of other students already. I later found out, one of my friend mentioned the same exact story i was unfolding infront of VO. We both were handed rejection letter.</p><p><br></p><p><strong>What changed in my 2nd attempt?</strong></p><p>Second attempt was around 15 mins. Conversation went interesting. I didn't change my university for 2nd attempt. But i definitely knew what went wrong in my 1st attempt and changed it for 2nd. Things that changed for better in my 2nd attempt:</p><p><br></p><ul><li>I worked day and night on my own story </li><li>Made it more unique, and interesting than copied story from internet</li><li>My past work and experience i was involved before i applied to USA connected with my plans after graduation and what i wanted to accomplish.</li><li>My confidence level changed telling a fake copied story to unfolding my own personal story</li><li>I took time to craft my skills after 1st rejection, since i am IT major, i went to learn programming language which helped me in my profession.</li><li>First time in the embassy everything was new, the procedure to visa, the surrounding and aroma everything was new and different which made me less confident vs 2nd time, i was already familiar with the process and procedure, which made me more confident.</li></ul><p><br></p><p>Even though the situation i.e rejection was negative, try to change the perspective.</p><p>What is the good thing about rejection? May be it is telling me something that i had missed out on my 1st attempt?</p><p><br></p><p>Also, i guess not changing the university for 2nd attempt, showed my interest on how i really wanted to get into that uni only.</p><p><br></p><p>let me know if this helped you!</p><p><br></p><p>Hopefully 2nd attempt is the way to go!</p><p><br></p><p><br></p>",
      commentImage: null,
      date: '2024-05-23T14:56:32.637Z',
      repliesCount: 0,
      upVoteCount: 2,
      replyTo: null,
      upVoted: false,
      user: {
        _id: '64dd5983d1aa61cf8887f9fa',
        firstName: 'Prashant ',
        lastName: 'Basnet',
        username: 'prashant.basnet324',
        picture: null,
        __typename: 'user'
      },
      __typename: 'Comment'
    },
    {
      _id: '664f5d6774251402ed91bc6e',
      userId: '64f2013acf9b9f861a6e1311',
      postId: '664ed6f5ae04741558fef7f1',
      parentId: null,
      commentText:
        '<p>yes what can u do is do sat again ,, what is ur sat and profile ?? . i beleive uni is not reason of ur rejection so it is not mandatory to change uni but here in nepal vos seek for significant changes so it might be too confusion i was also in sam situation a year ago , my visa got denied on may 11 and i  was too confused . I decided to upgrade my Stat by ginign sat .(1170 to 1390) and i got full tution and 2k extra departmental scholarhip from usm . this time i got my visa . so vo asked me about my changes . he was really impressed  by  my change . \t </p>',
      commentImage: null,
      date: '2024-05-23T15:14:47.712Z',
      repliesCount: 0,
      upVoteCount: 3,
      replyTo: null,
      upVoted: false,
      user: {
        _id: '64f2013acf9b9f861a6e1311',
        firstName: 'nishan',
        lastName: 'thapa',
        username: 'nishanthapa705',
        picture: null,
        __typename: 'user'
      },
      __typename: 'Comment'
    }
  ];

const CommentSection: React.FC = () => {
  return (
    <section className='bg-white dark:bg-black-900 py-8 lg:py-6 antialiased'>
  <div className='max-w-4xl mx-auto px-4'>
    <div className='flex justify-between items-center mb-6'>
      <h2
        className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white'
      >
        Discussion (20)
      </h2>
    </div>
    <form className='mb-6'>
    <div
        className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-blue-800 dark:border-gray-700'
    >
        <label htmlFor='comment' className='sr-only'>Your comment</label>
        <textarea
            id='comment'
            rows={6}
            className='px-0 w-full text-sm sm:text-base text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
            placeholder='Write a comment...'
            required></textarea>
    </div>
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
        >Post comment</button
      >
    </form>
    {
      comments.map((comment) => (
        <article className='p-6 mb-3 text-base bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full'>
          <div className='flex justify-between items-center mb-2'>
            <div className='flex items-center'>
              <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                <img
                  className='mr-2 w-6 h-6 rounded-full'
                  src={comment.user.picture || 'https://via.placeholder.com/40'}
                  alt={comment.user.firstName}
                />
                {comment.user.firstName} {comment.user.lastName}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                <time
                    datetime={comment.date}
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
                  <a
                    href='#'
                    className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Remove
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Report
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
                />
              </svg>
              Reply
            </button>
          </div>
        </article>
      ))
    }
  </div>
</section>
  );
};

export default CommentSection;