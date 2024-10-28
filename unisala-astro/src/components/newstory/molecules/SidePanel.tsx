import { PanelResizeHandle } from "./PanelResizeHandle";

// components/PostForm/Layout/SidePanel.tsx
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
      style={{ width }}
      className={`h-full bg-white dark:bg-gray-800 border-${position} border-gray-200 
        dark:border-gray-700 transition-all duration-200 ease-in-out overflow-y-auto
        ${position === 'right' && panelLayout === 'right' ? 'fixed right-0' : 'relative'}
        ${isResizing ? 'select-none' : ''}`}
    >
      <PanelResizeHandle
        isResizing={isResizing}
        onResizeStart={onResizeStart}
        position={position}
      />
      {children}
    </div>
  );