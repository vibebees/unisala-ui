import React from 'react';
import { usePublishedPostManager } from '@/hooks/usePublishedPostManager';

interface PublishedPost {
    postTitle: string;
    postText: string;
    createdAt: string;
}

const PublishedPostsList: React.FC = () => {
    const { posts } = usePublishedPostManager();

    const handlePostClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        window.location.href = `/threads/${id}`;
    };

    return (
        <ul className="space-y-4 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            {Object.entries(posts).map(([id, post]: [string, PublishedPost]) => (
                <li key={id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transition-colors duration-200">
                    <div className="flex justify-between items-center">
                        <a 
                            href={`/threads/${id}`} 
                            onClick={(e) => handlePostClick(e, id)}
                            className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            {post.postTitle}
                        </a>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Published: {post.createdAt}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default PublishedPostsList;