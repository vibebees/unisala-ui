import React, { useState, useCallback } from 'react';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddPost } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { navigator } from '@/utils/lib/URLupdate';
import { getCache, setCache } from '@/utils/cache';
import { useDraftManager } from '@/hooks/useDraftManager';
import type { PostDraft, TopicOptions } from '@/types/post';
import { X, Image, Wand2, PenTool, Eye } from 'lucide-react';

// Import existing components
import { MainEditor } from './molecules/MainEditor';
import PreviewModal from './storyPreviewModal';
import VisualAidPanel from './visualAidPanel';
import { usePublishedPostManager } from '@/hooks/usePublishedPostManager';
import { AuthProvider } from '@/context/AuthContext';
import { debounce } from 'lodash';


interface PostFormProps {
  initialPostDraft?: PostDraft;
}

 


const PostForm: React.FC<PostFormProps> = ({ initialPostDraft }) => {
  // Essential state
  const [showPreview, setShowPreview] = useState(false);
  const [topics, setTopics] = useState<TopicOptions[]>([]);
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'visual'>('editor');
  const { hasPosts } = usePublishedPostManager();

  // Draft Management
  const {
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

  // Debounced save
  const debouncedSaveDraft = useCallback(
    debounce((id: string, title: string, content: string) => {
      saveDraft(id, title, content);
    }, 500),
    [saveDraft]
  );

  // Initialize draft from URL
  React.useEffect(() => {
    const initializeDraft = async () => {
      if (id) {
        await loadDraft(id);
      } else {
        const newId = createNewDraft();
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('id', newId);
        navigator(`/new-story?${searchParams.toString()}`);
      }
    };

    initializeDraft();
  }, [id, loadDraft, createNewDraft]);

  // Add Post Mutation
  const [addPost] = useAstroMutation(AddPost, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data: { addPost: { post: { _id: string } } }) => {
      deleteDraft(draftId);
      toast.success("Your Story is Published!");

      const notesPublished: { [key: string]: { postTitle: string; postText: string; createdAt: string } } = getCache('notesPublished') || {};
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

  // Content Change Handlers
  const handleTitleChange = useCallback((newTitle: string) => {
    saveDraftPostTitle(draftId, newTitle);
  }, [draftId, saveDraftPostTitle]);

  const handlePostTextChange = useCallback((newPostText: string) => {
    debouncedSaveDraft(draftId, draftTitle, newPostText);
  }, [draftId, draftTitle, debouncedSaveDraft]);

  // Publish Handler
  const handlePublish = async (topics: TopicOptions[], imageUrl: string | null, isPublic: boolean): Promise<boolean> => {
      try {
        await addPost({
          variables: {
            title: draftTitle,
            postText: draftContent,
            id: 'others',
            tags: topics.map(topic => ({
              name: topic?.name,
              _id: topic?._id,
              unitId: topic?.unitId,
              universityCount: topic?.universityCount,
              entityType: topic?.entityType,
            }))
          },
        });
        return true;
      } catch (error) {
        console.error('Error publishing post:', error);
        toast.error('Failed to publish post. Please try again.');
        return false;
      }
    };

  return (
    <AuthProvider>
    <div className=" dark: text-black dark:text-white relative min-h-screen ">
  {/* Bottom Navigation Bar */}
  <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-10">
        <div className="max-w-screen-lg mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('editor');
                    setShowImagePanel(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'editor'
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  Editor
                </button>
                <button
                  onClick={() => {
                    setActiveTab('visual');
                    setShowImagePanel(!showImagePanel);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'visual'
                      ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Wand2 className="w-4 h-4" />
                  Visual Aids
                </button>
              </div>

              {hasDrafts && (
                <>
                  <div className="mx-4 h-6 border-l border-gray-200 dark:border-gray-700" />
                  <a
                    href="/new-story/drafts"
                    className="text-blue-500 dark:text-blue-400 text-sm hover:underline flex items-center"
                  >
                    View Drafts
                  </a>
                </>
              )}

              {hasPosts && (
                <>
                  <div className="mx-4 h-6 border-l border-gray-200 dark:border-gray-700" />
                  <a
                    href="/published"
                    className="text-green-500 dark:text-green-400 text-sm hover:underline flex items-center"
                  >
                    Published
                  </a>
                </>
              )}
            </div>

            <button
              onClick={() => setShowPreview(true)}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Preview & Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sliding Panel */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Editor Area */}
        <div className={`flex-1 px-4 py-6 transition-all duration-300 ${showImagePanel ? 'mr-[400px]' : ''}`}>
          <div className="max-w-4xl mx-auto">
            <MainEditor
              draftId={draftId}
              draftTitle={draftTitle}
              draftContent={draftContent}
              onTitleChange={handleTitleChange}
              onContentChange={handlePostTextChange} panelLayout={'split'}            />
          </div>
        </div>

        {/* Visual Aid Panel - Sliding from right */}
        <div 
          className={`fixed right-0 top-0 w-[400px] h-[calc(100vh-64px)]  shadow-lg border-l border-gray-200 transform transition-transform duration-300 ${
            showImagePanel ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold">Visual Aids</h3>
              <button
                onClick={() => {
                  setShowImagePanel(false);
                  setActiveTab('editor');
                }}
                className="p-1 hover: rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <VisualAidPanel containerWidth={400} />
            </div>
          </div>
        </div>
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
    </div>
    </AuthProvider>
  );
};

export default PostForm;