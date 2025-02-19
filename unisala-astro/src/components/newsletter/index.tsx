import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell } from 'lucide-react';
import { authenticated } from '@/utils/cache';

interface SubsciptionProps {
  config?: {
    title: string;
    description: string;
    emailPlaceholder: string;
    submitButtonText: string;
    subscribedButtonText: string;
    errorMessage: string;
    successMessage: string;
    registrationEndpoint: string;
    bottomText: string;
  };
  authorName?: string;
}

const Subsciption: React.FC<SubsciptionProps> = ({
  config = {
    title: "Join the Author's Circle",
    description: 'Get more ideas from {authorName} straight to your inbox!',
    emailPlaceholder: 'you@example.com',
    submitButtonText: 'Subscribe',
    subscribedButtonText: "Subscribed",
    errorMessage: 'Oops! Something went wrong. Please try again.',
    successMessage: "You're now part of our exclusive community. Stay tuned for updates!",
    registrationEndpoint: '/api/author/subscribe',
    bottomText: 'Join other engaged readers who value {authorName}'
  },
  authorName = 'the author'
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const interpolatedDescription = config.description.replace('{authorName}', authorName);

  const handleSubscribe = async () => {
    if (!authenticated && !email) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    try {
      // Simulating a successful subscription for both authenticated and non-authenticated users
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
    } catch (error) {
      setError(config.errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center gap-x-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {config.title}
        </h2>
        <Bell className="text-blue-600 dark:text-blue-400" size={24} />
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {isSubscribed ? config.successMessage : interpolatedDescription}
      </p>

      {!isSubscribed && (
        <div className="space-y-4">
          {!authenticated && (
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={config.emailPlaceholder}
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            onClick={handleSubscribe}
          >
            {config.submitButtonText}
          </Button>
        </div>
      )}

      {isSubscribed && (
        <Button
          type="button"
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          disabled
        >
          {config.subscribedButtonText}
        </Button>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        {config.bottomText.replace('{authorName}', authorName)}
      </p>
    </div>
  );
};

export default Subsciption;