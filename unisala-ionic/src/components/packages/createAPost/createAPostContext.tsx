import React, { createContext, useContext, useState } from 'react';

// Create a context
const LoadingContext = createContext({});

// Context provider component
export const CreateAPostProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    };
    const stopLoading = () => {
        setIsLoading(false);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook to use the context
export const usePostUploading = () => useContext(LoadingContext);
