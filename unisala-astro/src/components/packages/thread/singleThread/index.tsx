import { useEffect } from 'react';
import { trackEvent } from '../../analytics';
import { useParams } from 'react-router';
import { GetPostById } from '@/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { useAstroQuery } from '@/datasource/apollo-client';
import SingleThread from './template';

const Thread = () => {

  const { id }: any = useParams();

  useEffect(() => {
    trackEvent({
      action: "Thread_page_viewed_"+ id,
      category: "Thread_view",
      label: "thread_view",
    });
  }, []);

  console.log({ id, sending:true })

  const { data, loading } = useAstroQuery(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: { id },
  });

  if (loading || !data?.getPostById?.post) return 'loading';

//   return <SingleThread saved={false} {...data.getPostById.post} />;
return 'SingleThread'
};

export default Thread;
