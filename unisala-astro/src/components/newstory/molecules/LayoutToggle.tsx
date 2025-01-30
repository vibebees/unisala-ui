import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

interface LayoutToggleProps {
  layout: 'right' | 'split';
  onToggle: () => void;
}

export const LayoutToggle: React.FC<LayoutToggleProps> = ({ layout, onToggle }) => (
  <button
    onClick={onToggle}
    className="absolute left-6 top-4 p-2 rounded-full hover:bg-gray-100 
      dark:hover:bg-gray-700 transition-colors duration-200"
  >
    {layout === 'right' ? 
      <ArrowLeftCircle className="h-6 w-6" /> : 
      <ArrowRightCircle className="h-6 w-6" />
    }
  </button>
);
