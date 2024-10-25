// PostForm.tsx
import React, { useState, useEffect } from 'react';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddPost } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { navigator } from '@/utils/lib/URLupdate';
import { getCache, setCache } from '@/utils/cache';
import { useDraftManager } from '@/hooks/useDraftManager';
import PreviewModal from './storyPreviewModal';
import VisualAidPanel from './visualAidPanel';
import { ResizeHandle } from './molecules/resizeHandler';
import { EditorPanel } from './molecules/editorPanel';
import { BottomBar } from './molecules/bottomBar';
import  VisualPanel  from './visualAidPanel';
import type { PostFormProps } from './molecules/types';
import type { TopicOptions } from '@/types/post';

const PostForm: React.FC<PostFormProps> = ({ initialPostDraft }) => {
    // States
    const [showPreview, setShowPreview] = useState(false);
    const [topics, setTopics] = useState<TopicOptions[]>([]);
    const [panelWidth, setPanelWidth] = useState(400);
    const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
    const [panelLayout, setPanelLayout] = useState<'right' | 'split'>('right');
    const [activePanel, setActivePanel] = useState<'editor' | 'visual'>('editor');

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

    // Initialize draft and handle URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id') || '';

        if (id) {
            loadDraft(id);
        } else {
            const newId = createNewDraft();
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('id', newId);
            navigator(`/new-story?${searchParams.toString()}`);
        }
    }, [loadDraft, createNewDraft]);

    // Load saved layout preferences
    useEffect(() => {
        const savedLayout = localStorage.getItem('postFormLayout');
        const savedWidth = localStorage.getItem('postFormPanelWidth');
        
        if (savedLayout) setPanelLayout(savedLayout as 'right' | 'split');
        if (savedWidth) setPanelWidth(parseInt(savedWidth));
    }, []);

    // Mutation setup
    const [addPost] = useAstroMutation(AddPost, {
        context: { server: USER_SERVICE_GQL },
        onCompleted: (data: { addPost: { post: { _id: string; }; }; }) => {
            deleteDraft(draftId);
            toast.success("Your Story is Published!");

            const notesPublished = getCache('notesPublished') || {};
            notesPublished[data?.addPost?.post?._id] = {
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

    // Handlers
    const handlePublish = async (): Promise<void> => {
        if (!draftTitle.trim() || !draftContent.trim()) {
            toast.error("Please add both title and content before publishing.");
            return;
        }

        try {
            const payloadTopics = topics.map((topic) => ({
                name: topic?.name,
                _id: topic?._id,
                unitId: topic?.unitId,
                universityCount: topic?.universityCount,
                entityType: topic?.entityType,
            }));

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

    const handleHorizontalResizeStart = (e: React.MouseEvent) => {
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
    };

    const handleTitleChange = (newTitle: string) => {
        saveDraftPostTitle(draftId, newTitle);
    };

    const handlePostTextChange = (newPostText: string) => {
        saveDraft(draftId, draftTitle, newPostText);
    };

    const handlePanelLayoutToggle = () => {
        const newLayout = panelLayout === 'right' ? 'split' : 'right';
        setPanelLayout(newLayout);
        localStorage.setItem('postFormLayout', newLayout);
    };

    return (
        <div className="relative h-screen flex overflow-hidden">
            <EditorPanel
                draftTitle={draftTitle}
                draftId={draftId}
                draftContent={draftContent}
                panelLayout={panelLayout}
                panelWidth={panelWidth}
                onTitleChange={handleTitleChange}
                onContentChange={handlePostTextChange}
            />

            <VisualPanel
                width={panelWidth}
                isResizing={isResizingHorizontal}
                panelLayout={panelLayout}
                onPanelClick={() => setActivePanel('visual')}
            >
                <ResizeHandle 
                    isResizing={isResizingHorizontal} 
                    onResizeStart={handleHorizontalResizeStart} 
                />
                <VisualAidPanel />
            </VisualPanel>

            {showPreview && (
                <PreviewModal
                    postDraft={{ title: draftTitle, postText: draftContent }}
                    onClose={() => setShowPreview(false)}
                    onPublish={handlePublish}
                    topics={topics}
                    draftId={draftId}
                    setTopics={setTopics}
                    onSave={(topics: TopicOptions[], imageUrl: string | null) => {
                        // Implement save functionality if needed
                        setTopics(topics);
                    }}
                />
            )}

            <BottomBar
                hasDrafts={hasDrafts}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                panelLayout={panelLayout}
                panelWidth={panelWidth}
                activePanel={activePanel}
            />
        </div>
    );
};

export default PostForm;