import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { PostDraft, Tag } from '@/core/domain/post';
import type { Result } from '@/core/result';
import { TransportError } from '@/infrastructure/errors';
import { getCache, setCache } from '@/utils/cache';
import { nanoid } from 'nanoid';

/**
 * Draft state interface
 */
export interface DraftState {
  drafts: Record<string, PostDraft>;
  currentDraftId: string | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  lastSavedAt: Record<string, Date>;
}

/**
 * Draft store actions
 */
export interface DraftStoreActions {
  // Draft management
  createDraft: (title?: string, content?: string) => string;
  loadDraft: (draftId: string) => Promise<Result<PostDraft, TransportError>>;
  saveDraft: (draftId: string, title: string, content: string) => Promise<Result<void, TransportError>>;
  deleteDraft: (draftId: string) => void;
  
  // Current draft management
  setCurrentDraft: (draftId: string | null) => void;
  updateCurrentDraftTitle: (title: string) => void;
  updateCurrentDraftContent: (content: string) => void;
  updateCurrentDraftTags: (tags: Tag[]) => void;
  
  // Bulk operations
  getAllDrafts: () => PostDraft[];
  getDraftById: (draftId: string) => PostDraft | null;
  clearAllDrafts: () => void;
  
  // Auto-save
  enableAutoSave: (draftId: string) => void;
  disableAutoSave: (draftId: string) => void;
  
  // State management
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

/**
 * Complete drafts store interface
 */
export interface DraftsStore extends DraftState, DraftStoreActions {}

/**
 * Drafts store implementation
 */
export const useDraftsStore = create<DraftsStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // Initial state
        drafts: {},
        currentDraftId: null,
        isLoading: false,
        isSaving: false,
        error: null,
        lastSavedAt: {},

        // Draft management
        createDraft: (title = '', content = '') => {
          const draftId = nanoid();
          const now = new Date();
          
          const newDraft: PostDraft = {
            id: draftId,
            title,
            content,
            authorId: 'current-user', // This would come from user store
            tags: [],
            createdAt: now,
            updatedAt: now,
            autoSaveEnabled: true,
          };

          set((state) => {
            state.drafts[draftId] = newDraft;
            state.currentDraftId = draftId;
            state.lastSavedAt[draftId] = now;
          });

          // Also save to legacy cache for backward compatibility
          const cachedDrafts = (getCache('drafts') as Record<string, any>) || {};
          cachedDrafts[draftId] = {
            postTitle: title,
            postText: content,
            updatedAt: now.getTime(),
            createdAt: now.getTime(),
          };
          setCache('drafts', cachedDrafts);

          return draftId;
        },

