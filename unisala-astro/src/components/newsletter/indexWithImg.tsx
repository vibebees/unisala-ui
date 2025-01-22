import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Sparkles } from 'lucide-react';
import { authenticated } from '@/utils/cache';

interface SubscriptionProps {
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
    imageSrc?: string;
    imageAlt?: string;
  };
  authorName?: string;
}

const Subscription: React.FC<SubscriptionProps> = ({
  config = {
    title: "Join Unisala's Learning Community",
    description: "Transform your education journey with personalized insights and 'Aha!' moments",
    emailPlaceholder: 'university.email@edu',
    submitButtonText: 'Get Early Access',
    subscribedButtonText: "You're In! 🎉",
    errorMessage: 'Oops! Something went wrong. Please try again.',
    successMessage: "Welcome to Unisala! Get ready for an amazing learning journey.",
    registrationEndpoint: '/api/subscribe',
    bottomText: 'Join thousands of students transforming their education experience',
    imageSrc: '/api/placeholder/600/300',
    imageAlt: 'Unisala Learning Platform Preview'
  },
  authorName = 'Unisala'
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!authenticated && !email) {
      setError('Please enter your university email address.');
      return;
    }

    if (!authenticated && !email.endsWith('.edu')) {
      setError('Please use your university email address.');
      return;
    }

    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      console.log("Subscription successful, isSubscribed:", true);
    } catch (error) {
      console.error('Error:', error);
      setError(config.errorMessage);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-x-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {config.title}
          </h2>
          <Sparkles className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
      
        <div className="space-y-6">
          {config.imageSrc && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={config.imageSrc}
                alt={config.imageAlt}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          <p className="text-gray-700 dark:text-gray-300">
            {isSubscribed ? config.successMessage : config.description}
          </p>

          {!isSubscribed && (
            <div className="space-y-4">
              {!authenticated && (
                <div className="space-y-2">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    *Please use your university email address
                  </p>
                </div>
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

          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {config.bottomText}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Bell size={14} />
              <span>Get notified about new features, study resources, and learning tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;