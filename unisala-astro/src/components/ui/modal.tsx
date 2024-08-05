// components/PreviewModal.tsx
import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { extractImageFromPostText } from '@/utils/lib/image';
import { stripHtmlTags } from '@/utils/lib/utils';

interface PreviewModalProps {
  postDraft: {
    title: string;
    postText: string;
  };
  onClose: () => void;
  onPublish: (topics: string[], imageUrl: string | null) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ postDraft, onClose, onPublish }) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const extractedImage = extractImageFromPostText({ user: false, postText: postDraft.postText });
    setImageUrl(extractedImage);
  }, [postDraft.postText]);

  const addTopic = () => {
    if (newTopic && topics.length < 5) {
      setTopics([...topics, newTopic]);
      setNewTopic('');
    }
  };

  return (
    <div className="fixed inset-0 bg-white  z-50 overflow-y-auto flex items-center justify-center">
      <div className="container mx-auto p-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8 pt-8">
          <p className="text-xl font-playfair ">Story Preview</p>
          <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Preview Section (Left) */}
          <div className="md:col-span-3">
            <div className=" p-4 rounded-lg shadow-sm">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Story preview"
                  className="w-full h-48 object-cover mb-4 rounded-lg border border-gray-300"
                />
              ) : (
                <div className="mb-4 p-8 bg-gray-100 text-center rounded-lg border-2 border-dashed border-gray-300 h-48 flex items-center justify-center">
                  <p className="text-gray-500 font-medium">Include a high-quality image in your story to make it more inviting to readers.</p>
                </div>
              )}

              <div className="prose max-w-none text-sm leading-relaxed text-gray-700">
                <h3 className="text-lg font-semibold mb-2 font-playfair border-b border-gray-300 pb-2">{postDraft.title}</h3>

                <div className="border-l-4 border-gray-300 pl-4">
                  <p>{stripHtmlTags(postDraft.postText).substring(0, 200)}...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Topics Section (Right) */}
          <div className="md:col-span-2">
            <p className=" p-4 text-sm text-gray-600 mb-4">Add or change topics (up to 5) so readers know what your story is about</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map((topic, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {topic}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="flex-grow border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a topic..."
              />
             
            </div>

            {/* <p className="text-sm text-blue-600 mb-8 hover:underline cursor-pointer">
              Learn more about what happens to your post when you publish.
            </p> */}

            <div className="flex gap-4">
              <Button
                onClick={() => onPublish(topics, imageUrl)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition duration-150 ease-in-out"
              >
                Publish now
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 py-3 border-2 border-gray-300 hover:border-gray-400 transition duration-150 ease-in-out"
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