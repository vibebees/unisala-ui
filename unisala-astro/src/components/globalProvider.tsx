// @/components/globalProvider.tsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/datasource/servers/endpoints';

export const GlobalProvider: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};