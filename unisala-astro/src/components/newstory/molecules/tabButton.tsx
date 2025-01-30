// components/molecules/TabButton.tsx
import React from 'react';
import Button from '../atoms/button';
import Icon from '../atoms/icon';
import type { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
  <Button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    <Icon icon={icon} className="w-4 h-4" />
    {label}
  </Button>
);

export default TabButton;