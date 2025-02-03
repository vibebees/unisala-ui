import React, { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Loader2, GripVertical, Wand2, Image as ImageIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useAstroQuery } from '@/datasource/apollo-client';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import UppyImageEditor from './imageEditor';
import Text2ImagePanel from './imageGeneration';
import { getSearchImages } from '@/datasource/graphql/user';

interface VisualAidTemplateProps {
  editorHeight?: number;
  containerWidth?: number;
  children?: ReactNode;
}

const VisualAidTemplate: React.FC<VisualAidTemplateProps> = ({
  editorHeight = 350,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const panelTop = document.getElementById('visualAidPanel')?.getBoundingClientRect().top || 0;
      const newHeight = moveEvent.clientY - panelTop;
      editorHeight = Math.min(Math.max(newHeight, 200), 800); // Adjust state if necessary
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div id="visualAidPanel" className="h-full w-full border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Editor Section */}
      <div className="relative" style={{ height: editorHeight }}>
        <UppyImageEditor height={editorHeight.toString()} width="100%" className="h-full" />
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

      {/* Custom Content Section */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

// Default Layout Component Using Template
const VisualAidPanel: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'search' | 'generate'>('search');
  const [searchQuery, setSearchQuery] = useState("nepali students learning");
  const [loading, setLoading] = useState(false);
  const { data, loading: imageLoading, error, refetch } = useAstroQuery(getSearchImages, {
    context: { server: USER_SERVICE_GQL },
    fetchPolicy: "cache-and-network",
    variables: { q: searchQuery },
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      await refetch({ q: searchQuery });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || imageLoading;
  const images = data?.searchImages?.images || [];
  const gridCols = Math.max(2, Math.floor(400 / 200)); // Adjust as necessary

  return (
    <VisualAidTemplate>
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

      {activeMode === 'search' ? (
        <div className="p-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
            />
            <Button variant="ghost" size="sm" onClick={handleSearch}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
          <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
            {images.map((image: { thumbnail: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
              <div key={index} className="rounded shadow bg-gray-100 p-2">
                <img src={image.thumbnail} alt={String(image.title)} className="rounded" />
                <p className="text-xs mt-2">{image.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Text2ImagePanel />
      )}
    </VisualAidTemplate>
  );
};

export default VisualAidPanel;
