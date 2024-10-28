import React, { useState, useEffect, lazy, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import type { PostDraft, TopicOptions } from '@/types/post';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddPost } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { navigator } from '@/utils/lib/URLupdate';
import PreviewModal from './storyPreviewModal';
import { getCache, setCache } from '@/utils/cache';
import { useDraftManager } from '@/hooks/useDraftManager';
import VisualAidPanel from './visualAidPanel';
import Text2ImagePanel from './imageGeneration';
import { ArrowLeftCircle, ArrowRightCircle, GripHorizontal } from 'lucide-react';

// Lazy load heavy components
const TextareaEditor = lazy(() => 
  import('@/components/ui/textEditor').then(module => ({ 
    default: module.TextareaEditor 
  }))
);
const TextareaAutoGrow = lazy(() => 
  import('@/components/ui/textarea').then(module => ({ 
    default: module.TextareaAutoGrow 
  }))
);

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
            {/* Left Panel - Text to Image */}
            <div 
                style={{ width: leftPanelWidth }}
                className={`h-full bg-white dark:bg-gray-800 border-r border-gray-200 
                    dark:border-gray-700 transition-all duration-200 ease-in-out overflow-y-auto
                    relative ${isLeftPanelResizing ? 'select-none' : ''}`}
            >
                {/* Resize Handle */}
                <div
                    className={`absolute right-0 top-0 bottom-0 w-4 cursor-col-resize 
                        flex items-center justify-center hover:bg-gray-100 
                        dark:hover:bg-gray-700 transform translate-x-1/2 z-20
                        ${isLeftPanelResizing ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                    onMouseDown={handleLeftPanelResizeStart}
                >
                    <GripHorizontal className="h-6 w-6 text-gray-400" />
                </div>

                <Text2ImagePanel />
            </div>

            {/* Main Editor Section */}
            <div 
                className={`transition-all duration-200 ease-in-out flex-grow 
                    ${panelLayout === 'split' 
                        ? `w-[calc(100%-${panelWidth + leftPanelWidth}px)]` 
                        : `w-[calc(100%-${leftPanelWidth}px)]`}`}
            >
                <div className="h-full overflow-y-auto">
                    <div className={`${panelLayout === 'split' ? 'pr-4' : 'container max-w-screen-md mx-auto'}`}>
                        <form id='postForm' className="pt-12 pb-32">
                            {/* Title Section */}
                            <div className="mb-8">
                                <TextareaAutoGrow
                                    placeholder='Title of your story!'
                                    className='min-h-[100px] w-full p-4 text-2xl font-bold'
                                    maxHeight='50vh'
                                    name='title'
                                    value={draftTitle}
                                    draftId={draftId}
                                    onContentChange={handleTitleChange}
                                />
                            </div>
                            
                            {/* Editor Section */}
                            <div className="relative min-h-[calc(100vh-300px)]">
                                <TextareaEditor
                                    placeholder='Tell your story...'
                                    draftKey={id}
                                    initialValue={draftContent}
                                    onContentChange={handlePostTextChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Visual Aid Panel */}
            <div 
                style={{ width: panelWidth }}
                className={`h-full bg-white dark:bg-gray-800 border-l border-gray-200 
                    dark:border-gray-700 transition-all duration-200 ease-in-out overflow-y-auto
                    ${panelLayout === 'right' ? 'fixed right-0' : 'relative'}
                    ${isResizingHorizontal ? 'select-none' : ''}`}
            >
                {/* Resize Handle */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-4 cursor-col-resize 
                        flex items-center justify-center hover:bg-gray-100 
                        dark:hover:bg-gray-700 transform -translate-x-1/2 z-20
                        ${isResizingHorizontal ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                    onMouseDown={handleHorizontalResizeStart}
                >
                    <GripHorizontal className="h-6 w-6 text-gray-400" />
                </div>

                {/* Layout Toggle */}
                <button
                    onClick={togglePanelLayout}
                    className="absolute left-6 top-4 p-2 rounded-full hover:bg-gray-100 
                        dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    {panelLayout === 'right' ? 
                        <ArrowLeftCircle className="h-6 w-6" /> : 
                        <ArrowRightCircle className="h-6 w-6" />
                    }
                </button>

                <VisualAidPanel />
            </div>

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
            <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 
                border-t border-gray-200 dark:border-gray-700 py-4 z-20'>
                <div className={`${panelLayout === 'split' ? 
                    `w-[calc(100%-${panelWidth + leftPanelWidth}px)]` : 'container max-w-screen-md'} mx-auto`}>
                    <div className='flex items-center justify-between px-4'>
                        {hasDrafts && (
                            <a href="/new-story/drafts" 
                                className="text-blue-500 hover:text-blue-600 transition-colors">
                                View Drafts
                            </a>
                        )}
                        <Button
                            onClick={() => setShowPreview(true)}
                            className='bg-green-500 hover:bg-green-600 text-white font-bold 
                                py-2 px-6 rounded-full shadow-lg transition duration-300 
                                ease-in-out transform hover:-translate-y-1 hover:scale-105 
                                focus:outline-none focus:ring-2 focus:ring-green-500 
                                focus:ring-opacity-50'
                        >
                            Preview & Publish
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;