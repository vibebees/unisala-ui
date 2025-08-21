import React, { useEffect, useState } from 'react';
import { useDraftsStore, useUserStore } from '@/app/stores';
import { usePostService } from '@/infrastructure/api/service-registry';
import { ErrorBoundary } from '@/ui/components/ErrorBoundary';
import { CreatePostData, Tag } from '@/core/domain/post';
import { unwrap } from '@/core/result';
import toast from 'react-hot-toast';

/**
 * Props for the NotePad component - clean and minimal
 */
interface NotePadProps {
  draftId?: string;
  onPublished?: (postId: string) => void;
  onSaved?: () => void;
}

/**
 * Refactored NotePad component following clean architecture principles:
 * - No direct GraphQL imports
 * - Uses Zustand stores for state management
 * - Uses service layer for API calls
 * - Proper error handling with Result types
 * - Clean separation of concerns
 */
export const NotePadRefactored: React.FC<NotePadProps> = ({
  draftId: initialDraftId,
  onPublished,
  onSaved,
}) => {
  // Store subscriptions with precise selectors (no unnecessary re-renders)
  const currentDraftId = useDraftsStore(state => state.currentDraftId);
  const currentDraft = useDraftsStore(state => 
    state.currentDraftId ? state.drafts[state.currentDraftId] : null
  );
  const isDraftSaving = useDraftsStore(state => state.isSaving);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  
  // Store actions (stable references, no re-renders)
  const createDraft = useDraftsStore(state => state.createDraft);
  const saveDraft = useDraftsStore(state => state.saveDraft);
  const loadDraft = useDraftsStore(state => state.loadDraft);
  const updateTitle = useDraftsStore(state => state.updateCurrentDraftTitle);
  const updateContent = useDraftsStore(state => state.updateCurrentDraftContent);
  const updateTags = useDraftsStore(state => state.updateCurrentDraftTags);
  
  // Service layer (clean API abstraction)
  const postService = usePostService();

  // Local UI state (minimal, component-specific only)
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  /**
   * Initialize or load draft on component mount
   */
  useEffect(() => {
    const initializeDraft = async () => {
      if (initialDraftId) {
        const result = await loadDraft(initialDraftId);
        if (!result.success) {
          console.error('Failed to load draft:', result.error.message);
          toast.error('Failed to load draft');
        }
      } else if (!currentDraftId) {
        // Create new draft if none exists
        createDraft('Untitled', '');
      }
    };

    initializeDraft();
  }, [initialDraftId, currentDraftId, loadDraft, createDraft]);

  /**
   * Handle title changes with debounced auto-save
   */
  const handleTitleChange = (newTitle: string) => {
    updateTitle(newTitle);
    // Auto-save is handled by store subscription in stores/index.ts
  };

  /**
   * Handle content changes with debounced auto-save
   */
  const handleContentChange = (newContent: string) => {
    updateContent(newContent);
    // Auto-save is handled by store subscription in stores/index.ts
  };

  /**
   * Handle tag updates
   */
  const handleTagsChange = (newTags: Tag[]) => {
    updateTags(newTags);
  };

  /**
   * Publish the current draft
   */
  const handlePublish = async () => {
    if (!currentDraft || !isAuthenticated) {
      toast.error('Please login to publish');
      return;
    }

    setIsPublishing(true);
    setPublishError(null);

    try {
      // Save current draft first
      if (currentDraftId) {
        const saveResult = await saveDraft(
          currentDraftId, 
          currentDraft.title, 
          currentDraft.content
        );
        
        if (!saveResult.success) {
          throw new Error(saveResult.error.message);
        }
      }

      // Create post data
      const postData: CreatePostData = {
        title: currentDraft.title,
        content: currentDraft.content,
        tags: currentDraft.tags.map(tag => tag.id),
        visibility: 'public', // Could be made configurable
        publishImmediately: true,
      };

      // Publish via service layer
      const publishResult = await postService.createPost(postData);
      
      if (!publishResult.success) {
        throw new Error(publishResult.error.message);
      }

      // Success!
      const newPost = publishResult.data;
      toast.success('Post published successfully!');
      
      // Clean up draft and notify parent
      if (currentDraftId) {
        // In a real implementation, you might want to keep the draft or move it to published state
      }
      
      onPublished?.(newPost.id);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to publish post';
      setPublishError(errorMessage);
      toast.error(errorMessage);
      console.error('Publish error:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  /**
   * Manual save (beyond auto-save)
   */
  const handleManualSave = async () => {
    if (!currentDraft || !currentDraftId) return;

    const result = await saveDraft(currentDraftId, currentDraft.title, currentDraft.content);
    
    if (result.success) {
      toast.success('Draft saved!');
      onSaved?.();
    } else {
      toast.error(`Failed to save: ${result.error.message}`);
    }
  };

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Please login to create posts.</p>
      </div>
    );
  }

  // Don't render if no draft loaded
  if (!currentDraft) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Loading draft...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentDraft.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter title..."
                className="text-xl font-semibold bg-transparent border-none outline-none focus:ring-0 text-foreground placeholder-muted-foreground"
              />
              {isDraftSaving && (
                <span className="text-xs text-muted-foreground">Saving...</span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleManualSave}
                disabled={isDraftSaving}
                className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing || !currentDraft.title.trim() || !currentDraft.content.trim()}
                className="px-4 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
          
          {publishError && (
            <div className="mt-2 text-sm text-destructive">
              {publishError}
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div className="flex-1 p-4">
          <textarea
            value={currentDraft.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing your story..."
            className="w-full h-full resize-none bg-transparent border-none outline-none focus:ring-0 text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Footer with metadata */}
        <div className="flex-shrink-0 border-t border-border p-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>
              Created: {currentDraft.createdAt.toLocaleDateString()}
            </span>
            <span>
              Last updated: {currentDraft.updatedAt.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default NotePadRefactored;