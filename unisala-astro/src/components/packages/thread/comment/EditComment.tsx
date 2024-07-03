import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useMutation } from "@apollo/client";
import { EditComment } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";

interface EditCommentsProps {
  _id: string;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}

const EditComments = ({
  _id,
  setEditable,
  text = "",
}: EditCommentsProps) => {
  const [commentText, setCommentText] = useState<string>(text);
  const [present, dismiss] = [() => {}, () => {}];
  const handleChange = (value: string) => {
    setCommentText(value);
  };
  const [editComment] = useMutation(EditComment, {
    context: { server: USER_SERVICE_GQL },
    variables: { commentId: _id, commentText },

    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: "Comment",
          id: _id,
        }),
        fields: {
          commentText: () => commentText,
        },
      });
    },
    onCompleted: (data) => {
      const { editComment } = data;
      setEditable(false);
      if (editComment?.status?.success) {
        setEditable(false);
        // present({
        //   duration: 3000,
        //   message: "Post Updated",
        //   buttons: [{ text: "X", handler: () => dismiss() }],
        //   color: "primary",
        //   mode: "ios",
        // });
      } else {
        // present({
        //   duration: 3000,
        //   message: editComment.message,
        //   buttons: [{ text: "X", handler: () => dismiss() }],
        //   color: "primary",
        //   mode: "ios",
        // });
      }
    },
  });

  return (
    <div className="px-5">
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        defaultValue={commentText}
        className="h-48 mb-8 text-black"
      />
      <br />
      <button
        // fill="clear"
        className="ion-no-padding capitalize px-4 font-semibold text-black hover:bg-[#eae8e8] rounded-2xl transition ease delay-200"
        // size="small"
        // style={{ "--ripple-color": "transparent" }}
        onClick={() => setEditable(false)}
      >
        Cancel
      </button>
      <button
        className="ion-no-padding capitalize font-bold px-4 text-white bg-blue-500 rounded-2xl transition ease delay-200 hover:bg-blue-600"
        // fill="clear"
        // size="small"
        onClick={() =>editComment()}
        // style={{ "--ripple-color": "transparent" }}
      >
        Save
      </button>
    </div>
  );
};

export default EditComments;
