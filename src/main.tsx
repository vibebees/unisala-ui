import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloProvider } from "@apollo/client"
import './tailwind.css'
import "./index.css"

import { client } from "./datasource/servers/endpoints"
client.clearStore()

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </ApolloProvider>
);