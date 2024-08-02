import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";
 
interface ITextareaProps {
  item: any;
  postData: any;
  setPostData: any;
}

const TextareaEditor: FC<ITextareaProps> = ({ item, postData, setPostData =() =>{}, theme }) => {
  return (
    <>
      {/* <Typography className="text-sm mb-1">{item?.name}</Typography> */}
      <div>
        <RichTextInput
          id={item?.id}
          onChange={(e) => setPostData((prev: any) => {
            let newData = { ...prev, postText: e };
            localStorage.setItem("postData", JSON.stringify(newData));
            return newData;
          })}
          value={postData?.postText} theme={"light"}        />
      </div>
    </>
  );
};

export { TextareaEditor };
