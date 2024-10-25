import React, { lazy } from 'react';
import type { EditorPanelProps } from './types';

const TextareaEditor = lazy(() => import('@/components/ui/textEditor').then(module => ({ default: module.TextareaEditor })));
const TextareaAutoGrow = lazy(() => import('@/components/ui/textarea').then(module => ({ default: module.TextareaAutoGrow })));

export const EditorPanel: React.FC<EditorPanelProps> = ({
    draftTitle,
    draftId,
    draftContent,
    panelLayout,
    panelWidth,
    onTitleChange,
    onContentChange
}) => (
    <div 
        className={`transition-all duration-200 ease-in-out flex-grow ${
            panelLayout === 'split' ? `w-[calc(100%-${panelWidth}px)]` : 'w-full'
        }`}
    >
        <div className={`h-full ${panelLayout === 'split' ? 'pr-4' : 'container max-w-screen-md mx-auto'}`}>
            <form id='postForm' onSubmit={(e) => e.preventDefault()} className="pt-12 pb-32">
                <div>
                    <TextareaAutoGrow
                        placeholder='Title of your story!'
                        className='min-h-[100px]'
                        maxHeight='50vh'
                        name='title'
                        value={draftTitle}
                        draftId={draftId}
                        onContentChange={onTitleChange}
                    />
                </div>
                <div>
                    <TextareaEditor
                        placeholder='Tell your story...'
                        draftKey={draftId}
                        initialValue={draftContent}
                        onContentChange={onContentChange}
                    />
                </div>
            </form>
        </div>
    </div>
);