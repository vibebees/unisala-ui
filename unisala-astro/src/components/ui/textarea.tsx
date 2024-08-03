import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";
 

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    item: any;
    postData: any;
    setPostData: any;
    placeholder?: string;
}

const TextareaEditor: FC<TextareaProps> = ({ item, postData,placeholder, setPostData =() =>{}}) => {
  return (
    <>
        <RichTextInput
          id={item?.id}
          placeholder={placeholder}
          onChange={(e) =>setPostData && setPostData((prev: any) => {
            let newData = { ...prev, postText: e };
            localStorage.setItem("postData", JSON.stringify(newData));
            return newData;
          })}
          value={postData?.postText} 
             />
    </>
  );
};

export { TextareaEditor };
