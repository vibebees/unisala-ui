import axios from "axios";
import { GetAllPostBySpaceCategoryID, getNewsFeed } from "@datasource/graphql/user";
import { userServer } from "@datasource/servers/endpoints";
import { useAuth } from "@context/AuthContext";

export const updateCacheForNewPost = ({ cache, post }) => {
  const tags = post?.tags ?? [];
  if (tags?.length === 0) {
    prependPostToNewsFeed(cache, post);
  } else {
    prependPostToCategory(cache, post, tags[ 0 ]); // Assuming tags[0] is the space ID
  }
};


const prependPostToCategory = (cache, post, feedType ) => {


  const query = { query: getNewsFeed, variables: { feedQuery: { feedType: "specificOrg", page: 0 , feedId:feedType?._id} } };
  const existingData = cache.readQuery(query);
  // Extract existing posts from the existing data
  const existingPosts = existingData ? existingData.fetchFeedV2.data : [];
  // Add the new post to the beginning of the array
  const updatedPosts = [post, ...existingPosts];
  cache.writeQuery({
    ...query,
    data: {
      fetchFeedV2: {
        ...(existingData?.fetchFeedV2 || {}),
        data: updatedPosts
      }
    }
  });
};


const prependPostToNewsFeed = (cache, post) => {
  const query = { query: getNewsFeed, variables: { feedQuery: { feedType: "newsfeed", page: 0 } } };

  const existingData = cache.readQuery(query);
  // Extract existing posts from the existing data
  const existingPosts = existingData ? existingData.fetchFeedV2.data : [];
  // Add the new post to the beginning of the array
  const updatedPosts = [post, ...existingPosts];
  // Write the updated posts back to the cache

  cache.writeQuery({
    ...query,
    data: {
      fetchFeedV2: {
        ...(existingData?.fetchFeedV2 || {}),
        data: updatedPosts
      }
    }
  });

};







const uploadPostImages = async (files, postId) => {
  const formData = new FormData();
  files.forEach(file => formData.append("image", file));

  const response = await axios.post(`${userServer}/post/addPostImage/${postId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
const handleUploadSuccess = (client, postId, imageLinks) => {
  client.cache.modify({
    id: client.cache.identify({ __typename: "PostNewsFeed", _id: postId }),
    fields: {
      images(existingImages = []) {
        return [ ...existingImages, ...imageLinks ];
      },
    },
  });
};
export const handlePostCompletion = (data, files, present, dismiss) => {
  if (files && files.length > 0) {
    uploadPostImages(files, data.addPost.post._id)
      .then((res) => {
        if (res.success) {
          handleUploadSuccess(client, data.addPost.post._id, res.post.images);
        }
      })
      .finally(() => {
        present({ duration: 3000, message: "Post added", buttons: [ { text: "X", handler: () => dismiss() } ], color: "primary", mode: "ios" });
      });
  } else {
    present({ duration: 3000, message: "Post added", buttons: [ { text: "X", handler: () => dismiss() } ], color: "primary", mode: "ios" });
  }
};
export const handleMutationError = (error, present, dismiss) => {
  present({ duration: 5000, message: error.message, buttons: [ { text: "X", handler: () => dismiss() } ], color: "danger", mode: "ios" });
};
