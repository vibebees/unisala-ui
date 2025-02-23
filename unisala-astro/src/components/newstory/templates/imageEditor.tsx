import React, { useEffect, useRef, useState, useCallback } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { useAstroQuery } from '@/datasource/apollo-client';
import { proxyImage } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { getServiceConfig } from "@/datasource/servers/index";

interface UppyImageEditorProps {
  width?: string;
  height?: string;
  onFileUpload?: (result: any) => void;
  className?: string;
}

const UppyImageEditor: React.FC<UppyImageEditorProps> = ({
  width = '100%',
  height = '450px',
  onFileUpload,
  className = '',
}) => {
  const uppyInstance = useRef<Uppy | null>(null);
  const dashboardElement = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadFileApi } = getServiceConfig();

  const { refetch: proxyImageRefetch } = useAstroQuery(proxyImage, {
    context: { server: USER_SERVICE_GQL },
    variables: { url: '' },
    skip: true,
  });

  const uploadImageToServer = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(uploadFileApi, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.success && result.imageKeys?.length > 0 && result.presignedUrl) {
        const imageUrl = `${result.presignedUrl}${result.imageKeys[0]}`;
        return imageUrl;
      } else {
        throw new Error('Invalid upload response');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const insertImageUrl = (imageUrl: string) => {
    try {
      const quillEditor = document.querySelector('.ql-editor');
      const quill = (window as any).quill;
      
      if (quill && quillEditor) {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', imageUrl);
        quill.setSelection(range.index + 1);
      } else if (quillEditor) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.classList.add('loading');
        
        img.onload = () => {
          img.classList.remove('loading');
        };
        
        img.onerror = () => {
          console.error('Failed to load image:', imageUrl);
          img.remove();
        };
        
        (quillEditor as HTMLElement).focus();
        
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0) || document.createRange();
        
        if (selection && selection.rangeCount > 0) {
          range.insertNode(img);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          quillEditor.appendChild(img);
        }
        
        quillEditor.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } catch (error) {
      console.error('Error inserting image:', error);
    }
  };

  const addImageToUppy = useCallback(async (file: File, meta = {}) => {
    if (!uppyInstance.current) return;
    
    try {
      await uppyInstance.current.addFile({
        name: file.name,
        type: file.type,
        data: file,
        meta: {
          ...meta,
          source: 'Visual Aid Panel'
        }
      });
      uppyInstance.current.info('Image added successfully', 'success', 3000);
    } catch (error) {
      console.error('Error adding file to Uppy:', error);
      uppyInstance.current.info('Failed to add image', 'error', 3000);
    }
  }, []);

  const fetchAndProcessImage = useCallback(async (imageUrl: string, title: string) => {
    if (!imageUrl) {
      throw new Error('Image URL cannot be empty');
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Direct fetch failed');
      
      const blob = await response.blob();
      return new File(
        [blob],
        `${title || 'image'}.jpg`,
        { type: response.headers.get('content-type') || 'image/jpeg' }
      );
    } catch (directFetchError) {
      const { data } = await proxyImageRefetch({
        variables: { url: imageUrl }
      });

      if (!data?.proxyImages?.success) {
        throw new Error(data?.proxyImages?.error || 'Failed to proxy image');
      }

      const binaryString = atob(data.proxyImages.data.base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const proxyBlob = new Blob([bytes], { 
        type: data.proxyImages.data.contentType || 'image/jpeg' 
      });

      return new File(
        [proxyBlob],
        `${title || 'image'}.jpg`,
        { type: data.proxyImages.data.contentType || 'image/jpeg' }
      );
    }
  }, [proxyImageRefetch]);


  useEffect(() => {
    // Create the Uppy instance first
    uppyInstance.current = new Uppy({
      restrictions: {
        maxNumberOfFiles: 10,
        allowedFileTypes: ['image/*']
      },
      autoProceed: false,
    });

    // Add the Dashboard plugin
    const dashboard = uppyInstance.current.use(Dashboard, {
      inline: true,
      target: dashboardElement.current || undefined,
      width: '100%',
      height: height,
      proudlyDisplayPoweredByUppy: false,
      showSelectedFiles: true,
      disableStatusBar: false,
    });

    // Now use the ImageEditor plugin with the correct target
    uppyInstance.current.use(ImageEditor, {
      target: dashboard.getPlugin('Dashboard'),  // Pass the dashboard plugin instance instead of the class
      quality: 0.8,
      cropperOptions: {
        viewMode: 1,
        background: false,
        autoCropArea: 1,
        responsive: true
      },
      actions: {
        revert: true,
        rotate: true,
        granularRotate: true,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: true,
        cropWidescreenVertical: true
      }
    });

    // Set up event listeners
    uppyInstance.current.on('complete', (result) => {
      if (onFileUpload) {
        onFileUpload(result);
      }
    });

    uppyInstance.current.on('file-editor:complete', async (file) => {
      try {
        const editedFile = new File(
          [file.data],
          file.name || 'edited-image.jpg',
          { type: file.type || 'image/jpeg' }
        );
        
        const imageUrl = await uploadImageToServer(editedFile);
        if (imageUrl) {
          insertImageUrl(imageUrl);
          uppyInstance.current?.info('Image uploaded successfully', 'success', 3000);
        }
        
        if (file.id) {
          uppyInstance.current?.clear();
        }
      } catch (error) {
        console.error('Error processing edited image:', error);
        uppyInstance.current?.info('Failed to process image', 'error', 3000);
      }
    });

    return () => {
      if (uppyInstance.current) {
        uppyInstance.current.cancelAll();
        uppyInstance.current = null;
      }
    };
  }, [height, onFileUpload]);


  useEffect(() => {
    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setIsLoading(true);

      try {
        const jsonStr = e.dataTransfer?.getData('application/json');
        const imageUrl = e.dataTransfer?.getData('text/uri-list');
        const files = e.dataTransfer?.files;

        uppyInstance.current?.clear();

        if (jsonStr) {
          const jsonData = JSON.parse(jsonStr);
          if (jsonData.type === 'visual-aid-image') {
            const url = jsonData.url || jsonData.link;
            const file = await fetchAndProcessImage(url, jsonData.title);
            await addImageToUppy(file, jsonData);
          }
        } else if (imageUrl) {
          const file = await fetchAndProcessImage(imageUrl, 'Dropped Image');
          await addImageToUppy(file);
        } else if (files?.length) {
          const file = files[0];
          if (file.type.startsWith('image/')) {
            await addImageToUppy(file);
          } else {
            uppyInstance.current?.info('Please drop an image file', 'error', 3000);
          }
        }
      } catch (error) {
        console.error('Error handling drop:', error);
        uppyInstance.current?.info('Failed to process image', 'error', 3000);
      } finally {
        setIsLoading(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const dropZone = dropZoneRef.current;
    if (dropZone) {
      dropZone.addEventListener('drop', handleDrop);
      dropZone.addEventListener('dragover', handleDragOver);
      dropZone.addEventListener('dragleave', handleDragLeave);
      dropZone.addEventListener('dragenter', handleDragOver);

      return () => {
        dropZone.removeEventListener('drop', handleDrop);
        dropZone.removeEventListener('dragover', handleDragOver);
        dropZone.removeEventListener('dragleave', handleDragLeave);
        dropZone.removeEventListener('dragenter', handleDragOver);
      };
    }
  }, [addImageToUppy, fetchAndProcessImage]);

  return (
    <div 
      ref={dropZoneRef}
      style={{ width }}
      className={`
        relative 
        rounded-lg 
        overflow-hidden 
        border-2 
        border-dashed 
        border-gray-200 
        dark:border-gray-700
        min-h-[300px] 
        h-full
        flex 
        flex-col
        ${className}
      `}
    >
      <div 
        ref={dashboardElement} 
        className="h-full w-full flex-grow"
        style={{ minHeight: '400px' }}
      />
      
      {(isDragging || isLoading) && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center z-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <p className="text-blue-500 dark:text-blue-400 font-medium text-center">
              {isLoading ? 'Processing image...' : 'Drop image to edit'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UppyImageEditor;