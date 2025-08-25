import React from 'react';
import { NotePadRefactored } from '@/ui/templates/NotePadRefactored';
import { useAppStore } from '@/app/stores';

/**
 * Editor Feature component that coordinates the entire editor functionality
 * This demonstrates the "feature slicing" pattern where all related 
 * functionality is grouped together
 */
export const EditorFeature: React.FC = () => {
  // App-level state and actions
  const addNotification = useAppStore(state => state.addNotification);
  
  /**
   * Handle successful post publication
   */
  const handlePostPublished = (postId: string) => {
    // Navigate to the published post
    if (typeof window !== 'undefined') {
      window.location.href = `/threads/${postId}`;
    }
    
    // Add success notification
    addNotification({
      type: 'success',
      title: 'Post Published!',
      message: 'Your post has been published successfully and is now live.',
    });
  };

  /**
   * Handle draft saved
   */
  const handleDraftSaved = () => {
    addNotification({
      type: 'info',
      title: 'Draft Saved',
      message: 'Your changes have been saved automatically.',
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Feature-specific header could go here */}
      <div className="flex-1">
        <NotePadRefactored
          onPublished={handlePostPublished}
          onSaved={handleDraftSaved}
        />
      </div>
    </div>
  );
};

export default EditorFeature;