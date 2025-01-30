// components/PostForm/Layout/PanelResizeHandle.tsx
import { GripHorizontal } from 'lucide-react';

interface PanelResizeHandleProps {
  isResizing: boolean;
  onResizeStart: (e: React.MouseEvent) => void;
  position: 'left' | 'right';
}

export const PanelResizeHandle: React.FC<PanelResizeHandleProps> = ({
  isResizing,
  onResizeStart,
  position
}) => (
  <div
    className={`absolute ${position === 'left' ? '-right-2' : '-left-2'} top-0 bottom-0 w-4 
      cursor-col-resize flex items-center justify-center hover:bg-gray-100 
      dark:hover:bg-gray-700 z-20
      ${isResizing ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
    onMouseDown={onResizeStart}
    onDragStart={(e) => e.preventDefault()} // Prevent unwanted drag behavior
  >
    <GripHorizontal className="h-6 w-6 text-gray-400" />
  </div>
);