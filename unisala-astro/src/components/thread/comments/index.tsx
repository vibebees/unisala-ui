import React from 'react';
import CommentForm from './comment.form';
import { useAstroQuery } from '@/datasource/apollo-client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { GetCommentList } from '@/datasource/graphql/user';
import { CommentSkeleton } from './organisms/CommentSkeleton';
import { CommentList } from './organisms/CommentList';
import { getCache } from '@/utils/cache';
import { CtaLogin } from '@/components/ui/ctaLogin';

interface CommentsProps {
  postId: string;
  parentId?: string;
}

const Comments: React.FC<CommentsProps> = ({ postId, parentId }) => {
  const { loading, error, data } = useAstroQuery(GetCommentList, {
    variables: { postId, parentId },
    fetchPolicy: 'cache-and-network',
    context: { server: USER_SERVICE_GQL },
  });

  if (error) {
    return <div className="text-red-500 dark:text-red-400">Error loading comments</div>;
  }

  const userData = getCache('authData');

  const LoggedInUserView = () => (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
      <CommentForm postId={postId} />
      {loading ? (
        <CommentSkeleton />
      ) : (
        <CommentList comments={data?.commentList?.data} nestedComment={false} />
      )}
    </div>
  );

  return (
    <section className="">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({data?.commentList?.data?.length || 0})
          </h2>
        </div>
        {userData ? (
          <LoggedInUserView />
        ) : (
          <CtaLogin message="Login to view comments" />
        )}
      </div>
    </section>
  );
};

export default Comments;