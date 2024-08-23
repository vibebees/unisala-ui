import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from 'lucide-react';
import { z } from 'zod';
import toast from "react-hot-toast";

const formSchema = z.object({ email: z.string().email() });

const defaultConfig = {
  title: "Join the Author's Circle",
  iconName: 'Bell',
  iconSize: 24,
  description: 'Get fresh ideas from {authorName} straight to your inbox!',
  emailLabel: 'Your Email',
  emailPlaceholder: 'you@example.com',
  submitButtonText: 'Get Exclusive Updates',
  errorMessage: 'Oops! Something went wrong. Please try again.',
  successMessage: "Welcome aboard! You're now part of an exclusive community.",
  cookieName: 'author-subscribed',
  registrationEndpoint: '/api/author/subscribe'
};

const AuthorSubscription = ({ config = defaultConfig, subscriberCount, authorName }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    try {
      formSchema.parse({ email });
      toast.success("Email address is available. Please enter your name.");
      // Uncomment the following lines when you're ready to implement the actual API call
      // const response = await fetch(config.registrationEndpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // const data = await response.json();
      // if (data.message === 'success') {
      //   // Handle success (e.g., show success message, clear form)
      // } else {
      //   throw new Error('Subscription failed');
      // }
    } catch (err) {
      setError(true);
      console.error(err);
      toast.error(config.errorMessage);
    }
  };

  return (
    <div className='container flex justify-center items-center'>
      <div className='flex flex-col gap-y-5 w-full max-w-lg mx-auto px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-md'>
        <div className='flex items-center gap-x-2'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            {config.title}
          </h1>
          <Icon
            name={config.iconName}
            size={config.iconSize}
            className='text-blue-600 dark:text-blue-400'
          />
        </div>

        <p className='text-gray-700 dark:text-gray-300'>
          {config.description.replace('{authorName}', authorName)}
        </p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder={config.emailPlaceholder}
            className='bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className='text-red-500 dark:text-red-400'>{config.errorMessage}</p>}
          <Button
            type='submit'
            className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600'
          >
            {config.submitButtonText}
          </Button>
        </form>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Join {subscriberCount || 'thousands of'} engaged readers who value {authorName}'s unique perspective.
        </p>
      </div>
    </div>
  );
};

export default AuthorSubscription;