import { useApolloClient, useMutation } from "@apollo/client";
import clsx from "clsx";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  AddPost,
  AddSpaceEvent,
  GetSpaceEvents,
} from "@datasource/graphql/user";
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
import { updateCacheForNewPost, handlePostCompletion, handleMutationError } from "./updateCacheForNewPost";
import { useAuth } from "@context/AuthContext";

const Form = ({ metaData = {}, postData, setPostData = () => {}, allProps = {} }) => {
  const { tags } = allProps;
   const [files, setFiles] = useState(null);
  const [present, dismiss] = useIonToast();
  const { user} = useAuth()
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
    update: (cache, { data: { addPost } }) => updateCacheForNewPost({cache, post: addPost.post, tags}),
    onCompleted: (data) => handlePostCompletion(data, files, present, dismiss),
    onError: (error) => handleMutationError(error, present, dismiss),
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
      addEvent({
        variables: data,
      });
      /* eslint-disable */
    } else {
      if (postData?.postText?.length > 0 || files?.length > 0) {
        addPost({
          variables: {
            ...postData,
            user
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
