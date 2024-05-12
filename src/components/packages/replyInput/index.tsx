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
import { AddCommentMutation } from "src/types/gqlTypes/graphql";
import { updatePostCommentsCache } from "../createAPost/molecules/updateCacheForNewPost";

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
}: ReplyInputProps) {
  const [commentText, setCommentText] = useState("");
  const [present, dismiss] = useIonToast();
  const { user } = useAuth();

  const [addComment] = useMutation<AddCommentMutation>(AddComment, {
    context: { server: USER_SERVICE_GQL },
    /*
    update: (cache, data) => {
      const comment = data.data?.addComment?.data;
      console.log("comment", comment);
      // cache.modify({
      //   id: cache.identify({
      //     __typename: isReply
      //       ? "Comment"
      //       : singlePost
      //       ? "PostComment"
      //       : "PostNewsFeed",
      //     id: postId,
      //   }),
      //   fields: {
      //     postCommentsCount: (prev) => prev + 1,
      //   },
      // });
      // cache.modify({
      //   id: cache.identify({
      //     __typename: isReply
      //       ? "Comment"
      //       : singlePost
      //       ? "PostComment"
      //       : "PostNewsFeed",
      //     id: parentId,
      //   }),
      //   fields: {
      //     repliesCount: (prev) => prev + 1,
      //   },
      // });

      const commentList: any = cache.readQuery({
        query: GetCommentList,
        variables: {
          postId: postId,
          parentId: parentId,
        },
      });

      console.log('commentList before cacheing ', commentList)
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

        const commentList2: any = cache.readQuery({
          query: GetCommentList,
          variables: {
            postId: postId,
            parentId: parentId,
          },
        });
        console.log('commentList2 after cacheing ', commentList2)


    },

    */
    update: (cache, { data: { addComment } }) => {
      console.log('-------00000----')
      console.log("addComment", addComment.data.postId);
      updatePostCommentsCache({
        cache,
        comment: addComment,
        postId: addComment.data.postId
      })
    },
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
