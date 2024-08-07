// components/PreviewModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { extractImageFromPostText } from '@/utils/lib/image';
import { stripHtmlTags } from '@/utils/lib/utils';
import AsyncAutoComplete from '../ui/asyncSelect';
import { userServer } from '@/datasource/servers/endpoints';
import type { TopicOptions } from '@/types/post';

interface PreviewModalProps {
  postDraft: {
    title: string;
    postText: string;
  };
  onClose: () => void;
  onPublish: (topics: TopicOptions[], imageUrl: string | null) => void;
  topics: TopicOptions[];
  setTopics: (topics: TopicOptions[]) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ postDraft, onClose, onPublish, topics, setTopics }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
 
  useEffect(() => {
    const extractedImage = extractImageFromPostText({ user: false, postText: postDraft.postText });
    setImageUrl(extractedImage);
  }, [postDraft.postText]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 text-black dark:text-white z-50 overflow-y-auto flex items-center justify-center">
      <div className="container mx-auto p-4 sm:p-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8 pt-4 sm:pt-8">
          <p className="text-xl font-playfair dark:text-gray-200">Story Preview</p>
          <button onClick={onClose} className="text-3xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* Preview Section (Left) */}
          <div className="md:col-span-3">
            <div className="p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Story preview"
                  className="w-full h-48 object-cover mb-4 rounded-lg border border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="mb-4 p-8 bg-gray-100 dark:bg-gray-700 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 h-48 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Include a high-quality image in your story to make it more inviting to readers.</p>
                </div>
              )}

              <div className="prose max-w-none text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <h3 className="text-lg font-semibold mb-2 font-playfair border-b border-gray-300 dark:border-gray-600 pb-2 text-gray-900 dark:text-gray-100">
                  {postDraft.title.substring(0, 200)}
                </h3>
                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <p>{stripHtmlTags(postDraft.postText).substring(0, 200)}...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Topics Section (Right) */}
          <div className="md:col-span-2">
            <p className="p-4 text-sm text-gray-600 dark:text-gray-400 mb-4">Add or change topics (up to 5) so readers know what your story is about</p>
            
            <div className="flex gap-2 mb-6">
              <AsyncAutoComplete
                topics={topics}
                setTopics={setTopics}
                placeholder="Enter a topic"
                apiEndpoint={`${userServer}/tags`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onPublish(topics, imageUrl)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition duration-150 ease-in-out"
              >
                Publish now
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition duration-150 ease-in-out"
              >
                Schedule for later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;