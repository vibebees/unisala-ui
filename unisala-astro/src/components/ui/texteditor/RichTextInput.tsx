import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './RichTextInput.css'

interface RichTextInputProps {
  initialValue: string;
  key?: string;
  placeholder?: string;
  theme?: 'light' | 'dark';
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  initialValue,
  placeholder = "Write something...",
  key = "new.story.postText",
  theme = 'light'
}) => {
  const [content, setContent] = useState<string>(initialValue);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet', 
    'indent',
    'color', 'background',
    'link', 'image', 'video'
  ];

  useEffect(() => {
    const savedContent = localStorage.getItem(key);
    if (savedContent) {
      setContent(savedContent);
    } else {
      setContent(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (content !== undefined) {
      localStorage.setItem(key, content);
    }
  }, [key, content]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className={`rich-text-editor-container ${theme}`}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextInput;