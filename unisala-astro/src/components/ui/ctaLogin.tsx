import { sendGAEvent } from "@/utils/analytics/events";

interface CtaLoginProps {
    message: string;
    color?: string;
  }
export const CtaLogin = ({ message, color = 'indigo' }: CtaLoginProps) => {
    return (
      <button
        onClick={() => {
          sendGAEvent('thread_action', {
            category: 'threads',
            label: 'login_to_view_comments_clicked',
          })
          window.location.href = '/login'
        }}
        className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-blue-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
      >
              
        <span className="mx-1">{message}</span>
      </button>
    );
  };