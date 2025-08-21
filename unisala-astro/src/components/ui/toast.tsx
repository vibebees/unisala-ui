import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Toaster position="top-center" reverseOrder={false} />;
};