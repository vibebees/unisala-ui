import React, { useRef, useEffect } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
  storageKey?: string;
}

const TextareaAutoGrow: React.FC<TextareaProps> = ({ 
  maxHeight = '70vh', 
  storageKey = 'new.story.title', 
  name,
  className,
  ...props 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedContent = localStorage.getItem(storageKey);
    if (savedContent && textareaRef.current) {
      textareaRef.current.value = savedContent;
    }
    
    const resizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "inherit";
        const scrollHeight = textareaRef.current.scrollHeight;
        const maxHeightPx = parseFloat(maxHeight) * window.innerHeight / 100;
        textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeightPx)}px`;
      }
    };

    resizeTextarea();
    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, [storageKey, maxHeight]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    localStorage.setItem(storageKey, event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeightPx = parseFloat(maxHeight) * window.innerHeight / 100;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeightPx)}px`;
    }
  };

  return (
    <textarea
      {...props}
      ref={textareaRef}
      id={storageKey}
      name={name}
      rows={1}
      style={{
        resize: "none",
        overflow: "auto",
        maxHeight: maxHeight,
        fontFamily: "'Playfair Display', serif",
        fontSize: "2rem",
        lineHeight: "1.8",
        border: "none",
        outline: "none",
        transition: "all 0.3s ease",
        background: "transparent",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        WebkitAppearance: "none",
        MozAppearance: "none",
      }}
      onChange={handleChange}
      className={`
        block w-full p-4
        text-gray-900 dark:text-white
        placeholder-gray-500 dark:placeholder-gray-400
        bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900
        rounded-lg
        focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700
        focus:bg-white dark:focus:bg-gray-800
        focus:shadow-lg
        ${className || ""}
      `}
    />
  );
};

export { TextareaAutoGrow };