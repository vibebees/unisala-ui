/* eslint-disable no-unused-vars */
import { authInstance } from "@/datasource/api/axiosInstance";
import { universityServiceAddress } from "@/datasource/servers";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import React, { type FC, useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import './quil.css'

const Link = Quill.import("formats/link");
Link.sanitize = function (url: string) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `http://${url}`;
  }
  return url;
};

const getUniversitites = async (searchTerm: string) => {
  try {
    const res = await authInstance.get(
      `${universityServiceAddress}/keyword/schoolname/${searchTerm.trim().length === 0 ? "New York" : searchTerm.trim()
      }/5`
    );
    const formattedData = res.data.map((item: any) => {
      return {
        id: item?.unitId,
        value: item?.name,
        link: `https://unisala.com/university/${item?.name}`,
      };
    });

    return formattedData;
  } catch (error) {
    console.log(error);
  }
};

Quill.register(Link, true);

interface RichTextInputProps {
  value: string;
  onChange: (e: any) => void;
  id?: string;
  theme?: string;
  placeholder?: string;
}

const RichTextInput: FC<RichTextInputProps> = ({
  value: initialValue,
  onChange,
  id = "rich-text-input",
  theme = "snow",
  placeholder = "Write something...",
}) => {
  const quillRef = useRef<any>(null);
  const [content, setContent] = useState(initialValue);

  const mention = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      linkTarget: "_blank",

      source: async function (searchTerm: string, renderList: any) {
        const data = await getUniversitites(searchTerm);
        renderList(data, searchTerm);
      },
      onSelect: (item: any, insertItem: any) => {
        const editor = quillRef.current?.getEditor();
        insertItem({
          denotationChar: "",
          value: "",
        });
        const cursorPosition = editor.getSelection().index;
        editor.insertText(cursorPosition - 2, item.value, "link", item.link);
        editor.setSelection(cursorPosition);
      },
    }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [
        { color: [] },
        { background: [] },
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "link",
        { list: "ordered" },
        { list: "bullet" },
        { align: [] },
        { indent: "-1" },
        { indent: "+1" },
        "clean",
      ],
    ],
    clipboard: {
      matchVisual: false,
    },
    mention,
  };

  useEffect(() => {
    // Load content from localStorage when component mounts
    const savedContent = localStorage.getItem(id);
    if (savedContent) {
      setContent(savedContent);
      onChange(savedContent);
    } else {
      // If no saved content, use the initial value
      setContent(initialValue);
    }
  }, [id, onChange, initialValue]);

  useEffect(() => {
    // Save content to localStorage whenever it changes
    if (content !== undefined) {
      localStorage.setItem(id, content);
    }
  }, [id, content]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  return (
    <div>
      <div className="min-h-72 text-black relative flex flex-col">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          id={id}
          placeholder={placeholder}
          className="flex flex-col-reverse h-full w-full transition-colors duration-200 ease-in-out
     text-gray-900 dark:text-white
     bg-transparent
     [&_.ql-editor]:bg-transparent
     [&_.ql-editor]:text-gray-900 [&_.ql-editor]:dark:text-white
     [&_.ql-editor.ql-blank::before]:text-gray-400 [&_.ql-editor.ql-blank::before]:dark:text-gray-500
     [&_.ql-toolbar]:bg-gray-100 [&_.ql-toolbar]:dark:bg-gray-700
     [&_.ql-toolbar]:border-t [&_.ql-toolbar]:border-gray-300 [&_.ql-toolbar]:dark:border-gray-600
     [&_.ql-toolbar]:sticky [&_.ql-toolbar]:bottom-0 [&_.ql-toolbar]:z-10
     [&_.ql-editor]:font-sourcesans [&_.ql-editor_h1]:font-playfair [&_.ql-editor_h2]:font-playfair [&_.ql-editor_h3]:font-playfair"
          value={content}
          modules={modules}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default RichTextInput;