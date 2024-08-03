import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "./FloatingToolbar.css"; // Make sure to create this CSS file
import './RichTextInput.css'
interface RichTextInputProps {
  value: string;
  onChange: (content: string) => void;
  id?: string;
  placeholder?: string;
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  value: initialValue,
  onChange,
  id = "rich-text-input",
  placeholder = "Write something...",
}) => {
  const [content, setContent] = useState<string>(initialValue);
  const quillRef = useRef<ReactQuill>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const modules = {
    toolbar: {
      container: "#floating-toolbar",
      handlers: {
        // Define custom handlers here if needed
      }
    },
    // You might want to add other modules like clipboard or history
    clipboard: {
      // Add clipboard module options
    },
    history: {
      // Add history module options
    }
  };
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'direction',
  'size',
  'color', 'background',
  'link', 'image', 'video'
];
  useEffect(() => {
    const savedContent = localStorage.getItem(id);
    if (savedContent) {
      setContent(savedContent);
      onChange(savedContent);
    } else {
      setContent(initialValue);
    }
  }, [id, onChange, initialValue]);

  useEffect(() => {
    if (content !== undefined) {
      localStorage.setItem(id, content);
    }
  }, [id, content]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  const showToolbar = useCallback(() => {
    const quill = quillRef.current?.getEditor();
    const selection = quill?.getSelection();
    if (selection && selection.length > 0 && toolbarRef.current) {
      const bounds = quill.getBounds(selection.index, selection.length);
      const toolbar = toolbarRef.current;
      toolbar.style.display = 'block';
      toolbar.style.left = `${bounds.left}px`;
      toolbar.style.top = `${bounds.top - toolbar.offsetHeight - 10}px`;
    }
  }, []);

  const hideToolbar = useCallback(() => {
    if (toolbarRef.current) {
      toolbarRef.current.style.display = 'none';
    }
  }, []);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.on('selection-change', (range) => {
        if (range && range.length > 0) {
          showToolbar();
        } else {
          hideToolbar();
        }
      });
    }

    return () => {
      // Clean up event listener when component unmounts
      quill?.off('selection-change');
    };
  }, [showToolbar, hideToolbar]);

  return (
    <div className="rich-text-editor-container">
      <div id="floating-toolbar" ref={toolbarRef} className="ql-toolbar ql-snow">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-code-block"></button>
        <button className="ql-header" value="1"></button>
        <button className="ql-header" value="2"></button>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
        <button className="ql-direction" value="rtl"></button>
        <select className="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select className="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option selected></option>
        </select>
        <select className="ql-color">
          <option value="red"></option>
          <option value="green"></option>
          <option value="blue"></option>
          <option value="orange"></option>
          <option value="violet"></option>
          <option value="#d0d1d2"></option>
          <option selected></option>
        </select>
        <select className="ql-background">
          <option value="red"></option>
          <option value="green"></option>
          <option value="blue"></option>
          <option value="orange"></option>
          <option value="violet"></option>
          <option value="#d0d1d2"></option>
          <option selected></option>
        </select>
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <button className="ql-video"></button>
        <button className="ql-formula"></button>
        <button className="ql-clean"></button>
      </div>
      <ReactQuill
        ref={quillRef}
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