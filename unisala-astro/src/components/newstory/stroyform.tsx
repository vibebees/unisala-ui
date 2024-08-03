// components/PostForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { PostDraft } from '@/types/post';
import { lazy, Suspense } from 'react';
const TextareaEditor = lazy(() =>  import('@/components/ui/textarea').then(module => ({ default: module.TextareaEditor })));
const TextareaAutoGrow = lazy(() => import('@/components/ui/textAreaAutoGrow').then(module => ({ default: module.TextareaAutoGrow })));

interface PostFormProps {
    initialPostDraft: PostDraft;
}

const PostForm: React.FC<PostFormProps> = ({ initialPostDraft }) => {
    const [postDraft, setPostDraft] = useState<PostDraft>(initialPostDraft);

    useEffect(() => {
        const savedPostDraft = localStorage.getItem('postDraft');
        if (savedPostDraft) {
            setPostDraft(JSON.parse(savedPostDraft) as PostDraft);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('postDraft', JSON.stringify(postDraft));
    }, [postDraft]);

    const handleChange = <K extends keyof PostDraft>(field: K, value: PostDraft[K]): void => {
        setPostDraft(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch('/api/publish-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postDraft),
            });
            if (response.ok) {
                alert('Post published successfully!');
                setPostDraft(initialPostDraft);
                localStorage.removeItem('postDraft');
            } else {
                throw new Error('Failed to publish post');
            }
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post. Please try again.');
        }
    };

    return (
        <div className='container max-w-screen-md mx-auto pt-12 pb-32'>
            <form id='postForm' onSubmit={handleSubmit}>
                <div>
                    <TextareaAutoGrow
                        placeholder='Title of your story!'
                        className='min-h-[100px]'
                        maxHeight='50vh'
                        name='title'
                        id='title-input'
                        value={postDraft.title}
                        setValue={(value: string) => handleChange('title', value)}
                    />
                </div>
                <div>
                    <TextareaEditor
                        placeholder='Tell your story...'
                        item={{}}
                        postData={postDraft}
                        setPostData={setPostDraft}
                        name='postText'
                        value={postDraft.postText}
                        setValue={(value: string) => handleChange('postText', value)}
                    />
                </div>
                <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200 ease-in-out'>
                    <div className='container max-w-screen-md mx-auto'>
                        <div className='flex items-center justify-end'>
                            <Button
                                type='submit'
                                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                            >
                                Publish
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostForm;