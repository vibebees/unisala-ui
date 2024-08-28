import { useState, useEffect, useCallback } from 'react';

interface Draft {
    postTitle: string;
    postText: string;
    createdAt: string;
    updatedAt: string;
}

interface StoryDrafts {
    [timestamp: string]: Draft;
}

export const useDraftManager = () => {
    const [drafts, setDrafts] = useState<StoryDrafts>({});
    const [hasDrafts, setHasDrafts] = useState(false);
    const [draftId, setDraftId] = useState('');
    const [draftTitle, setDraftTitle] = useState('');
    const [draftContent, setDraftContent] = useState('');

    const migrateOldData = useCallback(() => {
        const keys = Object.keys(localStorage);
        const migratedDrafts: StoryDrafts = {};
    
        keys.forEach(key => {
            if (key.endsWith('.postTitle') || key.endsWith('.postText')) {
                const timestamp = key.split('.')[0];
                // Initialize if not already added
                if (!migratedDrafts[timestamp]) {
                    migratedDrafts[timestamp] = {
                        postTitle: localStorage.getItem(`${timestamp}.postTitle`) || '',
                        postText: localStorage.getItem(`${timestamp}.postText`) || '',
                        createdAt: new Date(parseInt(timestamp)).toLocaleString(),
                        updatedAt: new Date(parseInt(timestamp)).toLocaleString()
                    };
                } else {
                    // Merge content if missing
                    migratedDrafts[timestamp].postTitle = migratedDrafts[timestamp].postTitle || localStorage.getItem(`${timestamp}.postTitle`) || '';
                    migratedDrafts[timestamp].postText = migratedDrafts[timestamp].postText || localStorage.getItem(`${timestamp}.postText`) || '';
                    migratedDrafts[timestamp].updatedAt = new Date().toLocaleString();
                }
            }
        });
    
        return migratedDrafts;
    }, []);
    

    const loadDrafts = useCallback(() => {
        let storedDrafts = JSON.parse(localStorage.getItem('storyDrafts') || '{}');
        
        if (Object.keys(storedDrafts).length === 0) {
            // If no drafts in new format, try to migrate old data
            storedDrafts = migrateOldData();
            if (Object.keys(storedDrafts).length > 0) {
                localStorage.setItem('storyDrafts', JSON.stringify(storedDrafts));
                // Clean up old data
                Object.keys(storedDrafts).forEach(timestamp => {
                    localStorage.removeItem(`${timestamp}.postTitle`);
                    localStorage.removeItem(`${timestamp}.postText`);
                });
            }
        }

        setDrafts(storedDrafts);
        setHasDrafts(Object.keys(storedDrafts).length > 0);
    }, [migrateOldData]);

    useEffect(() => {
        loadDrafts();
    }, [loadDrafts]);

    const saveDraft = useCallback((id: string, postTitle: string, postText: string) => {
        if (!postTitle.trim() && !postText.trim()) {
            console.warn("Cannot save empty draft");
            return;
        }

        const timestamp = Date.now();
        const updatedAt = new Date(timestamp).toLocaleString();
        const updatedDrafts = { ...drafts };
        
        if (id in updatedDrafts) {
            updatedDrafts[id] = {
                ...updatedDrafts[id],
                postTitle,
                postText,
                updatedAt
            };
        } else {
            updatedDrafts[timestamp.toString()] = {
                postTitle,
                postText,
                createdAt: updatedAt,
                updatedAt
            };
            id = timestamp.toString();
        }

        localStorage.setItem('storyDrafts', JSON.stringify(updatedDrafts));
        setDrafts(updatedDrafts);
        setDraftId(id);
        setDraftTitle(postTitle);
        setDraftContent(postText);
        setHasDrafts(true);
    }, [drafts]);

    const loadDraft = useCallback((id: string) => {
        const draft = drafts[id];
        if (draft) {
            setDraftId(id);
            setDraftTitle(draft.postTitle);
            setDraftContent(draft.postText);
        }
    }, [drafts]);

    const deleteDraft = useCallback((id: string) => {
        const updatedDrafts = { ...drafts };
        delete updatedDrafts[id];
        localStorage.setItem('storyDrafts', JSON.stringify(updatedDrafts));
        setDrafts(updatedDrafts);
        setHasDrafts(Object.keys(updatedDrafts).length > 0);
        if (id === draftId) {
            setDraftId('');
            setDraftTitle('');
            setDraftContent('');
        }
    }, [drafts, draftId]);

    const createNewDraft = useCallback(() => {
        const newId = Date.now().toString();
        saveDraft(newId, '', '');
        return newId;
    }, [saveDraft]);

    return {
        drafts,
        hasDrafts,
        draftId,
        draftTitle,
        draftContent,
        saveDraft,
        deleteDraft,
        loadDraft,
        loadDrafts,
        createNewDraft
    };
};
