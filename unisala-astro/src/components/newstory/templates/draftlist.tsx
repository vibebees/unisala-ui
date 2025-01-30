import React, { useEffect } from 'react';
import { useDraftManager } from '@/hooks/useDraftManager';
import { Button } from '@/components/ui/button';
import { useAstroQuery } from '@/datasource/apollo-client';
import { getNotes } from '@/datasource/graphql/user';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';

interface NotesQueryResponse {
    getNotes: {
        data: string;
    }
}

const DraftsList: React.FC = () => {
    const { 
        drafts, 
        deleteDraft, 
        loadDrafts,
        saveDraft 
    } = useDraftManager();

    const { data, loading, error } = useAstroQuery<NotesQueryResponse>(getNotes, {
        context: { server: USER_SERVICE_GQL },
        fetchPolicy: 'cache-and-network',
        variables: { q: "searchQuery" },
        onError: (error) => {
            // Log error but don't block local functionality
            console.warn('Failed to fetch server notes:', error);
            // Load local drafts anyway
            loadDrafts();
        }
    });

    // Handle incoming server data when available
    useEffect(() => {
        if (!loading && !error && data?.getNotes?.data) {
            try {
                const serverNotes = JSON.parse(data.getNotes.data);
                
                // For each server note, save it to local drafts if it's new or updated
                Object.entries(serverNotes).forEach(([id, serverDraft]: [string, any]) => {
                    const localDraft = drafts[id];
                    
                    // If draft doesn't exist locally or server version is newer
                    if (!localDraft || new Date(serverDraft.updatedAt) > new Date(localDraft.updatedAt)) {
                        saveDraft(id, serverDraft.postTitle, serverDraft.postText);
                    }
                });

                // Refresh local drafts after updates
                loadDrafts();
            } catch (e) {
                console.error('Error processing server notes:', e);
                // Ensure local drafts are loaded even if server data processing fails
                loadDrafts();
            }
        }
    }, [data, loading, error, drafts, saveDraft, loadDrafts]);

    // Initial load of local drafts
    useEffect(() => {
        loadDrafts();
    }, [loadDrafts]);

    const handleDeleteDraft = (id: string) => {
        if (window.confirm('Are you sure you want to delete this draft?')) {
            deleteDraft(id);
        }
    };

    const handleDraftClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        window.location.href = `/new-story?id=${id}`;
    };

    // Don't show loading state if we have local drafts
    if (loading && Object.keys(drafts).length === 0) {
        return <div className="p-4">Loading drafts...</div>;
    }

    return (
        <>
            {error && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-4">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        Working in offline mode. Your drafts are saved locally.
                    </p>
                </div>
            )}
            <ul className="space-y-4 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
                {Object.entries(drafts).map(([id, draft]) => (
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
                {Object.keys(drafts).length === 0 && (
                    <li className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No drafts yet. Start writing to create one!
                    </li>
                )}
            </ul>
        </>
    );
};

export default DraftsList;