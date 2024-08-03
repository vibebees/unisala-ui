import React, { useRef, useEffect, useState } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
  id?: string;
}

const TextareaAutoGrow: React.FC<TextareaProps> = ({ 
  maxHeight = '70vh', 
  id = 'textarea-auto-grow', 
  name,
  className,
  ...props 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    // Load saved content from localStorage when component mounts
    const savedContent = localStorage.getItem(id);
    if (savedContent) {
      setValue(savedContent);
    }

    // Set up auto-resize
    const resizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "inherit";
        const scrollHeight = textareaRef.current.scrollHeight;
        const maxHeightPx = parseFloat(maxHeight) * window.innerHeight / 100;
        textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeightPx)}px`;
      }
    };

    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, [id, maxHeight]);

  useEffect(() => {
    // Save content to localStorage whenever it changes
    localStorage.setItem(id, value);

    // Resize on content change
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeightPx = parseFloat(maxHeight) * window.innerHeight / 100;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeightPx)}px`;
    }
  }, [id, value, maxHeight]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <textarea
      {...props}
      ref={textareaRef}
      id={id}
      name={name}
      rows={1}
      style={{ 
        resize: "none", 
        overflow: "auto",
        maxHeight: maxHeight,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "2rem",
        lineHeight: "1.6",
        border: "none",
        outline: "none",
        boxShadow: "none",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
      }}
      value={value}
      onChange={handleChange}
      className={`block p-2.5 w-full bg-transparent
        text-gray-900 dark:text-white
        placeholder-gray-500 dark:placeholder-gray-400
        focus:ring-0 focus:outline-none
        ${className || ""}`}
    />
  );
};

export { TextareaAutoGrow };