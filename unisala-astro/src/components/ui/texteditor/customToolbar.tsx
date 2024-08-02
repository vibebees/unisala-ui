
import React, { type RefObject } from 'react';
import Quill from 'quill';

export const CustomToolbar = ({ quillRef }: { quillRef: RefObject<Quill> }) => {
    const applyFormat = (format: string, value: string | number | boolean | null) => {
      if (quillRef.current) {
        quillRef.current.format(format, value);
      }
    };
  
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2">
        <div className="container max-w-screen-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button onClick={() => applyFormat('bold', true)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                B
              </button>
              <button onClick={() => applyFormat('italic', true)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                <i>I</i>
              </button>
              <button onClick={() => applyFormat('link', prompt('Enter URL'))} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                Link
              </button>
              <button onClick={() => applyFormat('header', 1)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                H1
              </button>
              <button onClick={() => applyFormat('header', 2)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                H2
              </button>
              <button onClick={() => applyFormat('blockquote', true)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                "
              </button>
              <button onClick={() => applyFormat('list', 'bullet')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                List
              </button>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Publish
            </button>
          </div>
        </div>
      </div>
    );
  };