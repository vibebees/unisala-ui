import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./datasource/servers/endpoints";
import { Provider } from "react-redux";
import { store } from "./datasource/store/store";
client.clearStore();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ApolloProvider>
);
