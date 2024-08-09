import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";

export interface TextareaEditorProps {
  placeholder?: string;
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