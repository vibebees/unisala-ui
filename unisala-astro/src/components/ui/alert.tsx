import React from 'react';

export const Alert = ({ 
  color = "blue", 
  message = "Alert message", 
  link = '',
  linkText = "example link",
  onDismiss = function() {},
  id = "alert-1"
}) => {
  const colorClasses: { [key: string]: string } = {
    blue: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
    red: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
    green: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    yellow: "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    gray: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
  };

  const buttonColorClasses: { [key: string]: string } = {
    blue: "bg-blue-50 text-blue-500 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700",
    red: "bg-red-50 text-red-500 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700",
    green: "bg-green-50 text-green-500 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700",
    yellow: "bg-yellow-50 text-yellow-500 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700",
    gray: "bg-gray-50 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
  };

  return (
    <div id={id} className={`flex items-center p-4 mb-4 rounded-lg ${colorClasses[color]}`} role="alert">
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">
        {message}
        {link && (
          <> A simple info alert with an <a href={link} className="font-semibold underline hover:no-underline">{linkText}</a>. Give it a click if you like.</>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 inline-flex items-center justify-center h-8 w-8 ${buttonColorClasses[color]}`}
          data-dismiss-target={`#${id}`}
          aria-label="Close"
          onClick={onDismiss}
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
};