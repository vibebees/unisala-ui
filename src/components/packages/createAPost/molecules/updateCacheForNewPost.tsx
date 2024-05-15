import axios from "axios";
import {
  GetAllPostBySpaceCategoryID,
  GetSpaceEvents,
  getNewsFeed,
} from "@datasource/graphql/user";
import { userServer } from "@datasource/servers/endpoints";
import { useAuth } from "@context/AuthContext";

export const updateCacheForNewPost = ({ cache, post, feedType }) => {
  const tags = post?.tags ?? [];
  if (tags?.length === 0) {
    prependPostToNewsFeed(cache, post, feedType);
  } else {
    prependPostToCategory(cache, post, tags[0], feedType); // Assuming tags[0] is the space ID
  }
};

const prependPostToCategory = (cache, post, tags, feedType) => {
  const query = {
    query: getNewsFeed,
    variables: {
      feedQuery: { feedType, page: 0, feedId: tags?._id },
    },
  };
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
        data: updatedPosts,
      },
    },
  });
};

const prependPostToNewsFeed = (cache, post, feedType) => {
  const query = {
    query: getNewsFeed,
    variables: { feedQuery: { feedType, page: 0 } },
  };

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
        data: updatedPosts,
      },
    },
  });
};
const uploadPostImages = async (files, postId) => {
  const formData = new FormData();
  files &&
    files.length > 0 &&
    Array.from(files).forEach((file) => formData.append("image", file as any));

  const response = await axios.post(
    `${userServer}/post/addPostImage/${postId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

const handleUploadSuccess = (client, postId, imageLinks) => {
  client.cache.modify({
    id: client.cache.identify({ __typename: "PostNewsFeed", _id: postId }),
    fields: {
      images(existingImages = []) {
        return [...existingImages, ...imageLinks];
      },
    },
  });
};
export const handlePostCompletion = (data, files, present, dismiss, client) => {
  if (files && files.length > 0) {
    uploadPostImages(files, data.addPost.post._id)
      .then((res) => {
        if (res.success) {
          handleUploadSuccess(client, data.addPost.post._id, res.post.images);
        }
      })
      .finally(() => {
        present({
          duration: 3000,
          message: "Post added",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      });
  } else {
    present({
      duration: 3000,
      message: "Post added",
      buttons: [{ text: "X", handler: () => dismiss() }],
      color: "primary",
      mode: "ios",
    });
  }
};
export const handleMutationError = (error, present, dismiss) => {
  present({
    duration: 5000,
    message: error.message,
    buttons: [{ text: "X", handler: () => dismiss() }],
    color: "danger",
    mode: "ios",
  });
};

// Exported function to update the cache after adding an event
export const updateEventCache = ({ cache, event }) => {
  const cachedData = cache.readQuery({
    query: GetSpaceEvents,
    variables: { spaceId: event.spaceId }, // Ensure 'spaceId' is correctly passed
  });

  if (cachedData && cachedData.getAllEventBySpaceId) {
    cache.writeQuery({
      query: GetSpaceEvents,
      variables: { spaceId: event.spaceId },
      data: {
        getAllEventBySpaceId: {
          ...cachedData.getAllEventBySpaceId,
          events: [...cachedData.getAllEventBySpaceId.events, event],
        },
      },
    });
  } else {
    console.log("Cached data is not available or invalid");
  }
};

// Exported function to handle completion of adding an event
export const handleEventCompletion = (data, files, present, dismiss) => {
  // Logic to execute upon successful completion of the event addition
  if (files && files.length > 0) {
    // Assume some logic to handle files if necessary
  }

  present({
    duration: 3000,
    message: "New event created successfully!",
    buttons: [{ text: "X", handler: () => dismiss() }],
    color: "primary",
    mode: "ios",
  });
};

// Exported function to handle errors during the event mutation
export const handleEventMutationError = (error, present, dismiss) => {
  present({
    duration: 3000,
    message: error?.message || "An error occurred during event creation",
    buttons: [{ text: "X", handler: () => dismiss() }],
    color: "danger",
    mode: "ios",
  });
};


export const updatePostTotalCommentCache = ({ cache, comment, postId, parentId, feedType }) => {
  const query = {
    query: getNewsFeed,
    variables: { feedQuery: { feedType , page: 0 } },
  };

  const existingData = cache.readQuery(query);
  // Extract existing posts from the existing data
  const existingPosts = existingData ? existingData.fetchFeedV2.data : [];
  const updatedPosts = existingPosts.map((post) => {
    if (post._id === postId) {
      return {
        ...post,
        postCommentsCount: post.postCommentsCount + 1,
      };
    }
    return post;
  })
  // Add the new post to the beginning of the array
   // Write the updated posts back to the cache

  cache.writeQuery({
    ...query,
    data: {
      fetchFeedV2: {
        ...(existingData?.fetchFeedV2 || {}),
        data: updatedPosts,
      },
    },
  });
}