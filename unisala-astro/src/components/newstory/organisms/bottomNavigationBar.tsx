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
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  activeTab,
  setActiveTab,
  setShowPreview,
  hasDrafts,
  hasPosts,
}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-10">
    <div className="max-w-screen-lg mx-auto px-4 py-2">
      <div className="flex items-center justify-between">
          <TabButton icon={PenTool} label="Editor" isActive={activeTab === 'editor'} onClick={() => setActiveTab('editor')} />
          <TabButton icon={Wand2} label="Visual Aids" isActive={activeTab === 'visual'} onClick={() => setActiveTab('visual')} />
          {/* <TabButton icon="Wand2" label="Visual Aids" isActive={activeTab === 'visual'} onClick={() => setActiveTab('visual')} /> */}
          {hasDrafts && <NavigationLink href="/new-story/drafts" label="View Drafts" />}
          {hasPosts && <NavigationLink href="/published" label="Published" />}
      </div>
      <Button onClick={() => setShowPreview(true)} className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors">
        Preview & Publish
      </Button>
    </div>
  </div>
);

export default BottomNavigationBar;