// components/PostForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { PostDraft } from '@/types/post';
import { lazy, Suspense } from 'react';
import { fetchApi } from '@/utils/api.utility';
import { userServiceGql } from '@/datasource/servers';
import { useAstroMutation } from '@/datasource/apollo-client';
import { AddPost } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';
import { navigator } from '@/utils/lib/URLupdate';
const TextareaEditor = lazy(() => import('@/components/ui/textEditor').then(module => ({ default: module.TextareaEditor })));
const TextareaAutoGrow = lazy(() => import('@/components/ui/textarea').then(module => ({ default: module.TextareaAutoGrow })));
import PreviewModal from '@/components/ui/modal';
interface PostFormProps {
    initialPostDraft: PostDraft;
}

const PostForm: React.FC<PostFormProps> = ({ initialPostDraft }) => {
    const [postDraft, setPostDraft] = useState<PostDraft>(initialPostDraft);
    const [showPreview, setShowPreview] = useState(false);

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
    const handlePublish = (topics: string[]) => {
        const finalDraft = { ...postDraft, topics };
        // addPost({
        //     variables: finalDraft,
        // });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let postDraft = {
            title: localStorage.getItem('new.story.title') || '',
            postText: localStorage.getItem('new.story.postText') || '',
            id: 'others'
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
                        item={{}}
                        postData={postDraft}
                        name='postText'
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
                />
            )}
        </div>
    );
};

export default PostForm;