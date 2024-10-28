// components/PostForm/Editor/MainEditor.tsx
import React from 'react';
import { TextareaAutoGrow } from '@/components/ui/textarea';
import { TextareaEditor } from '@/components/ui/textEditor';

interface MainEditorProps {
  draftId: string;
  draftTitle: string;
  draftContent: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  panelLayout: 'right' | 'split';
}

export const MainEditor: React.FC<MainEditorProps> = ({
  draftId,
  draftTitle,
  draftContent,
  onTitleChange,
  onContentChange,
  panelLayout,
}) => (
  <div className="flex-1 min-w-0 h-full overflow-y-auto">
    <div className={`h-full ${panelLayout === 'split' ? 'px-4' : 'container max-w-screen-md mx-auto'}`}>
      <form id='postForm' className="pt-12 pb-32">
        <div className="mb-8">
          <TextareaAutoGrow
            placeholder='Title of your story!'
            className='min-h-[100px] w-full p-4 text-2xl font-bold'
            maxHeight='50vh'
            name='title'
            value={draftTitle}
            draftId={draftId}
            onContentChange={onTitleChange}
          />
        </div>
        <div className="relative min-h-[calc(100vh-300px)]">
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