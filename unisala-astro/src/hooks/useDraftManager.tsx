import type { DraftMetrics, GlobalMetrics, MetaData } from '@/types/metrics';
import { getCache, setCache } from '@/utils/cache';
import moment from 'moment';
import { useState, useEffect, useCallback } from 'react';

interface Draft {
    postTitle: string;
    postText: string;
    createdAt: number;
    updatedAt: number;
}

interface StoryDrafts {
    [timestamp: string]: Draft;
}


 

type MetaData = {
    drafts: DraftMetrics;
    global: GlobalMetrics;
};


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
                        createdAt: new Date(parseInt(timestamp)).getTime(),
                        updatedAt: new Date(parseInt(timestamp)).getTime()
                    };
                } else {
                    // Merge content if missing
                    migratedDrafts[timestamp].postTitle = migratedDrafts[timestamp].postTitle || localStorage.getItem(`${timestamp}.postTitle`) || '';
                    migratedDrafts[timestamp].postText = migratedDrafts[timestamp].postText || localStorage.getItem(`${timestamp}.postText`) || '';
                    migratedDrafts[timestamp].updatedAt = new Date().getTime();
                }
            }
        });

        return migratedDrafts;
    }, []);
    const getDefaultMetaData = (): MetaData => ({
        drafts: {
            totalWords: 0,
            totalFocusTime: 0,
            totalIdleTime: 0,
            totalSessionTime: 0,
            maxWpmEver: 0,
            lastModified: 0
        }, // Ensure drafts is an empty object
        global: {
            draftsVersion: 0,
            totalWordsWritten: 0,
            totalFocusTime: 0,
            totalIdleTime: 0,
            highestWpmEver: 0,
            firstSessionDate: Date.now(),
            lastSessionDate: Date.now(),
            consecutiveDays: 1,
            longestStreak: 1,
        },
    });
    
    const ensureMetaDataIntegrity = (metaData: MetaData): MetaData => {
        if (!metaData.global) {
            return getDefaultMetaData();
        }
    
        return {
            ...metaData,
            global: {
                draftsVersion: metaData.global.draftsVersion || 0,
                longestStreak: metaData.global.longestStreak || 1,
                totalWordsWritten: metaData.global.totalWordsWritten || 0,
                totalFocusTime: metaData.global.totalFocusTime || 0,
                totalIdleTime: metaData.global.totalIdleTime || 0,
                highestWpmEver: metaData.global.highestWpmEver || 0,
                firstSessionDate: metaData.global.firstSessionDate || Date.now(),
                lastSessionDate: metaData.global.lastSessionDate || Date.now(),
                consecutiveDays: metaData.global.consecutiveDays || 1,
            },
        };
    };

    

    const loadDrafts = useCallback(() => {

        console.log("loading drafts");
        let storedDrafts: StoryDrafts = getCache('storyDrafts') || {};

        let metaData: MetaData = getCache("editorMetrics") || getDefaultMetaData();

        // Ensure metadata structure is correct
        metaData = ensureMetaDataIntegrity(metaData);
    
          
        if (Object.keys(storedDrafts).length === 0) {
            // If no drafts in new format, try to migrate old data
            storedDrafts = migrateOldData();
            if (Object.keys(storedDrafts).length > 0) {
                setCache('storyDrafts', storedDrafts);
                // Clean up old data
                Object.keys(storedDrafts).forEach(timestamp => {
                    localStorage.removeItem(`${timestamp}.postTitle`);
                    localStorage.removeItem(`${timestamp}.postText`);
                });
            }
        }

    
        // if metaData.global.version does not exist, then add version 1

        if(!metaData.global.draftsVersion || metaData.global.draftsVersion < 1){
            // ensure the version is set to 1
            console.log("updating drafts version to 1");
            metaData.global.draftsVersion = 1;
            storedDrafts = ensureUnixTimestamps(storedDrafts);
            setCache("editorMetrics", metaData);
            
        }



        setDrafts(storedDrafts as StoryDrafts);
        setHasDrafts(Object.keys(storedDrafts).length > 0);
    }, [migrateOldData]);

    useEffect(() => {
        loadDrafts();
    }, [loadDrafts]);

    const saveDraft = useCallback((id: string, postTitle?: string, postText?: string, pastDate?: number) => {
        const timestamp = pastDate || Date.now();
        const updatedAt = timestamp
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
        const updatedAt = timestamp
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
        const updatedAt = new Date(timestamp).getTime();
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


    interface StoryDraft {
        postTitle?: string;
        postText?: string;
        createdAt?: number | null;
        updatedAt?: number | null;
    }
    
    interface StoryDrafts {
        [timestamp: string]: StoryDraft;
    }
    
    const ensureUnixTimestamps = (drafts: StoryDrafts): StoryDrafts => {
        const updatedDrafts: StoryDrafts = {};
    
        Object.keys(drafts).forEach(timestamp => {
            const draft = drafts[timestamp];
    
            // Handle null or undefined values safely
            const createdAt = draft.createdAt
            ? moment(draft.createdAt, "DD/MM/YYYY, HH:mm:ss").valueOf()
            : moment().valueOf(); // Default to now if missing
    
        const updatedAt = draft.updatedAt
            ? moment(draft.updatedAt, "DD/MM/YYYY, HH:mm:ss").valueOf()
            : createdAt; // Default to createdAt if missing

            
            updatedDrafts[timestamp] = {
                ...draft,
                createdAt,
                updatedAt,
            };
        });
    
        return updatedDrafts;
    };


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
