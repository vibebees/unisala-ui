import React, { useRef, useEffect, useState } from "react";

// Custom hook to listen for theme changes
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    // Set initial theme
    updateTheme();

    // Create a MutationObserver to watch for changes in the <html> element's class
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return theme;
};

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
  id?: string;
}

const TextareaAutoGrow: React.FC<TextareaProps> = ({ maxHeight = '70vh', id = 'textarea-auto-grow', ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const theme = useTheme();

  useEffect(() => {
    // Load saved content from localStorage when component mounts
    const savedContent = localStorage.getItem(id);
    if (savedContent) {
      setValue(savedContent);
    }
  }, [id]);

  useEffect(() => {
    // Save content to localStorage whenever it changes
    localStorage.setItem(id, value);
  }, [id, value]);

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
        maxHeight: maxHeight,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "1.5rem",
        lineHeight: "1.6",
      }}
      value={value}
      onChange={handleChange}
      className={`block p-2.5 w-full outline-none bg-transparent
        transition-colors duration-200 ease-in-out
        text-gray-900 dark:text-white
        placeholder-gray-500 dark:placeholder-gray-400
        focus:ring-0 focus:border-transparent
        ${props.className || ""}`}
    />
  );
};

export { TextareaAutoGrow };