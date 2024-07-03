// import { useEffect } from 'react';
// import { trackEvent } from '../../analytics';
// import { useParams } from 'react-router';
import { GetPostById } from '@/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { useAstroQuery } from '@/datasource/apollo-client';
import SingleThread from './template';
import { ThreadSkeleton } from '@/components/packages/skeleton/thread';

const Thread = () => {

//   const { id }: any = useParams();
const id = '667adc362bf59de35465faa1'

//   useEffect(() => {
//     trackEvent({
//       action: "Thread_page_viewed_"+ id,
//       category: "Thread_view",
//       label: "thread_view",
//     });
//   }, []);


  const { data, loading } = useAstroQuery(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: { id },
  });

  if (loading || !data?.getPostById?.post) return <ThreadSkeleton />;

  return <SingleThread saved={false} {...data.getPostById.post} />;
};

export default Thread;
