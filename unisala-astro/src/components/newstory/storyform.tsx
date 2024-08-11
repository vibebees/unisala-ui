// components/PostForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { PostDraft, TopicOptions } from '@/types/post';
import { lazy } from 'react';
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
    const postDraft = useState<PostDraft>();
    const [showPreview, setShowPreview] = useState(false);
    const [topics, setTopics] = useState<TopicOptions[]>([]);
    const [addPost] = useAstroMutation(AddPost, {
        context: { server: USER_SERVICE_GQL },
        onCompleted: (data) => {
            localStorage.removeItem('new.story.title');
            localStorage.removeItem('new.story.postText');
            toast.success("Your Story is Published!");
            navigator('/threads/' + data?.addPost?.post?._id);
        },
        onError: (error) => {
        },
    });
    const userData = getCache('authData');
    useEffect(() => {
        if (!userData) {
            navigator('/auth?redirect=new-story');
        }
    }, [userData]);
 

    const handlePublish = async (e:any): Promise<void> => {

        const payloadTopics = topics.map((topic) => {
            return {
                name: topic?.name,
                _id: topic?._id,
                unitId: topic?.unitId,
                universityCount: topic?.universityCount,
                entityType: topic?.entityType,
            }
        })
        const postDraft = {
            title: localStorage.getItem('new.story.title') || '',
            postText: localStorage.getItem('new.story.postText') || '',
            id: 'others',
            tags:payloadTopics
        }
        try {
            addPost({
                variables: {
                    ...postDraft,
                },
            });
    
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post. Please try again.');
        }
    };

    return (
        <div className='container max-w-screen-md mx-auto pt-12 pb-32'>
            <form id='postForm' onSubmit={()=>{
                // handleSubmit()
            }}>
                <div>
                    <TextareaAutoGrow
                        placeholder='Title of your story!'
                        className='min-h-[100px]'
                        maxHeight='50vh'
                        name='title'
                        key='new.story.title'
                    />
                </div>
                <div>
                    <TextareaEditor
                        placeholder='Tell your story...'
                        key='new.story.postText'
                    />
                </div>
                <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200 ease-in-out'>
                    <div className='container max-w-screen-md mx-auto'>
                        <div className='flex items-center justify-end'>
                            {/* <Button
                                type='submit'
                                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                            >
                                Publish
                            </Button> */}
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowPreview(true)
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
                        title: localStorage.getItem('new.story.title') || '',
                        postText: localStorage.getItem('new.story.postText') || '',
                    }}
                    onClose={() => setShowPreview(false)}
                    onPublish={handlePublish}
                    topics={topics}
                    setTopics={setTopics}
                />
            )}
        </div>
    );
};

export default PostForm;