        loadDraft: async (draftId: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            const draft = get().drafts[draftId];
            
            if (!draft) {
              // Try to load from legacy cache
              const cachedDrafts = (getCache('drafts') as Record<string, any>) || {};
              const cachedDraft = cachedDrafts[draftId] as any;
              
              if (cachedDraft) {
                const loadedDraft: PostDraft = {
                  id: draftId,
                  title: cachedDraft.postTitle || '',
                  content: cachedDraft.postText || '',
                  authorId: 'current-user',
                  tags: [],
                  createdAt: new Date(cachedDraft.createdAt || Date.now()),
                  updatedAt: new Date(cachedDraft.updatedAt || Date.now()),
                  autoSaveEnabled: true,
                };

                set((state) => {
                  state.drafts[draftId] = loadedDraft;
                  state.currentDraftId = draftId;
                  state.isLoading = false;
                });

                return { success: true, data: loadedDraft };
              }
              
              set((state) => {
                state.isLoading = false;
                state.error = 'Draft not found';
              });
              
              return {
                success: false,
                error: new TransportError('Draft not found', 404),
              };
            }

            set((state) => {
              state.currentDraftId = draftId;
              state.isLoading = false;
            });

            return { success: true, data: draft };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to load draft';
            
            set((state) => {
              state.isLoading = false;
              state.error = errorMessage;
            });

            return {
              success: false,
              error: new TransportError(errorMessage, 500, error),
            };
          }
        },

        saveDraft: async (draftId: string, title: string, content: string) => {
          set((state) => {
            state.isSaving = true;
            state.error = null;
          });

          try {
            const now = new Date();
            
            set((state) => {
              if (state.drafts[draftId]) {
                state.drafts[draftId].title = title;
                state.drafts[draftId].content = content;
                state.drafts[draftId].updatedAt = now;
                state.lastSavedAt[draftId] = now;
              }
              state.isSaving = false;
            });

            // Update legacy cache
            const cachedDrafts = (getCache('drafts') as Record<string, any>) || {};
            cachedDrafts[draftId] = {
              ...((cachedDrafts as any)[draftId] || {}),
              postTitle: title,
              postText: content,
              updatedAt: now.getTime(),
            };
            setCache('drafts', cachedDrafts);

            return { success: true, data: undefined };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to save draft';
            
            set((state) => {
              state.isSaving = false;
              state.error = errorMessage;
            });

            return {
              success: false,
              error: new TransportError(errorMessage, 500, error),
            };
          }
        },

        deleteDraft: (draftId: string) => {
          set((state) => {
            delete state.drafts[draftId];
            delete state.lastSavedAt[draftId];
            
            if (state.currentDraftId === draftId) {
              state.currentDraftId = null;
            }
          });

          // Remove from legacy cache
          const cachedDrafts = (getCache('drafts') as Record<string, any>) || {};
          delete (cachedDrafts as any)[draftId];
          setCache('drafts', cachedDrafts);
        },

        // Current draft management
        setCurrentDraft: (draftId: string | null) => {
          set((state) => {
            state.currentDraftId = draftId;
          });
        },

        updateCurrentDraftTitle: (title: string) => {
          const { currentDraftId } = get();
          if (!currentDraftId) return;

          set((state) => {
            if (state.drafts[currentDraftId]) {
              state.drafts[currentDraftId].title = title;
              state.drafts[currentDraftId].updatedAt = new Date();
            }
          });
        },

        updateCurrentDraftContent: (content: string) => {
          const { currentDraftId } = get();
          if (!currentDraftId) return;

          set((state) => {
            if (state.drafts[currentDraftId]) {
              state.drafts[currentDraftId].content = content;
              state.drafts[currentDraftId].updatedAt = new Date();
            }
          });
        },

        updateCurrentDraftTags: (tags: Tag[]) => {
          const { currentDraftId } = get();
          if (!currentDraftId) return;

          set((state) => {
            if (state.drafts[currentDraftId]) {
              state.drafts[currentDraftId].tags = tags;
              state.drafts[currentDraftId].updatedAt = new Date();
            }
          });
        },

        // Bulk operations
        getAllDrafts: () => {
          return Object.values(get().drafts).sort(
            (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
          );
        },

        getDraftById: (draftId: string) => {
          return get().drafts[draftId] || null;
        },

        clearAllDrafts: () => {
          set((state) => {
            state.drafts = {};
            state.currentDraftId = null;
            state.lastSavedAt = {};
          });

          // Clear legacy cache
          setCache('drafts', {});
        },

        // Auto-save
        enableAutoSave: (draftId: string) => {
          set((state) => {
            if (state.drafts[draftId]) {
              state.drafts[draftId].autoSaveEnabled = true;
            }
          });
        },

        disableAutoSave: (draftId: string) => {
          set((state) => {
            if (state.drafts[draftId]) {
              state.drafts[draftId].autoSaveEnabled = false;
            }
          });
        },

        // State management
        setLoading: (loading: boolean) => {
          set((state) => {
            state.isLoading = loading;
          });
        },

        setSaving: (saving: boolean) => {
          set((state) => {
            state.isSaving = saving;
          });
        },

        setError: (error: string | null) => {
          set((state) => {
            state.error = error;
          });
        },

        clearError: () => {
          set((state) => {
            state.error = null;
          });
        },
      })),
      {
        name: 'unisala-drafts-store',
        partialize: (state) => ({
          drafts: state.drafts,
          currentDraftId: state.currentDraftId,
          lastSavedAt: state.lastSavedAt,
        }),
      }
    )
  )
);

/**
 * Draft store selectors
 */
export const draftSelectors = {
  currentDraft: (state: DraftsStore) => 
    state.currentDraftId ? state.drafts[state.currentDraftId] : null,
  currentDraftTitle: (state: DraftsStore) => 
    state.currentDraftId ? state.drafts[state.currentDraftId]?.title || '' : '',
  currentDraftContent: (state: DraftsStore) => 
    state.currentDraftId ? state.drafts[state.currentDraftId]?.content || '' : '',
  hasDrafts: (state: DraftsStore) => Object.keys(state.drafts).length > 0,
  draftCount: (state: DraftsStore) => Object.keys(state.drafts).length,
  isLoading: (state: DraftsStore) => state.isLoading,
  isSaving: (state: DraftsStore) => state.isSaving,
  error: (state: DraftsStore) => state.error,
  lastSaved: (state: DraftsStore) => (draftId: string) => state.lastSavedAt[draftId],
};

/**
 * Draft store actions selectors
 */
export const draftActions = {
  createDraft: (state: DraftsStore) => state.createDraft,
  saveDraft: (state: DraftsStore) => state.saveDraft,
  deleteDraft: (state: DraftsStore) => state.deleteDraft,
  loadDraft: (state: DraftsStore) => state.loadDraft,
  updateTitle: (state: DraftsStore) => state.updateCurrentDraftTitle,
  updateContent: (state: DraftsStore) => state.updateCurrentDraftContent,
  updateTags: (state: DraftsStore) => state.updateCurrentDraftTags,
};