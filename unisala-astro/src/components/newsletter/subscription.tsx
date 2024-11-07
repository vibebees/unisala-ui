import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAstroMutation } from '@/datasource/apollo-client';
import { Subscribe } from '@/datasource/graphql/user';
import toast from 'react-hot-toast';
import { getCache, setCache } from '@/utils/cache';
import { navigator } from '@/utils/lib/URLupdate';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { Check } from 'lucide-react';

interface SubscriptionProps {
  spaceId?: string;
  title?: string;
}

interface FollowingCache {
  [key: string]: boolean;
}

const Subscription: React.FC<SubscriptionProps> = ({ spaceId, title }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check if already following on component mount
  useEffect(() => {
    if (spaceId) {
      const followingCache = getCache('following') as FollowingCache || {};
      setIsSubscribed(!!followingCache[spaceId]);
    }
  }, [spaceId]);

  const [subscribe, { loading }] = useAstroMutation(Subscribe, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      id: spaceId,
      type: 'space'
    },
    onCompleted: (data) => {
      if (data.subscribe.status.success) {
        // Update following cache
        const followingCache = getCache('following') as FollowingCache || {};
        followingCache[spaceId as string] = true;
        setCache('following', followingCache);
        
        setIsSubscribed(true);
        toast.success(data.subscribe.status.message || "You're now subscribed!");
      }
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!spaceId) {
      toast.error('Invalid subscription target');
      return;
    }

    // Check if already subscribed
    const followingCache = getCache('following') as FollowingCache || {};
    if (followingCache[spaceId]) {
      toast.info('You are already following this space');
      return;
    }

    // Check if user is authenticated
    const authData = getCache('authData');
    if (!authData?.authenticated) {
      const currentUrl = `${window.location.pathname.trim()}${window.location.search.trim()}`;
      navigator(`/auth?redirect=${encodeURIComponent(currentUrl)}`);
      return;
    }

    subscribe();
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        {!isSubscribed ? (
          <Button
            onClick={handleSubscribe}
            className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Following...' : 'Follow'}
          </Button>
        ) : (
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
            disabled
          >
            <Check className="w-4 h-4" />
            <span>Following </span>
          </Button>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg 
            className="w-4 h-4"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span>Never miss new notes and insights{title ? ` in #${title}` : ''} 📚✨</span>
        </div>
      </div>
    </div>
  );
};

export default Subscription;