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
    className={`absolute ${position}-0 top-0 bottom-0 w-4 cursor-col-resize 
      flex items-center justify-center hover:bg-gray-100 
      dark:hover:bg-gray-700 transform ${position === 'left' ? '-' : ''}translate-x-1/2 z-20
      ${isResizing ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
    onMouseDown={onResizeStart}
  >
    <GripHorizontal className="h-6 w-6 text-gray-400" />
  </div>
);