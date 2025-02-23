import { useMutation, useApolloClient } from "@apollo/client";
import React, { Dispatch, FC, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { AddPost, AddSpaceEvent } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { Typography } from "../../../defaults";
import { Button, useIonToast } from "../../../defaults/index";
import GenerateRatingComponent from "../atoms/Rating";
import {
  InputComponent,
  CheckboxComponent,
  DateComponent,
  Textarea,
} from "../atoms";
import AsyncSelectAtom from "../atoms/AsyncSelect";
import SelectAtom from "../atoms/Select";
import ImageUpload from "./ImageUpload";
import {
  updateCacheForNewPost,
  handlePostCompletion,
  handleMutationError,
  updateEventCache,
  handleEventCompletion,
  handleEventMutationError,
} from "./updateCacheForNewPost";
import { useAuth } from "@context/AuthContext";
import { useLocation, useParams } from "react-router";
import { currentFeedType, getFeedChipValues, getQueryParams } from "@utils/lib/URLupdate";
import { usePostUploading } from "../createAPostContext";
import { trackEvent } from "@components/analytics";

interface IFormProps {
  metaData?: any;
  postData: TPostDataType;
  setPostData: Dispatch<any>;
}

const Form: FC<IFormProps> = ({ metaData = {}, postData, setPostData }) => {
  const { startLoading, stopLoading } = usePostUploading();

  const { tags } = postData;
  const [files, setFiles] = useState<FileList | null>(null);
  const [present, dismiss] = useIonToast();
  const { user } = useAuth();
  const client = useApolloClient();
  const location = useLocation();
  const path = location.pathname;
  const isSpace = path.startsWith('/space/');
  const isOrg = path.startsWith('/org/');

  const queryParams = getQueryParams(location.search);
  const filterParams = queryParams.getAll('f'); // Get all 'f' parameters as an array

  postData.postTags = {
    tagType: isSpace ? "space" : isOrg ? "org" : "uni",
    tagId:tags && tags.length > 0 ?tags[0] :'',
  };
  const feedType = currentFeedType(useLocation());

  const [addPost] = useMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addPost } }) =>
      updateCacheForNewPost({ cache, post: addPost.post, feedType, filterByTags: getFeedChipValues(filterParams) }),
    onCompleted: (data) => {
      handlePostCompletion(data, files, present, dismiss, client);

      stopLoading();
    },
    onError: (error) => {
      handleMutationError(error, present, dismiss);
      stopLoading();
    },
  });

  const [addEvent] = useMutation(AddSpaceEvent, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addOrgSpaceEvent } }) =>
      updateEventCache({ cache, event: addOrgSpaceEvent.data }),
    onCompleted: (data) => handleEventCompletion(data, files, present, dismiss),
    onError: (error) => handleEventMutationError(error, present, dismiss),
  });

  const handleSubmit = (e) => {
    startLoading();
    e.preventDefault();

    trackEvent({
      action: "AddPost_"+ metaData.id +"_Submitted",
      category: "AddPost",
      label: "Submitted AddPost Flow",

    })
    if (files && files?.length > 10) {
      present({
        duration: 3000,
        message: "Maximum allowed files is 4.",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
      trackEvent({
        action: "Add_Post_Error",
        category: "AddPost",
        label: "Exceeded File Limit",
        value: files.length,
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
        ...postData,
      };
      addEvent({
        variables: data,
      });
      /* eslint-disable */
    } else {
      if (postData?.postText?.length > 0 || (files && files?.length > 0)) {
        delete postData.tags;
        addPost({
          variables: {
            ...postData,
            user,
          },
        });
      } else {
        trackEvent({
          action: "AddPost_Empty_Content_Error",
          category: "AddPost",
          label: "Empty Post",
        });
        present({
          duration: 3000,
          message: "Please include something to post",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
    }
    const btn = document.querySelector(
      ".modal-close-btn"
    ) as HTMLButtonElement | null;
    btn && btn.click();
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
          />
        ) : (
          <SelectAtom
            options={item.options}
            item={item}
            setPostData={setPostData}
            postData={postData}
          />
        )}
      </>
    );
  };

  const generateHTML = (item) => {
    switch (item?.type) {
      case "input":
        return InputComponent({ item, postData, setPostData });
      case "checkbox":
        return CheckboxComponent({ item, postData, setPostData });
      case "select":
        return item?.rating
          ? GenerateRatingComponent({ item, setPostData })
          : generateSelectTag(item);
      case "textarea":
        return Textarea({ item, postData, setPostData });
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
        <Button type="submit">Submitt</Button>
      </form>
    </div>
  );
};

export default Form;
