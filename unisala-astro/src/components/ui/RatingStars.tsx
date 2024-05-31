import React from 'react';

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={i <= rating ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-yellow-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.222 3.757a1.875 1.875 0 001.77 1.29h3.992c.969 0 1.372 1.24.588 1.81l-3.23 2.345a1.875 1.875 0 00-.684 1.928l1.222 3.757c.3.921-.755 1.688-1.54 1.188l-3.23-2.345a1.875 1.875 0 00-2.212 0l-3.23 2.345c-.784.5-1.84-.267-1.54-1.188l1.222-3.757a1.875 1.875 0 00-.684-1.928l-3.23-2.345c-.784-.57-.38-1.81.588-1.81h3.992a1.875 1.875 0 001.77-1.29l1.222-3.757z"
        />
      </svg>
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
};

export default RatingStars;
