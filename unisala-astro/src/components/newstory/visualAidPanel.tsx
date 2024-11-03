import React, { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Loader2, GripVertical, Wand2, Image as ImageIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useAstroQuery } from '@/datasource/apollo-client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import UppyImageEditor from './imageEditor';
import Text2ImagePanel from './imageGeneration';
import { getSearchImages } from '@/datasource/graphql/user';
import { useAuth } from '@/context/AuthContext';

interface VisualAidPanelProps {
  containerWidth?: number;
}

interface Image {
  link: string;
  title: string;
  width: number;
  height: number;
  thumbnail: string;
}

const Card = ({ children, className = "", draggable, onDragStart, onDragEnd, onTouchStart, onTouchEnd, ...props }: { 
  children: ReactNode, 
  className?: string, 
  draggable?: boolean, 
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void, 
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void, 
  onTouchStart?: () => void, 
  onTouchEnd?: () => void 
}) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      {...props}
    >
      {children}
    </div>
  );
};

const VisualAidPanel: React.FC<VisualAidPanelProps> = ({ containerWidth = 400 }) => {
  const [activeMode, setActiveMode] = useState<'search' | 'generate'>('search');
  const [searchQuery, setSearchQuery] = useState("nepali students learning");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("nepali students learning");
  const [loading, setLoading] = useState(false);
  const [draggedImage, setDraggedImage] = useState<Image | null>(null);
  const [editorHeight, setEditorHeight] = useState(350);
  const [isDragging, setIsDragging] = useState(false);
  const { authenticated } = useAuth();

  const { data, loading: imageLoading, error, refetch } = useAstroQuery(getSearchImages, {
    context: { server: USER_SERVICE_GQL },
    fetchPolicy: "cache-and-network",
    variables: { q: currentSearchTerm },
    skip: !currentSearchTerm,
  });

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const panelTop = document.getElementById('visualAidPanel')?.getBoundingClientRect().top || 0;
      const newHeight = moveEvent.clientY - panelTop;
      setEditorHeight(Math.min(Math.max(newHeight, 200), 800));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setCurrentSearchTerm(searchQuery);
    try {
      await refetch({ q: searchQuery });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, image: Image) => {
    e.stopPropagation();
    setDraggedImage(image);
    
    // Create and set drag preview
    const dragPreview = new Image();
    dragPreview.src = image.thumbnail;
    e.dataTransfer.setDragImage(dragPreview, 10, 10);
    
    // Set drag effect and data
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', image.link);
    e.dataTransfer.setData('text/uri-list', image.link);
    
    const imageData = {
      url: image.link,
      title: image.title,
      width: image.width,
      height: image.height,
      thumbnail: image.thumbnail,
      type: 'visual-aid-image'
    };
    
    try {
      e.dataTransfer.setData('application/json', JSON.stringify(imageData));
    } catch (error) {
      console.error('Error setting drag data:', error);
    }

    // Add visual feedback
    const target = e.currentTarget as HTMLElement;
    target.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('opacity-50');
    setDraggedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const isLoading = loading || imageLoading;
  const images = data?.searchImages?.images || [];
  const gridCols = Math.max(2, Math.floor(containerWidth / 200));

  return (
    <div id="visualAidPanel" className="h-full w-full border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Editor Section */}
      <div className="relative" style={{ height: editorHeight }}>
        <UppyImageEditor 
          height={editorHeight.toString()} 
          width="100%"
          className="h-full" 
        />
      </div>

      {/* Resize Handle */}
      <div
        className={`h-4 cursor-row-resize flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-b border-gray-200 dark:border-gray-700 ${
          isDragging ? 'bg-gray-200 dark:bg-gray-600' : ''
        }`}
        onMouseDown={handleResizeStart}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Lower Section */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mode Toggle Buttons */}
        <div className="flex p-2 gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Button
            variant={activeMode === 'search' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setActiveMode('search')}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Search Images
          </Button>
          <Button
            variant={activeMode === 'generate' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setActiveMode('generate')}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Image
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeMode === 'search' ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search images..."
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={isLoading} 
                    onClick={handleSearch}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {error && (
                  <div className="text-red-500 text-center p-4">
                    Error loading images. Please try again.
                  </div>
                )}

                <div 
                  className="grid gap-4" 
                  style={{ 
                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
                  }}
                >
                  {images.map((image: Image, index: number) => (
                    <Card
                      key={`${image.link}-${index}`}
                      className="relative group cursor-move transition-all duration-200 hover:shadow-lg"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, image)}
                      onDragEnd={handleDragEnd}
                      onTouchStart={() => setDraggedImage(image)}
                      onTouchEnd={() => setDraggedImage(null)}
                    >
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-32 object-cover rounded-t select-none"
                        draggable={false}
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
          ) : (
            <Text2ImagePanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualAidPanel;