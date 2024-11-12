import React, { useState, useEffect } from 'react';
import { Bell, Check } from "lucide-react";
import toast from 'react-hot-toast';
import { fetchApi } from "@/utils/api.utility";
import { userServiceGql } from "@/datasource/servers";
import { getCache, setCache } from '@/utils/cache';

type ColorScheme = 'blue' | 'red' | 'green';
interface FollowingCache {
  [key: string]: boolean;
}

interface SubscriptionPopupProps {
  courseName?: string;
  spaceId?: string;
  colorScheme?: ColorScheme;
}

const getColorClasses = (color: ColorScheme, isJoined: boolean) => ({
  button: {
    background: isJoined ? `bg-green-700` : `bg-green-400`,
    hover: isJoined ? `hover:bg-green-800` : `hover:bg-green-500`,
    focus: `focus:ring-green-500`,
    glow: isJoined ? `bg-green-600/20` : `bg-green-300/20`,
    hoverGlow: isJoined ? `group-hover:bg-green-600/30` : `group-hover:bg-green-300/30`,
  },
  input: {
    focus: `focus:ring-green-500 focus:border-green-500`,
  },
  submit: {
    background: `bg-green-600`,
    hover: `hover:bg-green-700`,
    focus: `focus:ring-green-500`,
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
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const colors = getColorClasses(colorScheme, isJoined);

  // Check if already following on component mount
  useEffect(() => {
    if (spaceId) {
      const followingCache = getCache('following') as FollowingCache || {};
      setIsJoined(!!followingCache[spaceId]);
    }
  }, [spaceId]);

  const subscribe = async (email: string) => {
    const mutation = `
      mutation subscribe($id: ID!, $type: SubscribeType!, $email: String!) {
        subscribe(id: $id, type: $type, email: $email) {
          status {
            success
            message
          }
        }
      }
    `;

    const response = await fetchApi(userServiceGql, {
      method: 'POST',
      body: JSON.stringify({
        query: mutation,
        variables: {
          id: spaceId,
          type: 'space',
          email: email
        },
      }),
    });

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data.subscribe;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!/^C00\d{6}$/i.test(cNumber)) {
      setMessage('Please enter a valid CLID (e.g., C00577123)');
      setLoading(false);
      return;
    }

    const email = `${cNumber.toLowerCase()}@louisiana.edu`;

    try {
      // Check if already subscribed
      const followingCache = getCache('following') as FollowingCache || {};
      if (followingCache[spaceId]) {
        toast.success('You are already following this space');
        setLoading(false);
        return;
      }

      const result = await subscribe(email);
      
      if (result.status.success) {
        // Update cache
        const updatedCache = { ...followingCache, [spaceId]: true };
        setCache('following', updatedCache);
        setIsJoined(true);
        setMessage('Successfully joined! Check your ULL email.');
        toast.success("You're now subscribed!");
        setIsOpen(false);
      } else {
        throw new Error(result.status.message || 'Subscription failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => !isJoined && setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-2 px-6 py-3 text-sm font-medium text-white ${colors.button.background} backdrop-blur-sm border border-white/20 rounded-xl ${colors.button.hover} focus:outline-none focus:ring-2 ${colors.button.focus} focus:ring-offset-2 shadow-lg transition-all duration-300`}
      >
        <div className={`absolute inset-0 rounded-xl ${colors.button.glow} blur-sm ${colors.button.hoverGlow} transition-all duration-300`} />
        
        <div className="relative flex items-center gap-2">
          {isJoined ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          <span className="font-semibold">{isJoined ? 'Joined' : 'Join study group'}</span>
        </div>
      </button>

      {isOpen && (
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
                disabled={loading}
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