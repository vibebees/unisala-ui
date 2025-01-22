import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./datasource/servers/endpoints";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { store } from "./datasource/store/store";
import ReactGA from 'react-ga4';
ReactGA.initialize("G-MD5HNN6SQS");

client.clearStore();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </ApolloProvider>
  </AuthProvider>
);
