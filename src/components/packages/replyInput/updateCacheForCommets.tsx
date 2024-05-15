import { GetCommentList } from "@datasource/graphql/user";
import { updatePostTotalCommentCache } from "@components/packages/createAPost/molecules/updateCacheForNewPost";
import { useAuth } from "@context/AuthContext";

export const updateCacheForNewComments = ({ cache, addComment,user, feedType, parentId, feedId }) => {
    const postId = addComment?.data?.postId
    const comment = {
        ...addComment?.data,
        user: user
    };
    const existingData: any = cache.readQuery({
      query: GetCommentList,
      variables: {
        postId: postId,
        parentId: parentId,
      },
    });
    const commentList = existingData?.commentList?.data ?? [];

    commentList &&
      cache.writeQuery({
        query: GetCommentList,
        variables: {
          postId,
          parentId: parentId ?? ''
        },
        data: {
          commentList: {
            ...(existingData.commentList),
            data: [comment, ...commentList]
          }
        }
      });

      updatePostTotalCommentCache({
        cache,
        postId: addComment.data.postId,
        feedType,
        feedId
      })
  };
