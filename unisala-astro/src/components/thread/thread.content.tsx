import React from 'react';
import { useAstroQuery } from '@/datasource/apollo-client';
import { getPostById } from '@/datasource/graphql/post'; // Assume this query exists
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import ThreadSkeleton from '@/components/layout/skeleton/thread';
import SingleThread from '@/components/packages/thread/singleThread/index';
import ThreadHeader from '@/components/layout/thread-header';
import ThreadActionTsx from '@/components/thread/actions/upvote';
import linkifyHtml from 'linkify-html';

const ThreadContent = ({ slug }) => {
  const { data, loading, error } = useAstroQuery(getPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: slug, user: null },
  });

  if (loading) return <ThreadSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const post = data?.getPostById?.post;
  if (!post) return <div>Post not found</div>;

  const heading = extractHeading(post.postText);
  const linkifiedText = linkifyHtml(post.postText, {
    defaultProtocol: 'https',
    className: 'custom-link',
    target: { url: '_blank' }
  });

  return (
    <section className='container max-w-screen-lg space-y-6 pt-12'>
      <ThreadHeader 
        heading={linkifyHtml(heading)} 
        username={post.user.username} 
        date={post.date} 
        claps={post.upVoteCount} 
        comments={post.postCommentsCount} 
      />
      <ul className='pt-6'>
        <li className='flex flex-col max-md:gap-y-4 md:flex-row w-full'>
          <div className='md:basis-32 lg:basis-56 shrink-0 grow-0'>
            {/* User info can be added here if needed */}
          </div>
          <div className='prose dark:prose-invert prose-img:rounded-3xl max-w-none w-full pb-24'>
            <SingleThread post={post} />
          </div>
        </li>
        <ThreadActionTsx
          heading={heading}
          username={post.user.username}
          date={post.date}
          comments={post.postCommentsCount}
          postId={slug}
          initialClaps={post.upVoteCount}
          upVoted={post.upVoted}
        />
      </ul>
    </section>
  );
};

export default ThreadContent;

function extractHeading(text: string) {
  // ... (keep the existing extractHeading function)
}