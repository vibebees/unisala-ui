// import React  from 'react';
import SingleThread from './template';
import { ThreadSkeleton } from '@/components/packages/skeleton/thread';
// import { trackEvent } from '@/components/packages/analytics';

const Thread = ({ post }: { post: any }) => {
  // useEffect(() => {
  //   if (post) {
  //     trackEvent({
  //       action: "Thread_page_viewed_" + post.id,
  //       category: "Thread_view",
  //       label: "thread_view",
  //     });
  //   }
  // }, [post]);

  if (!post) return <ThreadSkeleton />;

  return <SingleThread {...post} />;
};

export default Thread;