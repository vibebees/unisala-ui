import React, { type FC } from "react";
import RichTextInput from "./texteditor/RichTextInput";

export interface TextareaEditorProps {
  placeholder?: string;
  draftKey: string;
  initialValue: string;
  onContentChange: (content: string) => void;
}

const TextareaEditor: FC<TextareaEditorProps> = ({ 
  placeholder,
  draftKey,
  initialValue,
  onContentChange

}) => {

  return (
    draftKey !=='.postText' && <RichTextInput
      draftKey={draftKey}
      placeholder={placeholder}
      initialValue={initialValue}
      onContentChange={onContentChange}
    />
  );
};

export { TextareaEditor };