import React, { useState } from "react";
import { Plus, Minus, Image, SquarePlay, SquareTerminal, Loader } from "lucide-react";
import { getServiceConfig } from "@/datasource/servers/index";

interface FloatingToolbarProps {
  quillRef: React.RefObject<any>;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ quillRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadFileApi } = getServiceConfig();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        console.log('Image uploaded successfully:', result);
        
        if (result.success && result.imageKeys && result.imageKeys.length > 0 && result.presignedUrl) {
          const imageKey = result.imageKeys[0];
          const imageUrl = `${result.presignedUrl}${imageKey}`;
          
          // Insert the image into the Quill editor
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', imageUrl);
          }
        } else {
          console.error('Image upload response is missing required data');
        }
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="plus-button z-30 absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border border-gray-200 rounded-full p-1 hover:bg-gray-100 transition-colors"
      >
        {isOpen ? (
          <Minus size={25} strokeWidth={1} />
        ) : (
          <Plus size={25} strokeWidth={1} />
        )}
      </button>
      {isOpen ? <Options onImageUpload={handleImageUpload} isUploading={isUploading} /> : null}
    </div>
  );
};

const Options = ({ onImageUpload, isUploading }: { onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>, isUploading: boolean }) => {
  return (
    <section className="flex bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 top-0 translate-y-0 left-11 absolute gap-3 z-50 items-center justify-start w-fit p-2 rounded-lg shadow-md">
    <Option title="Add Image" Icon={Image} isLoading={isUploading}>
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={onImageUpload}
        disabled={isUploading}
      />
    </Option>
  </section>
  );
};

const Option = ({ Icon, title, children, isLoading }: { Icon: React.ElementType, title: string, children: React.ReactNode, isLoading?: boolean }) => {
  return (
    <button
      title={title}
      className={`rounded-full relative size-8 grid place-content-center border border-neutral-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading}
    >
      {isLoading ? <Loader className="animate-spin" size={20} /> : <Icon size={20} />}
      {children}
    </button>
  );
};

export default FloatingToolbar;