import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export const FollowButton = ({ spaceName }: { spaceName: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showBell, setShowBell] = useState(false);

  useEffect(() => {
    setMounted(true);
    // You could also check localStorage here for persistent state
    const savedState = localStorage.getItem(`follow-${spaceName}`);
    if (savedState) {
      setIsFollowing(JSON.parse(savedState));
    }
  }, [spaceName]);

  const handleFollow = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    localStorage.setItem(`follow-${spaceName}`, JSON.stringify(newState));
    
    if (!newState) {
      setShowBell(false);
    }
    
    // Log for debugging
    console.log(`Follow state changed for ${spaceName}:`, newState);
  };

  const handleNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBellState = !showBell;
    setShowBell(newBellState);
    localStorage.setItem(`bell-${spaceName}`, JSON.stringify(newBellState));
  };

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return (
      <button 
        className="px-4 py-2 rounded-full transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Follow
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <button
        onClick={handleFollow}
        className={`px-4 py-2 rounded-full transition-all duration-200 ${
          isFollowing 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-medium`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
      
      {isFollowing && (
        <button
          onClick={handleNotification}
          className={`p-2 rounded-full border transition-all duration-200 ${
            showBell 
              ? 'text-blue-600 border-blue-600 bg-blue-50' 
              : 'text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Bell className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default FollowButton;