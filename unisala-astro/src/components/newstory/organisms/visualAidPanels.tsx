import Button from "../atoms/button";
import Icon from "../atoms/icon";
import VisualAid from "../templates/aidPanel";
import { X } from 'lucide-react';

interface VisualAidPanelProps {
    showImagePanel: boolean;
    setShowImagePanel: (show: boolean) => void;
  }

  const VisualAidPanel: React.FC<VisualAidPanelProps> = ({ showImagePanel, setShowImagePanel }) => (
    <div
      className={`fixed right-0 top-0 w-[400px] h-[calc(100vh-64px)] shadow-lg border-l border-gray-200 transform transition-transform duration-300 ${
        showImagePanel ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold">Visual Aids</h3>
          <Button onClick={() => setShowImagePanel(false)} className="p-1 hover:rounded-full">
            <Icon icon={X} className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <VisualAid />
        </div>
      </div>
    </div>
  );


export default VisualAidPanel;