import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { extractImageFromPostText } from '@/utils/lib/image';
import { stripHtmlTags } from '@/utils/lib/utils';
import AsyncAutoComplete from '../ui/asyncSelect';
import { userServer } from '@/datasource/servers/endpoints';
import type { TopicOptions } from '@/types/post';
import { navigator } from '@/utils/lib/URLupdate';
import { SaveNotesButton } from './saveNotes';

interface PreviewModalProps {
  postDraft: {
    title: string;
    postText: string;
  };
  onClose: () => void;
  onPublish: (topics: TopicOptions[], imageUrl: string | null, isPublic: boolean) => Promise<boolean>;
  onSave: (topics: TopicOptions[], imageUrl: string | null) => void;
  topics: TopicOptions[];
  setTopics: (topics: TopicOptions[]) => void;
  draftId: string;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ 
  postDraft, 
  onClose, 
  onPublish, 
  onSave, 
  topics, 
  draftId,
  setTopics 
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const extractedImage = extractImageFromPostText({ user: false, postText: postDraft.postText });
    setImageUrl(extractedImage);
  }, [postDraft.postText]);

  // Clean up function to prevent state updates after unmounting
  useEffect(() => {
    return () => {
      setIsSubmitting(false);
      setIsPublished(false);
    };
  }, []);

  const handlePublish = async () => {
    if (isSubmitting || isPublished) return;
    
    setIsSubmitting(true);
    try {
      const success = await onPublish(topics, imageUrl, isPublic);
      if (success) {
        setIsPublished(true);
      }
    } catch (error) {
      console.error('Publishing failed:', error);
    }
    // Don't reset isSubmitting here to keep button disabled during redirect
  };

  const isButtonDisabled = isSubmitting || isPublished;
  const buttonText = isPublished ? 'Published!' : (isSubmitting ? 'Publishing...' : 'Share it');

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 text-black dark:text-white z-50 overflow-y-auto flex items-center justify-center">
      <div className="container mx-auto p-4 sm:p-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl font-semibold">Story Preview</p>
          <button 
            onClick={onClose} 
            className="text-3xl text-gray-500 hover:text-gray-700"
            disabled={isSubmitting || isPublished}
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preview Section (Left) */}
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Story preview"
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
            ) : (
              <div className="mb-4 p-8 bg-gray-100 text-center rounded-lg border-2 border-dashed border-gray-300 h-48 flex items-center justify-center">
                <p className="text-gray-500 font-medium">Include a high-quality image in your story to make it more inviting to readers.</p>
              </div>
            )}

            <div className="prose max-w-none text-sm leading-relaxed text-gray-700">
              <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-2">
                {postDraft.title}
              </h3>
              <div className="border-l-4 border-gray-300 pl-4">
                <p>{stripHtmlTags(postDraft.postText).substring(0, 200)}...</p>
              </div>
            </div>
          </div>

          {/* Add Topics and Buttons Section (Right) */}
          <div>
            <p className="text-sm text-gray-600 mb-4">Add or change topics (up to 5) so readers know what your story is about</p>
            
            <AsyncAutoComplete
              topics={topics}
              setTopics={setTopics}
              placeholder="Enter a topic"
              disabled={isButtonDisabled}
              apiEndpoint={`${userServer}/tags`}
            />

            <div className="flex flex-col gap-4 mt-6">
              <Button
                onClick={handlePublish}
                disabled={isButtonDisabled}
                className={`bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition-all duration-200 ${
                  isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                } ${isPublished ? 'bg-green-700' : ''}`}
              >
                {buttonText}
              </Button>
              <SaveNotesButton 
                draftId={draftId} 
                onClose={onClose}
                disabled={isButtonDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;