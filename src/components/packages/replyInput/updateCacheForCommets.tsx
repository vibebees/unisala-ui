import { GetCommentList } from "@datasource/graphql/user";
import { updatePostTotalCommentCache } from "@components/packages/createAPost/molecules/updateCacheForNewPost";

export const updateCacheForNewComments = ({ cache, addComment, feedType, parentId }) => {
    const postId = addComment?.data?.postId
    const comment = addComment?.data;
    const commentList: any = cache.readQuery({
      query: GetCommentList,
      variables: {
        postId: postId,
        parentId: parentId,
      },
    });

    commentList &&
      cache.writeQuery({
        query: GetCommentList,
        variables: {
          postId,
          parentId: parentId ?? "",
        },
        data: {
          commentList: {
            __typename: "commentList",
            success: true,
            message: "comments found",
            comments: [comment, ...(commentList?.commentList?.data || [])],
          },
        },
      });

      updatePostTotalCommentCache({
        cache,
        comment: addComment,
        postId: addComment.data.postId,
        feedType
      })
  };
