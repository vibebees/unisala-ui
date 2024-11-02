import { Button } from '@/components/ui/button';

interface PublishBarProps {
  hasDrafts: boolean;
  onPreview: () => void;
  panelLayout: 'right' | 'split';
  panelWidth: number;
  leftPanelWidth: number;
}

export const PublishBar: React.FC<PublishBarProps> = ({
  hasDrafts,
  onPreview,
  panelLayout,
  panelWidth,
  leftPanelWidth
}) => (
  <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 
    border-t border-gray-200 dark:border-gray-700 py-4 z-20'>
    <div className={`${panelLayout === 'split' ? 
      `w-[calc(100%-${panelWidth + leftPanelWidth}px)]` : 'container max-w-screen-md'} mx-auto`}>
      <div className='flex items-center justify-between px-4'>
        {hasDrafts && (
          <a href="/new-story/drafts" 
            className="text-blue-500 hover:text-blue-600 transition-colors">
            View Drafts
          </a>
        )}
        <Button
          onClick={onPreview}
          className='bg-green-500 hover:bg-green-600 text-white font-bold 
            py-2 px-6 rounded-full shadow-lg transition duration-300 
            ease-in-out transform hover:-translate-y-1 hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-green-500 
            focus:ring-opacity-50'
        >
          Preview & Publish
        </Button>
      </div>
    </div>
  </div>
);
