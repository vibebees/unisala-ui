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
    
    const saveDraft = useCallback((id: string, postTitle?: string, postText?: string) => {
        const timestamp = Date.now();
        const updatedAt = new Date(timestamp).toLocaleString();
        const updatedDrafts = { ...drafts };
        
        if (id && id in updatedDrafts) {
            // Update existing draft
            updatedDrafts[id] = {
                ...updatedDrafts[id],
                postTitle: postTitle !== undefined ? postTitle : updatedDrafts[id].postTitle,
                postText: postText !== undefined ? postText : updatedDrafts[id].postText,
                updatedAt
            };
        } else {
            // Create new draft
            id = id || timestamp.toString(); // Use provided id or create new one
            updatedDrafts[id] = {
                postTitle: postTitle || '',
                postText: postText || '',
                createdAt: updatedAt,
                updatedAt
            };
        }
    
        // Only save if there's content
        if (updatedDrafts[id].postTitle.trim() || updatedDrafts[id].postText.trim()) {
            localStorage.setItem('storyDrafts', JSON.stringify(updatedDrafts));
            setDrafts(updatedDrafts);
            setDraftId(id);
            setDraftTitle(updatedDrafts[id].postTitle);
            setDraftContent(updatedDrafts[id].postText);
            setHasDrafts(true);
        } else {
            console.warn("Cannot save empty draft");
        }
    
        return id;
    }, [drafts]);

 

    const saveDraftPostTitle = useCallback((id: string, postTitle: string) => {
        const timestamp = Date.now();
        const updatedAt = new Date(timestamp).toLocaleString();
        const updatedDrafts = { ...drafts };
        
        if (id && id in updatedDrafts) {
            console.log("Updating draft title", id);
            updatedDrafts[id].postTitle = postTitle;
            updatedDrafts[id].updatedAt = updatedAt;
        } else {
            // Create new draft if it doesn't exist
            id = id || timestamp.toString();
            updatedDrafts[id] = {
                postTitle,
                postText: '',
                createdAt: updatedAt,
                updatedAt
            };
        }

        // update this to trim at least have 1 white space in the beginning
        
        localStorage.setItem('storyDrafts', JSON.stringify(updatedDrafts));
        setDrafts(updatedDrafts);
        setDraftId(id);
        setDraftTitle(postTitle);
        setHasDrafts(true);

        return id;
    }, [drafts]);

    const saveDraftPostText = useCallback((id: string, postText: string) => {
        const timestamp = Date.now();
        const updatedAt = new Date(timestamp).toLocaleString();
        console.log("current drafts", drafts);
        const updatedDrafts = { ...drafts };



        
        if (id && id in updatedDrafts) {
            console.log("Updating draft text", id);
            updatedDrafts[id] = {
                ...updatedDrafts[id],  // Preserve existing fields
                postText,
                updatedAt
            };
        } else {
            // Create new draft if it doesn't exist
            id = id || timestamp.toString();
            updatedDrafts[id] = {
                postTitle: '',
                postText,
                createdAt: updatedAt,
                updatedAt
            };
        }

        if (postText.trim()) {
            localStorage.setItem('storyDrafts', JSON.stringify(updatedDrafts));
            setDrafts(updatedDrafts);
            setDraftId(id);
            setDraftContent(postText);
            setHasDrafts(true);
        }

        return id;
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
        createNewDraft,
        saveDraftPostText,
        saveDraftPostTitle
    };
};
