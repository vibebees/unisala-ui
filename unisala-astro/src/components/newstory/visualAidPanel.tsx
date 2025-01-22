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
      {/* <div className="relative" style={{ height: editorHeight }}>
        <UppyImageEditor 
          height={editorHeight.toString()} 
          width="100%"
          className="h-full" 
        />
      </div> */}

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
         

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
        <Text2ImagePanel />
        </div>
      </div>
    </div>
  );
};

export default VisualAidPanel;