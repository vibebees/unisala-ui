import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './RichTextInput.css'

interface RichTextInputProps {
  initialValue: string;
  key?: string;
  placeholder?: string;
}

const RichTextInput: React.FC<RichTextInputProps> = ({
 initialValue,
  placeholder = "Write something...",
  key = "new.story.postText",
}) => {
  const [content, setContent] = useState<string>(initialValue);
  const quillRef = useRef<ReactQuill>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [isInteractingWithToolbar, setIsInteractingWithToolbar] = useState(false);

  const modules = {
    toolbar: {
      container: "#floating-toolbar",
      handlers: {
        // Define custom handlers here if needed
      }
    },
    clipboard: {
      // Add clipboard module options
    },
    history: {
      // Add history module options
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'blockquote', 'code-block',
    'list', 'bullet', 
    'size',
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

  const showToolbar = useCallback(() => {
    if (toolbarRef.current) {
      const quill = quillRef.current?.getEditor();
      const selection = quill?.getSelection();
      if (selection && selection.length > 0) {
        let bounds
        const quill = quillRef.current?.getEditor();
        if (quill) {
          bounds = quill.getBounds(selection.index, selection.length);
        }
        const toolbar = toolbarRef.current;
        toolbar.style.display = 'flex';
        
        // Position the toolbar above the selection
        if (bounds) {
          toolbar.style.top = `${bounds.top - toolbar.offsetHeight - 5}px`;
        }
        toolbar.style.left = '0';
        toolbar.style.right = '0';
        
        // Ensure the toolbar is fully visible
        const editorRect = quill?.root.getBoundingClientRect();
        if (bounds && editorRect && bounds.top - toolbar.offsetHeight < editorRect.top) {
          toolbar.style.top = `${bounds.bottom + 5}px`;
        }
      }
    }
  }, []);

  const hideToolbar = useCallback(() => {
    if (toolbarRef.current && !isInteractingWithToolbar) {
      toolbarRef.current.style.display = 'none';
    }
  }, [isInteractingWithToolbar]);

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

    const toolbar = toolbarRef.current;
    if (toolbar) {
      toolbar.addEventListener('mouseenter', () => setIsInteractingWithToolbar(true));
      toolbar.addEventListener('mouseleave', () => setIsInteractingWithToolbar(false));
    }

    return () => {
      quill?.off('selection-change', () => {});
      if (toolbar) {
        toolbar.removeEventListener('mouseenter', () => setIsInteractingWithToolbar(true));
        toolbar.removeEventListener('mouseleave', () => setIsInteractingWithToolbar(false));
      }
    };
  }, [showToolbar, hideToolbar]);

  return (
    <div className="rich-text-editor-container">
      <div id="floating-toolbar" ref={toolbarRef}
     className="ql-toolbar ql-snow absolute left-0 flex items-center width-100px "

        >
        <button className="ql-clean"></button>

      <select className="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
          <option value="6"></option>
          <option selected></option>
        </select>

        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-link"></button>
                <button className="ql-image"></button>
        <button className="ql-code-block"></button>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
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
      

        <button className="ql-video"></button>
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