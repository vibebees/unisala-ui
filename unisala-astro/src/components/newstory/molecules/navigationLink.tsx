// components/molecules/NavigationLink.tsx
import React from 'react';

interface NavigationLinkProps {
  href: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ href, label }) => (
  <a href={href} className="text-blue-500 dark:text-blue-400 text-sm hover:underline flex items-center">
    {label}
  </a>
);

export default NavigationLink;