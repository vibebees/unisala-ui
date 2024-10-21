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
  onPublish: (topics: TopicOptions[], imageUrl: string | null, isPublic: boolean) => void;
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

  useEffect(() => {
    const extractedImage = extractImageFromPostText({ user: false, postText: postDraft.postText });
    setImageUrl(extractedImage);
  }, [postDraft.postText]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 text-black dark:text-white z-50 overflow-y-auto flex items-center justify-center">
      <div className="container mx-auto p-4 sm:p-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl font-semibold">Story Preview</p>
          <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700">&times;</button>
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
              apiEndpoint={`${userServer}/tags`}
            />

            <div className="flex items-center justify-between mt-6 mb-4">
              {/* <span className="text-sm font-medium">Make post public</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label> */}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => onPublish(topics, imageUrl, isPublic)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3"
              >
                Share it
              </Button>
              {/* <Button
                onClick={() => navigator(`/auth?redirect=/new-story/drafts`)}
                variant="outline"
                className="rounded-full px-6 py-3 border-2 border-gray-300 hover:border-gray-400"
              >
                Save on my profile
              </Button> */}
              <SaveNotesButton draftId = {draftId} onClose = {onClose}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;