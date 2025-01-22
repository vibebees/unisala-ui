import React, { useEffect, useState, useRef, useCallback } from "react";
import "react-quill/dist/quill.snow.css";
import { Plus, Minus, Image, Loader } from "lucide-react";
import { getServiceConfig } from "@/datasource/servers/index";

interface RichTextInputProps {
  initialValue: string;
  draftKey?: string;
  placeholder?: string;
  theme?: 'light' | 'dark';
  onContentChange: (content: string) => void;
}

// FloatingToolbar Component
const FloatingToolbar = ({ quillRef }: { quillRef: React.RefObject<any> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFileApi } = getServiceConfig();

  const handlePlusClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(uploadFileApi, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.imageKeys?.[0] && result.presignedUrl) {
          const imageUrl = `${result.presignedUrl}${result.imageKeys[0]}`;
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', imageUrl);
            quill.setSelection(range.index + 1);
          }
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
      setIsOpen(false);
    }
  };

  return (
    <div 
      className="plus-button z-30 absolute left-0 top-1/2 -translate-x-full -translate-y-1/2"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={handlePlusClick}
        type="button"
        className="bg-transparent border border-gray-200 rounded-full p-1 hover:bg-gray-100 transition-colors"
      >
        {isOpen ? (
          <Minus size={25} strokeWidth={1} />
        ) : (
          <Plus size={25} strokeWidth={1} />
        )}
      </button>
      
      {isOpen && (
        <div className="flex bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 top-0 translate-y-0 left-11 absolute gap-3 z-50 items-center justify-start w-fit p-2 rounded-lg shadow-md">
          <div 
            className="rounded-full relative size-8 grid place-content-center border border-neutral-600"
            title="Add Image"
          >
            {isUploading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <>
                <Image size={20} />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  onClick={e => e.stopPropagation()}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default FloatingToolbar;