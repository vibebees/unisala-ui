// components/PostForm/Layout/SidePanel.tsx
import { PanelResizeHandle } from "./PanelResizeHandle";

interface SidePanelProps {
  width: number;
  isResizing: boolean;
  children: React.ReactNode;
  position: 'left' | 'right';
  panelLayout?: 'right' | 'split';
  onResizeStart: (e: React.MouseEvent) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  width,
  isResizing,
  children,
  position,
  panelLayout,
  onResizeStart
}) => (
  <div 
    style={{ 
      width: `${width}px`,
      minWidth: `${width}px`,
      flexShrink: 0,
      transition: isResizing ? 'none' : 'width 0.2s ease-in-out'
    }}
    className={`relative h-full bg-white dark:bg-gray-800 border-${position} border-gray-200 
      dark:border-gray-700 overflow-y-auto
      ${position === 'right' && panelLayout === 'right' ? 'fixed right-0' : ''}
      ${isResizing ? 'select-none' : ''}`}
  >
    <PanelResizeHandle
      isResizing={isResizing}
      onResizeStart={onResizeStart}
      position={position}
    />
    <div className="relative h-full overflow-hidden">
      {children}
    </div>
  </div>
);