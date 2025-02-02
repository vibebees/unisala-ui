import type { PostDraft } from '@/types/post';

export interface EditorPanelProps {
    draftTitle: string;
    draftId: string;
    draftContent: string;
    panelLayout: 'right' | 'split';
    panelWidth: number;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
}

export interface BottomBarProps {
    hasDrafts: boolean;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
    panelLayout: 'right' | 'split';
    panelWidth: number;
    activePanel: 'editor' | 'visual';
}

export interface ResizeHandleProps {
    isResizing: boolean;
    onResizeStart: (e: React.MouseEvent) => void;
}

export interface PostFormProps {
    initialPostDraft?: PostDraft;
}