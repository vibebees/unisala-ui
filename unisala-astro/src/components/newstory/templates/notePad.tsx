import { useAstroMutation } from "@/datasource/apollo-client";
import { AddPost } from "@/datasource/graphql/user";
import { USER_SERVICE_GQL } from "@/datasource/servers/types";
import { useDraftManager } from "@/hooks/useDraftManager";
import { usePublishedPostManager } from "@/hooks/usePublishedPostManager";
import type { PostDraft, TopicOptions } from "@/types/post";
import { getCache, setCache } from "@/utils/cache";
import { navigator } from "@/utils/lib/URLupdate";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthProvider } from '@/context/AuthContext';
import EditorLayout from "./editorLayout";

interface PostFormProps {
    initialPostDraft?: PostDraft;
}

const NotePad: React.FC<PostFormProps> = ({ }) => {
    const [ showPreview, setShowPreview ] = useState(false);
    const [ topics, setTopics ] = useState<TopicOptions[]>([]);
    const [ showImagePanel, setShowImagePanel ] = useState(false);
    const [ activeTab, setActiveTab ] = useState<'editor' | 'visual'>('editor');
    const { hasPosts } = usePublishedPostManager();

    const {
        hasDrafts,
        draftId,
        draftTitle,
        draftContent,
        saveDraft,
        deleteDraft,
        loadDraft,
        createNewDraft,
        saveDraftPostTitle,
    } = useDraftManager();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || '';

    const debouncedSaveDraft = useCallback(
        debounce((id: string, title: string, content: string) => {
            saveDraft(id, title, content);
        }, 500),
        [ saveDraft ]
    );

    useEffect(() => {
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
    }, [ id, loadDraft, createNewDraft ]);

    const [ addPost ] = useAstroMutation(AddPost, {
        context: { server: USER_SERVICE_GQL },
        onCompleted: (data: { addPost: { post: { _id: string } } }) => {
            deleteDraft(draftId);
            toast.success('Your Story is Published!');

            const notesPublished: { [key: string]: any } = getCache('notesPublished') || {};
            notesPublished[ data.addPost.post._id ] = {
                postTitle: draftTitle,
                postText: draftContent,
                createdAt: new Date().toLocaleString(),
            };
            setCache('notesPublished', notesPublished);

            navigator('/threads/' + data?.addPost?.post?._id);
        },
        onError: (error) => {
            console.error('Error publishing post:', error);
            toast.error('Failed to publish your story. Please try again.');
        },
    });

    const handleTitleChange = useCallback(
        (newTitle: string) => {
            saveDraftPostTitle(draftId, newTitle);
        },
        [ draftId, saveDraftPostTitle ]
    );

    const handlePostTextChange = useCallback(
        (newPostText: string) => {
            debouncedSaveDraft(draftId, draftTitle, newPostText);
        },
        [ draftId, draftTitle, debouncedSaveDraft ]
    );

    const handlePublish = async (
        topics: TopicOptions[],
        imageUrl: string | null,
        isPublic: boolean
    ): Promise<boolean> => {
        try {
            await addPost({
                variables: {
                    title: draftTitle,
                    postText: draftContent,
                    id: 'others',
                    tags: topics.map((topic) => ({
                        name: topic?.name,
                        _id: topic?._id,
                        unitId: topic?.unitId,
                        universityCount: topic?.universityCount,
                        entityType: topic?.entityType,
                    })),
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
            <EditorLayout
                draftId={draftId}
                draftTitle={draftTitle}
                draftContent={draftContent}
                onTitleChange={handleTitleChange}
                onContentChange={handlePostTextChange}
                showImagePanel={showImagePanel}
                setShowImagePanel={setShowImagePanel}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                hasDrafts={hasDrafts}
                hasPosts={hasPosts}
                handlePublish={handlePublish}
                topics={topics}
                setTopics={setTopics} isDashboardCollapsed={false} setIsDashboardCollapsed={function (isDashboardCollapsed: boolean): void {
                    throw new Error("Function not implemented.");
                } }
            />
        </AuthProvider>
    );
};

export default NotePad;