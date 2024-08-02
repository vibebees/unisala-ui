import React, { useRef, useEffect, useState } from "react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
  theme?: 'light' | 'dark';
}

const TextareaAutoGrow: React.FC<TextareaProps> = ({ maxHeight = '70vh', theme = 'light', ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeightPx = parseFloat(maxHeight) * window.innerHeight / 100;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeightPx)}px`;
    }
  }, [value, maxHeight]);

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
      rows={1}
      style={{ 
        resize: "none", 
        overflow: "auto",
        maxHeight: maxHeight 
      }}
      value={value}
      onChange={handleChange}
      className={`block p-2.5 w-full text-4xl bg-transparent transition-colors duration-200 ease-in-out
        ${theme === 'dark' 
          ? 'text-white placeholder-gray-400' 
          : 'text-gray-900 placeholder-gray-500'} 
        ${props.className || ""}`}
    />
  );
};

export { TextareaAutoGrow }