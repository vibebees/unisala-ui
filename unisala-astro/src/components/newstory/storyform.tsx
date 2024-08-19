import React, { useState, useEffect, lazy } from 'react';
import { Button } from '@/components/ui/button';
import type { PostDraft, TopicOptions } from '@/types/post';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddPost } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { navigator } from '@/utils/lib/URLupdate';
import PreviewModal from './storyPreviewModal';
import { getCache } from '@/utils/cache';

const TextareaEditor = lazy(() => import('@/components/ui/textEditor').then(module => ({ default: module.TextareaEditor })));
const TextareaAutoGrow = lazy(() => import('@/components/ui/textarea').then(module => ({ default: module.TextareaAutoGrow })));

interface PostFormProps {
    initialPostDraft: PostDraft;
}

const PostForm: React.FC<PostFormProps> = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [topics, setTopics] = useState<TopicOptions[]>([]);
    const [hasDrafts, setHasDrafts] = useState(false);

    // get q value from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || '';
    const draftKeyTitle = id + '.postTitle';
    const draftKeyPostText = id + '.postText';
    const userData = getCache('authData');

    const checkForDrafts = () => {
        const draftKeys = Object.keys(localStorage).filter(key => key.includes('.postText') );
        console.log(draftKeys)
        return draftKeys.length > 1;
    };

    useEffect(() => {
        if (id) {
            setHasDrafts(checkForDrafts());
        } else {
            navigator('/new-story?id=' + new Date().getTime());
        }
    }, [id]);

    const [addPost] = useAstroMutation(AddPost, {
        context: { server: USER_SERVICE_GQL },
        onCompleted: (data) => {
            localStorage.removeItem(draftKeyTitle);
            localStorage.removeItem(draftKeyPostText);
            toast.success("Your Story is Published!");
            navigator('/threads/' + data?.addPost?.post?._id);
            setHasDrafts(checkForDrafts());
        },
        onError: (error) => {
            console.error('Error publishing post:', error);
            toast.error("Failed to publish your story. Please try again.");
        },
    });

    useEffect(() => {
        if (!userData) {
            navigator('/auth?redirect=new-story');
        }
    }, [userData]);

    const handlePublish = async (e: any): Promise<void> => {
        e.preventDefault();
        const payloadTopics = topics.map((topic) => ({
            name: topic?.name,
            _id: topic?._id,
            unitId: topic?.unitId,
            universityCount: topic?.universityCount,
            entityType: topic?.entityType,
        }));

        const postDraft = {
            title: localStorage.getItem(draftKeyTitle) || '',
            postText: localStorage.getItem(draftKeyPostText) || '',
            id: 'others',
            tags: payloadTopics
        };

        try {
            await addPost({
                variables: {
                    ...postDraft,
                },
            });
        } catch (error) {
            console.error('Error publishing post:', error);
            toast.error('Failed to publish post. Please try again.');
        }
    };

    return (
        <div className='container max-w-screen-md mx-auto pt-12 pb-32'>
            <form id='postForm' onSubmit={(e) => e.preventDefault()}>
                <div>
                    <TextareaAutoGrow
                        placeholder='Title of your story!'
                        className='min-h-[100px]'
                        maxHeight='50vh'
                        name='title'
                        draftKey={draftKeyTitle}
                    />
                </div>
                <div>
                    <TextareaEditor
                        placeholder='Tell your story...'
                        draftKey={draftKeyPostText}
                    />
                </div>
                <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200 ease-in-out'>
                    <div className='container max-w-screen-md mx-auto'>
                        <div className='flex items-center justify-end'>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPreview(true);
                                }}
                                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                            >
                                Preview & Publish
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            {showPreview && (
                <PreviewModal
                    postDraft={{
                        title: localStorage.getItem(draftKeyTitle) || '',
                        postText: localStorage.getItem(draftKeyPostText) || '',
                    }}
                    onClose={() => setShowPreview(false)}
                    onPublish={handlePublish}
                    topics={topics}
                    setTopics={setTopics}
                />
            )}

            {hasDrafts && (
                <a href="/new-story/drafts" className="block text-center mt-40 text-blue-500">View Drafts</a>
            )}
        </div>
    );
};

export default PostForm;