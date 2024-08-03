import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";
import type { PostDraft } from "@/types/post";
 
export interface TextareaEditorProps {
  item?: {
    id?: string;
  };
  postData: PostDraft;
  placeholder?: string;
  name: string;
  key: string;
}

const TextareaEditor: FC<TextareaEditorProps> = ({ 
  placeholder,
  key
}) => {


  return (
    <RichTextInput
      key={key}
      placeholder={placeholder}
      initialValue={""}
    />
  );
};

export { TextareaEditor };