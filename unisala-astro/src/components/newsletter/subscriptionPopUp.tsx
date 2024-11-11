import React, { useState, useEffect } from 'react';
import { Bell, Check } from "lucide-react";
import { useAstroMutation } from '@/datasource/apollo-client';
import { Subscribe } from '@/datasource/graphql/user';
import { getCache, setCache } from '@/utils/cache';
import { navigator } from '@/utils/lib/URLupdate';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import toast from 'react-hot-toast';

type ColorScheme = 'blue' | 'red' | 'green';

interface SubscriptionPopupProps {
  courseName?: string;
  spaceId?: string;
  colorScheme?: ColorScheme;
}

const getColorClasses = (color: ColorScheme, isSubscribed: boolean) => ({
  button: {
    background: isSubscribed ? 'bg-emerald-600' : `bg-emerald-500/90`,
    hover: isSubscribed ? '' : `hover:bg-emerald-600/90`,
    focus: `focus:ring-emerald-500`,
    glow: isSubscribed ? 'bg-emerald-500/30' : `bg-emerald-400/20`,
    hoverGlow: isSubscribed ? '' : `group-hover:bg-emerald-400/30`,
  },
  input: {
    focus: `focus:ring-${color}-500 focus:border-${color}-500`,
  },
  submit: {
    background: `bg-${color}-600`,
    hover: `hover:bg-${color}-700`,
    focus: `focus:ring-${color}-500`,
  }
});

const SubscriptionPopup: React.FC<SubscriptionPopupProps> = ({ 
  courseName = '', 
  spaceId = '', 
  colorScheme = 'green' 
}) => {
  const [cNumber, setCNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check if already following on mount
  useEffect(() => {
    if (spaceId) {
      const followingCache = getCache('following') as { [key: string]: boolean } || {};
      setIsSubscribed(!!followingCache[spaceId]);
    }
  }, [spaceId]);

  const colors = getColorClasses(colorScheme, isSubscribed);

  const [subscribe, { loading }] = useAstroMutation(Subscribe, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      id: spaceId,
      type: 'space'
    },
    onCompleted: (data) => {
      if (data.subscribe.status.success) {
        // Update following cache
        const followingCache = getCache('following') as { [key: string]: boolean } || {};
        followingCache[spaceId as string] = true;
        setCache('following', followingCache);
        
        setIsSubscribed(true);
        setMessage('Successfully joined the network! Check your ULL email.');
        toast.success(data.subscribe.status.message || "You're now subscribed!");
        
        setTimeout(() => {
          setIsOpen(false);
          setCNumber('');
          setMessage('');
        }, 2000);
      }
    },
    onError: (error) => {
      toast.error(error?.message || 'Something went wrong. Please try again.');
      setMessage('Something went wrong. Please try again.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!/^C00\d{6}$/i.test(cNumber)) {
      setMessage('Please enter a valid CLID (e.g., C00577123)');
      return;
    }

    // Check if user is authenticated
   
    subscribe();
  };

  const buttonContent = isSubscribed ? (
    <>
      <Check className="w-4 h-4" />
      <span className="font-semibold">Joined</span>
    </>
  ) : (
    <>
      <Bell className="w-4 h-4" />
      <span className="font-semibold">Join study group</span>
    </>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => !isSubscribed && setIsOpen(!isOpen)}
        disabled={isSubscribed}
        className={`group relative flex items-center gap-2 px-6 py-3 text-sm font-medium text-white ${colors.button.background} backdrop-blur-sm border border-white/20 rounded-xl ${colors.button.hover} focus:outline-none focus:ring-2 ${colors.button.focus} focus:ring-offset-2 shadow-lg transition-all duration-300`}
      >
        <div className={`absolute inset-0 rounded-xl ${colors.button.glow} blur-sm ${colors.button.hoverGlow} transition-all duration-300`} />
        <div className="relative flex items-center gap-2">
          {buttonContent}
        </div>
      </button>

      {isOpen && !isSubscribed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Join Your {courseName} Study Network
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your ULL id
                </label>
                <input
                  type="text"
                  placeholder="C00577XXX"
                  value={cNumber}
                  onChange={(e) => setCNumber(e.target.value.toUpperCase())}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${colors.input.focus}`}
                />
              </div>

              {message && (
                <div className={`text-sm ${message.includes('valid') || message.includes('wrong') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </div>
              )}

              {cNumber && (
                <div className="text-sm text-gray-500">
                  You'll receive notes at: {cNumber.toLowerCase()}@louisiana.edu
                </div>
              )}

              <button
                type="submit"
                className={`w-full px-4 py-3 text-white ${colors.submit.background} rounded-lg ${colors.submit.hover} focus:outline-none focus:ring-2 ${colors.submit.focus} disabled:opacity-50 font-medium transition-colors`}
                disabled={!cNumber || loading}
              >
                {loading ? 'Joining...' : 'Join'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPopup;