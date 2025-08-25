import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  split,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  MESSAGE_SERVICE_GQL,
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL,
} from "./types";
import {getServiceConfig} from "./index";

import config from "./config";
import { getCache } from "@/utils/cache";
import { setContext } from '@apollo/client/link/context';
import toast from "react-hot-toast";

const {
  messagingServiceAddress,
  universityServiceAddress,
  messageSocketAddress,
  userServiceAddress,
  callSocketAddress,
} = getServiceConfig(),
  responseLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      const processOperation = async (): Promise<void> => {
        try {
          const forwardedOperation = await forward(operation);
          const subscription = forwardedOperation.subscribe({
            next: (response) => {
              const { validToken } = response?.data?.['fetchFeedV2'] ?? {};
              if (validToken === false) {
                console.log("Token is invalid or expired, refreshing token...");
              } else {
                observer.next(response);
              }
            },
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });

          // Store cleanup function for later use if needed
          // return () => subscription.unsubscribe();
        } catch (error) {
          observer.error(error);
        }
        return Promise.resolve();
      };

      processOperation();

      return () => { }; // Cleanup function if necessary
    });
  }),
  errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // Try to parse the error message
        try {
          const parsedError = JSON.parse(err.message);
          if (parsedError.statusCode === 401 && parsedError.message.includes("You are not logged in")) {
            toast.error("You are not logged in. Please login to continue.");
            // Here you can add logic to redirect to login page or refresh token
            // For example:
            // window.location.href = '/login';
            // or dispatch an action to your state management system:
            // store.dispatch(logoutUser());
          }
        } catch (e) {
          // If parsing fails, it's not the error format we're looking for
          console.log(`[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`);
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }),
  messageServerGql = new HttpLink({
    uri: messagingServiceAddress + "/graphql",
    server: MESSAGE_SERVICE_GQL,
  } as any),
  universityServerGql = new HttpLink({
    uri: universityServiceAddress + "/graphql",
    server: UNIVERSITY_SERVICE_GQL,
  } as any),
  userServerGql = new HttpLink({
    uri: userServiceAddress + "/graphql",
    server: USER_SERVICE_GQL,
  } as any)

const authData: { accessToken?: string } | null = getCache('authData') || {} as { accessToken?: string };
const accessToken = authData?.accessToken;

const httpLink = split(
  (operation) => operation.getContext()['server'] === UNIVERSITY_SERVICE_GQL,
  universityServerGql,
  split(
    (operation) => operation.getContext()['server'] === MESSAGE_SERVICE_GQL,
    messageServerGql,
    split(
      (operation) => operation.getContext()['server'] === USER_SERVICE_GQL,
      userServerGql
    )
  )
);

// Add this new authLink
const authLink = setContext((_, { headers }) => {
  const authData: { accessToken?: string } | null = getCache('authData') || {} as { accessToken?: string };
  const {accessToken} = authData
  
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    }
  };
});

export const client = new ApolloClient({
  link: from([authLink, responseLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
}),
  messageSocket = () => {
    const socketOptions = {
      path: "",
    };

    if (config.NODE_ENV !== "DEVELOPMENT") {
      socketOptions["path"] = "/msg/socket/socket.io";
    }

    // return io(messageSocketAddress, socketOptions);
  },
  // callSocket = () => io(callSocketAddress),
  userServer = userServiceAddress,
  messageServer = messagingServiceAddress,
  universityServer = universityServiceAddress;



  