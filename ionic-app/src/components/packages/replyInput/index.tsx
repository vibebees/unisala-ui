import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Text, useIonToast } from "@components/defaults";
import RichTextInput from "../input/RichTextInput";
import { ThreadHeader } from "../thread/organism";
import { AddComment } from "@datasource/graphql/user";
import { sendOutline } from "ionicons/icons";
import { useAuth } from "@context/AuthContext";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import "./index.css";
import { Content } from "@components/defaults";
import { AddCommentMutation } from "src/types/gqlTypes/graphql";
import { currentFeedType } from "@utils/lib/URLupdate";
import { useLocation } from "react-router";
import { updateCacheForNewComments } from "./updateCacheForCommets";

interface ReplyInputProps {
  postId?: string;
  isReply: boolean;
  parentId?: string;
  singlePost: boolean;
  replyTo: string;
  feedId?: string;
}

function ReplyInput({
  postId = "",
  isReply,
  parentId = "",
  singlePost,
  feedId,
}: ReplyInputProps) {
  const [commentText, setCommentText] = useState("");
  const [present, dismiss] = useIonToast();
  const { user } = useAuth();
  const feedType = currentFeedType(useLocation())

  const [addComment] = useMutation<AddCommentMutation>(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addComment } }) => updateCacheForNewComments({ cache, addComment, feedType, parentId, feedId, user }),
    onCompleted: () => {
      present({
        duration: 3000,
        message: "Comment added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
      (document.querySelector(".modal-close-btn") as HTMLElement)?.click();
      setCommentText("");
    },
    onError: (error) => {
      console.log(error.message)
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    },
  });

  const submitReply = (e: FormEvent) => {
    e.preventDefault();
    const variables = {
      postId: postId,
      commentText: commentText,
    };

    // if (isReply) {
    //   variables?.replyTo = replyTo;
    //   parentId && variables?.parentId = parentId;
    // }
    addComment({ variables });
  };

  return (
    <Content>
      <form className="  border  flex flex-col  px-5" onSubmit={submitReply}>
        <div
          className="my-3
         "
        >
          {user && (
            <ThreadHeader
              date=""
              firstName={user?.firstName}
              username={user?.username}
              lastName={user?.lastName}
              profilePic={user?.picture || ""}
            />
          )}
        </div>

        <div>
          <RichTextInput
            onChange={(e) => setCommentText(e)}
            value={commentText}
          />
        </div>
        <div>
          <Button expand="full" shape="round" type="submit" className="mt-2">
            <Text className="mr-3">Reply</Text>{" "}
            <Icon icon={sendOutline} />
          </Button>
        </div>
      </form>
    </Content>
  );
}

export default ReplyInput;
