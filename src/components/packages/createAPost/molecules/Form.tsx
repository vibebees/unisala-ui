import { useApolloClient, useMutation } from "@apollo/client";
import axios from "axios";
import clsx from "clsx";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  AddPost,
  AddSpaceEvent,
  GetAllPostBySpaceCategoryID,
  GetSpaceEvents,
  getNewsFeed,
} from "@datasource/graphql/user";
import { userServer } from "@datasource/servers/endpoints";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { Typography } from "../../../defaults";
import { Button, Label, useIonToast } from "../../../defaults/index";
import {
  InputComponent,
  CheckboxComponent,
  DateComponent,
  Textarea,
} from "../atoms";
import AsyncSelectAtom from "../atoms/AsyncSelect";
import SelectAtom from "../atoms/Select";
import ImageUpload from "./ImageUpload";

const Form = ({ metaData = {}, postData, setPostData = () => {}, allProps = {} }) => {
  const { tags } = allProps;
  const { user } = useSelector((state) => state?.userProfile);
  const [files, setFiles] = useState(null);
  const [present, dismiss] = useIonToast();
  const location = useLocation();
  const client = useApolloClient();

  const formData = new FormData();
  let RatingData = [
    {
      value: 1,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Enraged%20Face.png",
      Emojis: "😡",
    },
    {
      value: 2,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png",
      Emojis: "😞",
    },
    {
      value: 3,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Neutral%20Face.png",
      Emojis: "😐",
    },
    {
      value: 4,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png",
      Emojis: "😊",
    },
    {
      value: 5,
      imageURL:
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Heart-Eyes.png",
      Emojis: "😍",
    },
  ];
  const [ratings, setRatings] = useState({});

  const handleRatingChange = (itemId, value, name) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [itemId]: value,
    }));
    // Update the postData with the new rating
    // const postText = htmlForEditor(
    //   postData?.postText,
    //   name,
    //   RatingData.find((val) => val.value === value)?.Emojis
    // )
    setPostData((prev) => ({
      ...prev,
      // postText,
      [itemId]: value,
    }));
  };

  const generateRatingComponent = (item) => {
    return (
      <>
        <Label>{item.name}</Label>
        <div className="flex justify-start gap-x-2">
          {RatingData.map((val, index) => (
            <div
              key={index}
              className="mt-2 cursor-pointer"
              onClick={() => handleRatingChange(item?.id, val.value, item.name)}
            >
              <span
                className={clsx("text-4xl transition ease-linear", {
                  grayscale: ratings[item?.id] !== val.value,
                })}
              >
                {ratings[item?.id] !== val.value ? (
                  val.Emojis
                ) : (
                  <img src={val.imageURL} alt="" width={48} />
                )}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };
  const [addPost] = useMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },

    update: (cache, { data: { addPost } }) => {
      const post = {
        postText: addPost?.post.postText,
        date: addPost?.post.date,
        _id: addPost?.post._id,
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture || null,
        },
        upVoteCount: 0,
        postCommentsCount: 0,
        upVoted: false,
        type: "post",
        saved: false,
        images: addPost?.post.images || [],
        __typename: "PostNewsFeed",
      };

      // Handling when no tags are associated with the post
      if (!tags) {
        console.log("no tags");
        const cachedData = cache.readQuery({
          query: getNewsFeed,
          variables: {
            feedQuery: {
              feedType: "newsfeed",
              page: 0,
            },
          },
        });

        // Prepending the new post to the existing newsfeed data
        if (cachedData) {
          cache.writeQuery({
            query: getNewsFeed,
            variables: {
              feedQuery: {
                feedType: "newsfeed",
                page: 0,
              },
            },
            data: {
              fetchFeedV2: [post, ...(cachedData.fetchFeedV2.data)],
            },
          });
        } else {
          // If no existing data is found, initialize with the new post
          cache.writeQuery({
            query: getNewsFeed,
            variables: {
              feedQuery: {
                feedType: "newsfeed",
                page: 0,
              },
            },
            data: {
              fetchFeedV2: [post]
            },
          });
        }
      } else {
        // Handling when tags are associated with the post
        const data = cache.readQuery({
          query: GetAllPostBySpaceCategoryID,
          variables: { id: tags[0] },  // Assuming tags[0] is the space ID
        });

        // Prepending the new post to the specific category data
        if (data) {
          cache.writeQuery({
            query: GetAllPostBySpaceCategoryID,
            variables: { id: tags[0] },
            data: {
              getAllPostBySpaceCategoryID: {
                ...data.getAllPostBySpaceCategoryID,
                posts: [post, ...data.getAllPostBySpaceCategoryID.posts],
              },
            },
          });
        } else {
          // If no existing data is found, initialize with the new post
          cache.writeQuery({
            query: GetAllPostBySpaceCategoryID,
            variables: { id: tags[0] },
            data: {
              getAllPostBySpaceCategoryID: {
                posts: [post]
              },
            },
          });
        }
      }
    },

    onCompleted: async (data) => {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("image", files[i]);
        }
        const res = await axios.post(
          userServer + `/post/addPostImage/${data.addPost.post._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (res.data.success) {
          const imageLinks = res.data.post.images;
          client.cache.modify({
            id: client.cache.identify({
              __typename: "PostNewsFeed",
              _id: data.addPost.post._id,
            }),
            fields: {
              images(existingImages = []) {
                return [...existingImages, ...imageLinks];
              },
            },
          });
        }
      }
      present({
        duration: 3000,
        message: "Post added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
      // setfile("")
    },
    onError: (error) => {
      present({
        duration: 5000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  const [addEvent, { data }] = useMutation(AddSpaceEvent, {
    context: {
      server: USER_SERVICE_GQL,
    },

    update: (cache, { data }) => {
      // Attempt to read the existing query from the cache
      const cachedData = cache.readQuery({
        query: GetSpaceEvents,
        variables: {
          spaceId: tags[0],
        },
      });

      // Check if cachedData and cachedData.getAllEventBySpaceId are not null
      if (cachedData && cachedData.getAllEventBySpaceId) {
        // Proceed to update the cache only if the data is not null
        data &&
          cache.writeQuery({
            query: GetSpaceEvents,
            context: {
              server: USER_SERVICE_GQL,
            },
            variables: {
              spaceId: tags[0],
            },
            data: {
              getAllEventBySpaceId: {
                ...cachedData.getAllEventBySpaceId,
                event: [
                  // data.addOrgSpaceEvent.event,
                  ...cachedData.getAllEventBySpaceId.data,
                ],
              },
            },
          });
      } else {
        // Handle the case where cachedData or getAllEventBySpaceId is null
        console.log("Cached data is not available or invalid");
      }
    },
    onError: (err) => {
      present({
        duration: 3000,
        message: err?.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
    onCompleted: async ({ addOrgSpaceEvent }) => {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("image", files[i]);
        }
        const res = await axios.post(
          userServer +
            `/spaceOrg/addSpaceEventImage/${addOrgSpaceEvent.data._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }
      present({
        duration: 3000,
        message: "New event created",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (files?.length > 4) {
      present({
        duration: 3000,
        message: "Maximum allowed files is 4.",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
      return;
    }

    if (metaData.id === "event") {
      const data = {
        spaceId: tags[0],
        title: postData.title,
        description: postData.postText,
        address: postData.address,
        eventDate: postData.eventDate,
      };
      University;
      addEvent({
        variables: data,
      });
      /* eslint-disable */
    } else {
      if (postData?.postText?.length > 0 || files?.length > 0) {
        addPost({
          variables: {
            ...postData,
          },
        });
      } else {
        present({
          duration: 3000,
          message: "Please include something to post",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    }
    const btn = document.querySelector(".modal-close-btn");
    btn.click();
    // setCreateAPostPopUp(false)
    // params.delete("create")
    // params.delete("type")

    // histroy.push({
    //   search: params.toString()
    // })
  };

  const generateSelectTag = (item) => {
    return (
      <>
        <Typography variant="p" className="text-sm">
          {item.name}
        </Typography>
        {item.api ? (
          <AsyncSelectAtom
            item={item}
            setPostData={setPostData}
            postData={postData}
            className="text-sm"
          />
        ) : (
          <SelectAtom
            options={item.options}
            item={item}
            setPostData={setPostData}
            postData={postData}
            className="text-sm"
          />
        )}
      </>
    );
  };

  const generateHTML = (item) => {
    switch (item?.type) {
      case "input":
        return InputComponent(item, postData, setPostData);
      case "checkbox":
        return CheckboxComponent(item, postData, setPostData);
      case "select":
        return item?.rating
          ? generateRatingComponent(item)
          : generateSelectTag(item);
      case "textarea":
        return Textarea(item, postData, setPostData);
      case "date":
        return DateComponent(item, postData, setPostData);
      default:
        return null;
    }
  };

  return (
    <div className="px-2">
      <form onSubmit={handleSubmit}>
        {metaData?.edges?.map((item, index: number) => {
          return (
            <React.Fragment key={index}>
              <div className="mt-4">{item && generateHTML(item)}</div>
            </React.Fragment>
          );
        })}
        <ImageUpload files={files} setFiles={setFiles} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Form;
