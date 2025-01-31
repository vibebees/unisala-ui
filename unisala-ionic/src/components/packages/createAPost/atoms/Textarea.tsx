import React, { FC } from "react";
import { Typography } from "@components/defaults";
import RichTextInput from "@components/packages/input/RichTextInput";

interface ITextareaProps {
  item: any;
  postData: any;
  setPostData: any;
}

const Textarea: FC<ITextareaProps> = ({ item, postData, setPostData }) => {
  return (
    <>
      <Typography className="text-sm mb-1">{item?.name}</Typography>
      <div>
        <RichTextInput
          id={item?.id}
          onChange={(e) =>
            setPostData((prev: any) => {
              let newData = { ...prev, postText: e };
              localStorage.setItem("postData", JSON.stringify(newData));
              return newData;
            })
          }
          value={postData?.postText}
        />
      </div>
    </>
  );
};

export { Textarea };
