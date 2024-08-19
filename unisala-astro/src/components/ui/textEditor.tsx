import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";

export interface TextareaEditorProps {
  placeholder?: string;
  draftKey: string;
}

const TextareaEditor: FC<TextareaEditorProps> = ({ 
  placeholder,
  draftKey
}) => {

console.log()
  return (
    draftKey !=='.postText' && <RichTextInput
      draftKey={draftKey}
      placeholder={placeholder}
      initialValue={""}
    />
  );
};

export { TextareaEditor };