import React, { useState, useEffect } from 'react';
import CommentForm from './comment.form';
import { useAstroQuery } from '@/datasource/apollo-client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { GetCommentList } from '@/datasource/graphql/user';
import { CommentSkeleton } from './organisms/CommentSkeleton';
import { CommentList } from './organisms/CommentList';
import type { Comment } from "@/types/comment";

interface CommentsProps {
  postId: string;
  parentId?: string;
}




const Comments: React.FC<CommentsProps> = ({ postId, parentId }) => {

  const { loading, error , data} = useAstroQuery(GetCommentList, {
    variables: { postId, parentId },
    fetchPolicy: 'cache-and-network',
    context: { server: USER_SERVICE_GQL },
  });
if(error){
  return <div></div>
}
return (
    <section className='bg-white dark:bg-black-900 py-8 lg:py-6 antialiased'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white'>
            Discussion ({data?.commentList?.data?.length})
          </h2>
        </div>
        <CommentForm 
          postId={postId}
        />
        {loading ? (
          <CommentSkeleton/>
        ) : (
          <CommentList comments={data?.commentList?.data} nestedComment={false} />
        )}
        </div>
    </section>
  );
};

export default Comments;