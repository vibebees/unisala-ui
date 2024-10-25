import React from 'react';
import { GripHorizontal } from 'lucide-react';
import type { ResizeHandleProps } from './types';

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ isResizing, onResizeStart }) => (
    <div
        className={`absolute left-0 top-0 bottom-0 w-4 cursor-col-resize flex items-center justify-center 
                   hover:bg-gray-100 dark:hover:bg-gray-700 transform -translate-x-1/2 z-20 ${
                       isResizing ? 'bg-gray-200 dark:bg-gray-600' : ''
                   }`}
        onMouseDown={onResizeStart}
    >
        <GripHorizontal className="h-6 w-6 text-gray-400" />
    </div>
);