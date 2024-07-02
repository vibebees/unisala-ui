import { bookmark } from "ionicons/icons";
import { useMutation } from "@apollo/client";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import {
  GetSavedList,
  SavePost,
  UnSavePost,
} from "@/datasource/graphql/user";
import React, { FC } from "react";
import { BookMarkIcon } from "@/components/packages/icons";
import { trackEvent } from "@/components/packages/analytics";
import { useAuth } from "@/context/AuthContext";
import { cn } from '@/lib/utils';

interface SaveProps {
  postId: string;
  saved: boolean;
  thread: any;
}

const Save: FC<SaveProps> = ({ postId, saved, thread }) => {
  console.log({
    saved

  })
  const {user} = useAuth();
  const userId = user?.id
  const [present, dismiss] = () => {
    return  [() => {}, () => {}]
  }
  const [save] = useMutation(saved ? UnSavePost : SavePost, {
    variables: { postId },
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      trackEvent({
        action: saved ? "Unsaved_" : "Saved_" +  postId,
        category: "engagement",
        label: saved ? "Unsaved_" : "Saved_" + postId + '_by_' + userId,
      })
      cache.modify({
        id: cache.identify({
          __typename: "Post",
          id: postId,
        }),
        fields: {
          saved: () => data?.save?.message === "saved",
        },
      });
      if (data?.save?.message === "saved") {
        const data = cache.readQuery({
          query: GetSavedList,
          variables: { userId, page: 0 },
        });
        data &&
          cache.writeQuery({
            query: GetSavedList,
            variables: { userId, page: 0 },
            data: {
              ...data,
              savedList: {
                ...data.savedList,
                Posts: [{ ...thread, saved: true }, ...data.savedList.Posts],
              },
            },
          });
      }
    },
    onCompleted: () => {
      present({
        duration: 3000,
        message: saved ? "Unsaved" : "Saved",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
    },
  });

  return (
    <button
      className="ThreadFooterBtn"
      onClick={save}
      style={{ cursor: "pointer" }}
    >
      {/* <Icon
        color={saved ? "secondary" : "medium"}
        style={{
          margin: "0px",
        }}
        className="text-2xl max-md:text-lg"
        icon={bookmark}
      /> */}
      <BookMarkIcon
        className={cn("w-6 ", saved ? "fill-blue-600" : "fill-neutral-400")}
      />
    </button>
  );
};

export default Save;
