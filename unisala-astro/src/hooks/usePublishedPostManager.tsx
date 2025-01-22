import { useState, useEffect, useCallback } from 'react';

interface PublishedPost {
    postTitle: string;
    postText: string;
    createdAt: string;
}

interface PublishedPosts {
    [id: string]: PublishedPost;
}

export const usePublishedPostManager = () => {
    const [posts, setPosts] = useState<PublishedPosts>({});
    const [hasPosts, setHasPosts] = useState(false);

    const loadPosts = useCallback(() => {
        const storedPosts = JSON.parse(localStorage.getItem('notesPublished') || '{}');
        setPosts(storedPosts);
        setHasPosts(Object.keys(storedPosts).length > 0);
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const getPost = useCallback((id: string) => {
        return posts[id];
    }, [posts]);

    return {
        posts,
        hasPosts,
        getPost,
        loadPosts
    };
};