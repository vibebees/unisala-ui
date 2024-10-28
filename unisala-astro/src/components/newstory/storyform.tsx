import React, { useState, useEffect, useCallback } from 'react';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddPost } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { navigator } from '@/utils/lib/URLupdate';
import { getCache, setCache } from '@/utils/cache';
import { useDraftManager } from '@/hooks/useDraftManager';
import type { PostDraft, TopicOptions } from '@/types/post';

import { MainEditor } from './molecules/MainEditor';
import { PublishBar } from './molecules/PublishBar';
import { SidePanel } from './molecules/SidePanel';
import { LayoutToggle } from './molecules/LayoutToggle';
import PreviewModal from './storyPreviewModal';
import VisualAidPanel from './visualAidPanel';
import Text2ImagePanel from './imageGeneration';

interface PostFormProps {
  initialPostDraft?: PostDraft;
}

const PostForm: React.FC<PostFormProps> = ({ initialPostDraft }) => {
  // UI State
  const [showPreview, setShowPreview] = useState(false);
  const [topics, setTopics] = useState<TopicOptions[]>([]);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [panelWidth, setPanelWidth] = useState(400);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
  const [isLeftPanelResizing, setIsLeftPanelResizing] = useState(false);
  const [panelLayout, setPanelLayout] = useState<'right' | 'split'>('right');
  const [activePanel, setActivePanel] = useState<'editor' | 'visual'>('editor');

  // Draft Management
  const {
    drafts,
    hasDrafts,
    draftId,
    draftTitle,
    draftContent,
    saveDraft,
    deleteDraft,
    loadDraft,
    createNewDraft,
    saveDraftPostTitle
  } = useDraftManager();

  // URL Management
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || '';

  // Initialize draft from URL
  useEffect(() => {
    const initializeDraft = async () => {
      if (id) {
        await loadDraft(id);
      } else {
        const newId = createNewDraft();
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('id', newId);
        const newUrl = `/new-story?${searchParams.toString()}`;
        navigator(newUrl);
      }
    };

    initializeDraft();
  }, [id, loadDraft, createNewDraft]);

  // Load saved layout preferences
  useEffect(() => {
    const savedLayout = localStorage.getItem('postFormLayout');
    const savedWidth = localStorage.getItem('postFormPanelWidth');
    const savedLeftWidth = localStorage.getItem('leftPanelWidth');
    
    if (savedLayout) setPanelLayout(savedLayout as 'right' | 'split');
    if (savedWidth) setPanelWidth(parseInt(savedWidth));
    if (savedLeftWidth) setLeftPanelWidth(parseInt(savedLeftWidth));
  }, []);

  // Add Post Mutation
  const [addPost] = useAstroMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data: { addPost: { post: { _id: string; }; }; }) => {
      deleteDraft(draftId);
      toast.success("Your Story is Published!");

      const notesPublished: { [key: string]: any } = getCache('notesPublished') || {};
      notesPublished[data.addPost.post._id] = {
        postTitle: draftTitle,
        postText: draftContent,
        createdAt: new Date().toLocaleString()
      };
      setCache('notesPublished', notesPublished);
      
      navigator('/threads/' + data?.addPost?.post?._id);
    },
    onError: (error) => {
      console.error('Error publishing post:', error);
      toast.error("Failed to publish your story. Please try again.");
    },
  });

  // Panel Resize Handlers
  const handleHorizontalResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingHorizontal(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const newWidth = windowWidth - moveEvent.clientX;
      const constrainedWidth = Math.min(Math.max(newWidth, 300), windowWidth * 0.7);
      setPanelWidth(constrainedWidth);
      localStorage.setItem('postFormPanelWidth', constrainedWidth.toString());
    };

    const handleMouseUp = () => {
      setIsResizingHorizontal(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleLeftPanelResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsLeftPanelResizing(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = moveEvent.clientX;
      const constrainedWidth = Math.min(Math.max(newWidth, 300), window.innerWidth * 0.3);
      setLeftPanelWidth(constrainedWidth);
      localStorage.setItem('leftPanelWidth', constrainedWidth.toString());
    };

    const handleMouseUp = () => {
      setIsLeftPanelResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  // Layout Toggle Handler
  const togglePanelLayout = useCallback(() => {
    const newLayout = panelLayout === 'right' ? 'split' : 'right';
    setPanelLayout(newLayout);
    localStorage.setItem('postFormLayout', newLayout);
  }, [panelLayout]);

  // Publish Handler
  const handlePublish = async (topics: TopicOptions[], imageUrl: string | null, isPublic: boolean): Promise<void> => {
    const payloadTopics = topics.map((topic) => ({
      name: topic?.name,
      _id: topic?._id,
      unitId: topic?.unitId,
      universityCount: topic?.universityCount,
      entityType: topic?.entityType,
    }));

    try {
      await addPost({
        variables: {
          title: draftTitle,
          postText: draftContent,
          id: 'others',
          tags: payloadTopics
        },
      });
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post. Please try again.');
    }
  };

  // Content Change Handlers
  const handleTitleChange = useCallback((newTitle: string) => {
    saveDraftPostTitle(draftId, newTitle);
  }, [draftId, saveDraftPostTitle]);

  const handlePostTextChange = useCallback((newPostText: string) => {
    saveDraft(draftId, draftTitle, newPostText);
  }, [draftId, draftTitle, saveDraft]);

  return (
    <div className="relative h-screen flex overflow-hidden">
      {/* Left Panel */}
      <SidePanel
        width={leftPanelWidth}
        isResizing={isLeftPanelResizing}
        position="left"
        onResizeStart={handleLeftPanelResizeStart}
      >
        <Text2ImagePanel />
      </SidePanel>

      {/* Main Editor */}
      <MainEditor
        draftId={draftId}
        draftTitle={draftTitle}
        draftContent={draftContent}
        onTitleChange={handleTitleChange}
        onContentChange={handlePostTextChange}
        panelLayout={panelLayout}
      />

      {/* Right Panel */}
      <SidePanel
        width={panelWidth}
        isResizing={isResizingHorizontal}
        position="right"
        panelLayout={panelLayout}
        onResizeStart={handleHorizontalResizeStart}
      >
        <LayoutToggle
          layout={panelLayout}
          onToggle={togglePanelLayout}
        />
        <VisualAidPanel />
      </SidePanel>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          postDraft={{ title: draftTitle, postText: draftContent }}
          onClose={() => setShowPreview(false)}
          onPublish={handlePublish}
          topics={topics}
          setTopics={setTopics}
          onSave={(topics: TopicOptions[], imageUrl: string | null) => {
            // Handle save
          }}
          draftId={draftId}
        />
      )}

      {/* Bottom Bar */}
      <PublishBar
        hasDrafts={hasDrafts}
        onPreview={() => setShowPreview(true)}
        panelLayout={panelLayout}
        panelWidth={panelWidth}
        leftPanelWidth={leftPanelWidth}
      />
    </div>
  );
};

export default PostForm;