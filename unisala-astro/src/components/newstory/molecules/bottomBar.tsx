// BottomBar.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import type { BottomBarProps } from './types';

export const BottomBar: React.FC<BottomBarProps> = ({ 
    hasDrafts, 
    showPreview, 
    setShowPreview, 
    panelLayout, 
    panelWidth,
    activePanel 
}) => {
    if (activePanel !== 'editor') return null;

    return (
        <div className={`fixed bottom-0 left-0 transition-all duration-200 ease-in-out ${
            panelLayout === 'split' ? `w-[calc(100%-${panelWidth}px)]` : 'w-full'
        } bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 z-20`}>
            <div className={`${panelLayout === 'split' ? 'px-4' : 'container max-w-screen-md'} mx-auto`}>
                <div className='flex items-center justify-between'>
                    {hasDrafts && (
                        <a href="/new-story/drafts" className="text-blue-500 hover:text-blue-600">
                            View Drafts
                        </a>
                    )}
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPreview(true);
                        }}
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 
                                  rounded-full shadow-lg transition duration-200 ease-in-out transform 
                                  hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 
                                  focus:ring-green-500 focus:ring-opacity-50'
                    >
                        Preview & Publish
                    </Button>
                </div>
            </div>
        </div>
    );
};
