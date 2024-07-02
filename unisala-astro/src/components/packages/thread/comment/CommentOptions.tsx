import React, { FC, useState } from "react";
import { IonIcon, useIonToast } from "@ionic/react";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { useMutation } from "@apollo/client";
import { DeleteComment } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import Actions from "../actions/Actions";

interface CommentOptionsProps {
  _id: string;
  postId: string;
  parentId: string | null | undefined;
  singlePost: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentOptions: FC<CommentOptionsProps> = ({
  _id,
  parentId,
  postId,
  singlePost,
  setEditable,
}) => {
  const [present, dismiss] = useIonToast();
  const [showOptions, setShowOptions] = useState(false);
  const [deleteComment] = useMutation(DeleteComment, {
    context: { server: USER_SERVICE_GQL },
    variables: { id: _id },
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: parentId
            ? "Comment"
            : singlePost
            ? "PostComment"
            : "Post",
          _id: postId,
        }),
        fields: {
          postCommentsCount: (prev) => prev - 1,
        },
      });
      cache.modify({
        id: cache.identify({
          __typename: parentId ? "Comment" : "Post",
          _id: parentId,
        }),
        fields: {
          repliesCount: (prev) => prev - 1,
        },
      });
    },
    onCompleted: (data) => {
      setShowOptions(false);
      const { deleteComment } = data;

      if (deleteComment?.success) {
        present({
          duration: 3000,
          message: "Comment Deleted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      } else {
        present({
          duration: 3000,
          message: "Can not delete comment",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      }
    },
  });

  return (
    <div className="absolute top-2 right-5">
      <div className="relative">
        <button
          className="active:scale-75 duration-200"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <IonIcon icon={ellipsisHorizontalOutline} className="text-2xl" />
        </button>
          {showOptions && (
            <Actions
              DeleteAction={() => {
                deleteComment();
              }}
              EditAction={() => {
                setEditable(true);
                setShowOptions(false);
              }}
            />
          )}
      </div>
    </div>
  );
};

export default CommentOptions;
