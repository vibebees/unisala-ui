import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";
import type { PostDraft } from "@/types/post";
 
export interface TextareaEditorProps {
  item?: {
    id?: string;
  };
  postData: PostDraft;
  setPostData: React.Dispatch<React.SetStateAction<PostDraft>>;
  placeholder?: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
}

const TextareaEditor: FC<TextareaEditorProps> = ({ 
  item, 
  postData,
  setPostData,
  placeholder,
  name,
  value,
  setValue
}) => {
  const handleChange = (newContent: string) => {
    setValue(newContent);
    setPostData(prev => {
      const newData = { ...prev, [name]: newContent };
      localStorage.setItem("postData", JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <RichTextInput
      id={item?.id || name}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
};

export { TextareaEditor };