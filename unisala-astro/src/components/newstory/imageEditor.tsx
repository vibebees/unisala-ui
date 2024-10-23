import React, { useEffect, useRef, useState } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { useAstroQuery } from '@/datasource/apollo-client';
import { proxyImage } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';

interface UppyImageEditorProps {
  width?: string;
  height?: string;
  onFileUpload?: (result: any) => void;
}

const UppyImageEditor: React.FC<UppyImageEditorProps> = ({
  width = '100%',
  height = '450px',
  onFileUpload
}) => {
  const uppyInstance = useRef<Uppy | null>(null);
  const dashboardElement = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [urlToProxy, setUrlToProxy] = useState<string | null>(null);

  // Move the query back to component level with a dummy URL
  const { refetch: proxyImageRefetch } = useAstroQuery(proxyImage, {
    context: { server: USER_SERVICE_GQL },
    variables: { url: urlToProxy },
    skip: true,
  });

  const addImageToUppy = async (file: File, meta = {}) => {
    if (uppyInstance.current) {
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
    }
  };

  const fetchAndProcessImage = async (imageUrl: string, title: string) => {
    if (!imageUrl) {
      console.error('Image URL is empty. Aborting request.');
      uppyInstance.current?.info('No image URL provided', 'error', 3000);
      throw new Error('Image URL cannot be empty');
    }
  
    try {
      console.log('Attempting to fetch image:', imageUrl);
      // Try direct fetch first
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Direct fetch failed');
      
      const blob = await response.blob();
      const file = new File(
        [blob],
        `${title || 'image'}.jpg`,
        { type: response.headers.get('content-type') || 'image/jpeg' }
      );
      
      return file;
    } catch (directFetchError) {
      console.log('Direct fetch failed, trying proxy:', directFetchError);
      
      try {
        // Use the proxyImageRefetch function that was defined at the component level
        console.log('Making proxy request for URL:', imageUrl);
        const { data } = await proxyImageRefetch({
          variables: { url: imageUrl }
        });

        console.log('Proxy response:', data);

        if (!data?.proxyImages?.success) {
          throw new Error(data?.proxyImages?.error || 'Failed to proxy image');
        }

        const binaryString = atob(data.proxyImages.data.base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const blob = new Blob([bytes], { 
          type: data.proxyImages.data.contentType || 'image/jpeg' 
        });

        return new File(
          [blob],
          `${title || 'image'}.jpg`,
          { type: data.proxyImages.data.contentType || 'image/jpeg' }
        );
      } catch (proxyError) {
        console.error('Proxy fetch failed:', proxyError);
        throw new Error('Failed to fetch image through proxy');
      }
    }
  };

  useEffect(() => {
    console.log('Setting up Uppy and event listeners');
    
    uppyInstance.current = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      },
      autoProceed: false,
    });

    uppyInstance.current
      .use(Dashboard, {
        inline: true,
        target: dashboardElement.current || undefined,
        width: '100%',
        height: height,
        proudlyDisplayPoweredByUppy: false,
        disableStatusBar: true,
        // Disable Uppy's default drop handling
        disableDropzone: true
      })
      .use(ImageEditor, {
        target: Dashboard,
        quality: 0.8
      });

    uppyInstance.current.on('complete', (result) => {
      if (onFileUpload) {
        onFileUpload(result);
      }
    });

    const handleDrop = async (e: DragEvent) => {
      console.log('Drop event triggered', {
        dataTransfer: e.dataTransfer,
        types: e.dataTransfer?.types,
        files: e.dataTransfer?.files
      });

      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setIsLoading(true);
      
      try {
        if (e.dataTransfer?.types) {
          console.log('Available data types:', Array.from(e.dataTransfer.types));
        }

        const jsonStr = e.dataTransfer?.getData('application/json');
        const imageUrl = e.dataTransfer?.getData('text/uri-list');
        
        console.log('JSON data:', jsonStr);
        console.log('Image URL:', imageUrl);
        setUrlToProxy(imageUrl || null);
        
        if (jsonStr) {
          const jsonData = JSON.parse(jsonStr);
          console.log('Parsed JSON data:', jsonData);
          
          if (jsonData.type === 'visual-aid-image') {
            const url = jsonData.url || jsonData.link;
            console.log('Processing visual aid image with URL:', url);
            uppyInstance.current?.info('Loading image...', 'info', 3000);
            const file = await fetchAndProcessImage(url, jsonData.title);
            await addImageToUppy(file, jsonData);
          }
        } else if (imageUrl) {
          console.log('Processing dropped URL:', imageUrl);
          uppyInstance.current?.info('Loading image...', 'info', 3000);
          const file = await fetchAndProcessImage(imageUrl, 'Dropped Image');
          await addImageToUppy(file);
        } else if (e.dataTransfer?.files.length) {
          console.log('Processing dropped files:', e.dataTransfer.files);
          const file = e.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            await addImageToUppy(file);
          } else {
            uppyInstance.current?.info('Please drop an image file', 'error', 3000);
          }
        } else {
          console.log('No recognizable data found in drop event');
        }
      } catch (error) {
        console.error('Error handling drop:', error);
        uppyInstance.current?.info('Failed to process image', 'error', 3000);
      } finally {
        setIsLoading(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      console.log('Drag over event');
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      console.log('Drag leave event');
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragEnter = (e: DragEvent) => {
      console.log('Drag enter event');
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    // Add drop zone event listeners
    const dropZone = dropZoneRef.current;
    if (dropZone) {
      console.log('Adding event listeners to drop zone');
      dropZone.addEventListener('drop', handleDrop);
      dropZone.addEventListener('dragover', handleDragOver);
      dropZone.addEventListener('dragleave', handleDragLeave);
      dropZone.addEventListener('dragenter', handleDragEnter);
    } else {
      console.warn('Drop zone ref is null');
    }

    return () => {
      console.log('Cleaning up event listeners');
      if (uppyInstance.current) {
        uppyInstance.current.close();
      }
      if (dropZone) {
        dropZone.removeEventListener('drop', handleDrop);
        dropZone.removeEventListener('dragover', handleDragOver);
        dropZone.removeEventListener('dragleave', handleDragLeave);
        dropZone.removeEventListener('dragenter', handleDragEnter);
      }
    };
  }, [height, onFileUpload, proxyImageRefetch]);

  return (
    <div 
      ref={dropZoneRef}
      style={{ width, height }}
      className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700"
      onDrop={(e) => {
        console.log('React onDrop event triggered');
        // Let the event listener handle it
      }}
      onDragOver={(e) => {
        console.log('React onDragOver event triggered');
        e.preventDefault();
      }}
    >
      <div ref={dashboardElement} className="h-full" />
      {(isDragging || isLoading) && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <p className="text-blue-500 font-medium">
              {isLoading ? 'Processing image...' : 'Drop image to edit'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UppyImageEditor;