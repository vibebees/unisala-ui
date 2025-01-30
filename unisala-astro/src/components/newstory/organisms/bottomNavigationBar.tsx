// components/organisms/BottomNavigationBar.tsx
import React from 'react';
import { PenTool, Wand2 } from 'lucide-react';
import TabButton from '../molecules/tabButton';
import NavigationLink from '../molecules/navigationLink';
import Button from '../atoms/button';

interface BottomNavigationBarProps {
  activeTab: 'editor' | 'visual';
  setActiveTab: (tab: 'editor' | 'visual') => void;
  setShowPreview: (show: boolean) => void;
  hasDrafts: boolean;
  hasPosts: boolean;
  setShowImagePanel?: (show: boolean) => void;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  activeTab,
  setActiveTab,
  setShowPreview,
  hasDrafts,
  hasPosts,
  setShowImagePanel,
}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-10">
    <div className="max-w-screen-lg mx-auto px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <TabButton
              icon={PenTool}
              label="Editor"
              isActive={activeTab === 'editor'}
              onClick={() => {
                setActiveTab('editor');
                setShowImagePanel(false);

              }}
            />
            <TabButton
              icon={Wand2}
              label="Visual Aids"
              isActive={activeTab === 'visual'}
              onClick={() => {
                setActiveTab('visual');
                setShowImagePanel(true);

              }}
            />
          </div>

          {hasDrafts && (
            <>
              <div className="mx-4 h-6 border-l border-gray-200 dark:border-gray-700" />
              <NavigationLink href="/new-story/drafts" label="View Drafts" />
            </>
          )}

          {hasPosts && (
            <>
              <div className="mx-4 h-6 border-l border-gray-200 dark:border-gray-700" />
              <NavigationLink href="/published" label="Published" />
            </>
          )}
        </div>

        <Button
          onClick={() => setShowPreview(true)}
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors"
        >
          Preview & Publish
        </Button>
      </div>
    </div>
  </div>
);

export default BottomNavigationBar;