import React, { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useAstroQuery } from '@/datasource/apollo-client';
import { gql } from '@apollo/client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';

const getSearchImages = gql`
  query searchImages($q: String!) {
    searchImages(q: $q) {
      images {
        link
        title
        thumbnail
        width
        height
      }
    }
  }
`;

const Card = ({ children, className = "", ...props }: { children: ReactNode, className?: string }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const VisualAidPanel = () => {
  const [searchQuery, setSearchQuery] = useState("neural network architecture");
  const [loading, setLoading] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);

  const { data, loading: imageLoading, error, refetch } = useAstroQuery(getSearchImages, {
    context: { server: USER_SERVICE_GQL },
    fetchPolicy: "cache-and-network",
    variables: {
      q: searchQuery  
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await refetch({ q: searchQuery });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, image) => {
    // Set dragged image state
    setDraggedImage(image);
    
    // Create and set the drag preview image
    const dragPreview = new Image();
    dragPreview.src = image.thumbnail;
    e.dataTransfer.setDragImage(dragPreview, 10, 10);
    
    // Set multiple data formats for better compatibility
    e.dataTransfer.effectAllowed = 'copy';
    
    // Set plain text format (fallback)
    e.dataTransfer.setData('text/plain', image.link);
    
    // Set URL format
    e.dataTransfer.setData('text/uri-list', image.link);
    
    // Set custom JSON format with all image data
    const imageData = {
      url: image.link,
      title: image.title,
      width: image.width,
      height: image.height,
      thumbnail: image.thumbnail,
      type: 'visual-aid-image'
    };
    
    e.dataTransfer.setData('application/json', JSON.stringify(imageData));
    
    // Add visual feedback
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
    setDraggedImage(null);
  };

  const isLoading = loading || imageLoading;
  const images = data?.searchImages?.images || [];

  return (
    <div className="fixed top-0 right-0 h-full w-[400px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-10">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
              className="flex-1"
            />
            <Button type="submit" variant="ghost" size="icon" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="text-red-500 text-center p-4">
              Error loading images. Please try again.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Card
                key={`${image.link}-${index}`}
                className="relative group cursor-move transition-all duration-200 hover:shadow-lg"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, image)}
                onDragEnd={handleDragEnd}
                onTouchStart={() => setDraggedImage(image)}
                onTouchEnd={() => setDraggedImage(null)}
              >
                <img
                  src={image.thumbnail}
                  alt={image.title}
                  className="w-full h-32 object-cover rounded-t select-none"
                  draggable="false"
                />
                <div className="p-2">
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate select-none">
                    {image.title}
                  </p>
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded select-none">
                    Drag to insert
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {!isLoading && images.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <Search className="h-12 w-12 mb-2" />
              <p>Search for images to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualAidPanel;