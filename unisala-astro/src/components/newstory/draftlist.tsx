import React from 'react';
import { useDraftManager } from '@/hooks/useDraftManager';
import { Button } from '@/components/ui/button';

interface Draft {
    postTitle: string;
    postText: string;
    createdAt: string;
    updatedAt: string;
}

const DraftsList: React.FC = () => {
    const { drafts, deleteDraft } = useDraftManager();

    const handleDeleteDraft = (id: string) => {
        if (window.confirm('Are you sure you want to delete this draft?')) {
            deleteDraft(id);
        }
    };

    const handleDraftClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        window.location.href = `/new-story?id=${id}`;
    };

    return (
        <ul className="space-y-4 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            {Object.entries(drafts).map(([id, draft]: [string, Draft]) => (
                <li key={id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transition-colors duration-200">
                    <div className="flex justify-between items-center">
                        <a 
                            href={`/new-story?id=${id}`} 
                            onClick={(e) => handleDraftClick(e, id)}
                            className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            {draft.postTitle || 'Untitled Draft'}
                        </a>
                        <Button
                            onClick={() => handleDeleteDraft(id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full text-sm transition duration-300 ease-in-out"
                        >
                            Delete
                        </Button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Created: {draft.createdAt}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {draft.updatedAt}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default DraftsList;