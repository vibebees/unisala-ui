import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { IonButton, IonIcon, IonText, useIonToast } from "@ionic/react";
import RichTextInput from "../input/RichTextInput";
import { ThreadHeader } from "../thread/organism";
import { AddComment, GetCommentList } from "@datasource/graphql/user";
import { sendOutline } from "ionicons/icons";
import { useAuth } from "@context/AuthContext";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import "./index.css";
import { Content } from "@components/defaults";

interface ReplyInputProps {
  postId?: string;
  isReply: boolean;
  parentId?: string;
  singlePost: boolean;
  replyTo: string;
}

function ReplyInput({
  postId = "",
  isReply,
  parentId = "",
  singlePost,
  replyTo,
}: ReplyInputProps) {
  const [commentText, setCommentText] = useState("");
  const [present, dismiss] = useIonToast();
  const { user } = useAuth();

  const [addComment] = useMutation(AddComment, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data: { addComment } }) => {
      cache.modify({
        id: cache.identify({
          __typename: isReply
            ? "Comment"
            : singlePost
            ? "PostNewsFeed"
            : "Post",
          id: postId,
        }),
        fields: {
          postCommentsCount: (prev) => prev + 1,
        },
      });
      cache.modify({
        id: cache.identify({
          __typename: isReply
            ? "Comment"
            : singlePost
            ? "PostComment"
            : "PostNewsFeed",
          id: parentId,
        }),
        fields: {
          repliesCount: (prev) => prev + 1,
        },
      });
      const post = cache.readQuery({
        query: GetCommentList,
        variables: {
          postId: postId,
          parentId,
        },
      });
      post &&
        cache.writeQuery({
          query: GetCommentList,
          variables: {
            postId,
            parentId,
          },
          data: {
            commentList: {
              __typename: "commentList",
              success: true,
              message: "comments found",
              comments: [
                addComment.comment,
                ...(post?.commentList?.data || []),
              ],
            },
          },
        });
    },
    onCompleted: () => {
      present({
        duration: 3000,
        message: "Comment added",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
      setCommentText("");
    },
    onError: (error) => {
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
      <form className="  border   flex flex-col  px-5" onSubmit={submitReply}>
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
          <IonButton expand="full" shape="round" type="submit" className="mt-2">
            <IonText className="mr-3">Reply</IonText>{" "}
            <IonIcon icon={sendOutline} />
          </IonButton>
        </div>
      </form>
    </Content>
  );
}

export default ReplyInput;
