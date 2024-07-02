import React, { useState, useEffect } from 'react';
import SingleThread from '@/components/thread/singlethread';
import { ThreadHeader } from '@/components/thread/threadHeader';
import linkifyHtml from 'linkify-html';
import { formatDate } from '@/lib/utils';

function extractHeading(text) {
  // ... (keep your existing extractHeading function)
}

const Thread = ({ slug }) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ApolloClient, InMemoryCache } = await import('@apollo/client');
        const { GetPostById } = await import('@/graphql/user');
        const { USER_SERVICE_GQL } = await import('@/datasource/servers/types');

        const client = new ApolloClient({
          uri: 'YOUR_GRAPHQL_ENDPOINT', // Replace with your actual endpoint
          cache: new InMemoryCache(),
        });

        const { data } = await client.query({
          query: GetPostById,
          variables: { id: slug },
          context: { server: USER_SERVICE_GQL },
        });

        setPostData(data.getPostById.post);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!postData) return <div>No data available</div>;

  const heading = extractHeading(postData.postText);
  const linkifiedText = linkifyHtml(postData.postText, {
    defaultProtocol: 'https',
    className: 'custom-link',
    target: { url: '_blank' }
  });

  return (
    <section className='container max-w-screen-lg space-y-6 pt-12'>
      <ThreadHeader
        heading={heading}
        username={postData.user.username}
        claps={postData.upVoteCount}
        comments={postData.postCommentsCount}
        date={formatDate(new Date(postData.date))}
      />
      <ul className='pt-6'>
        <li className='flex flex-col max-md:gap-y-4 md:flex-row w-full'>
          <div className='prose dark:prose-invert prose-img:rounded-3xl max-w-none w-full pb-24'>
            <SingleThread
              htmlText={linkifiedText}
              _id={postData._id}
              tags={postData.tags}
              videoURL={postData.videoURL}
            />
          </div>
        </li>
        {/* You can uncomment ThreadAction here if needed */}
      </ul>
      {/* You can uncomment Comments here if needed */}
    </section>
  );
};

export default Thread;