import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  fromPromise,
  split,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getNewToken, refreshTokenAndRetry } from "../api/authentication";
import { io } from "socket.io-client";
import {
  MESSAGE_SERVICE_GQL,
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL,
} from "./types";
import getServiceConfig from "./index";
import { getCache } from "../../utils/cache";

import config from "./config";

const {
    messagingServiceAddress,
    universityServiceAddress,
    messageSocketAddress,
    userServiceAddress,
    callSocketAddress,
  } = getServiceConfig(),
  responseLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      const processOperation = async () => {
        try {
          const forwardedOperation = await forward(operation);
          const subscription = forwardedOperation.subscribe({
            next: (response) => {
              const { validToken } = response?.data?.fetchFeedV2 ?? {};
              if (validToken === false) {
                console.log("Token is invalid or expired, refreshing token...");
                fromPromise(refreshTokenAndRetry(operation)).subscribe({
                  // Ensure responses are forwarded
                  next: observer.next(response) as any,
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(response),
                });
              } else {
                observer.next(response);
              }
            },
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });

          return () => subscription.unsubscribe();
        } catch (error) {
          observer.error(error);
        }
      };

      processOperation();

      return () => {}; // Cleanup function if necessary
    });
  }),
  errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(`[GraphQL error]: Message: ${err.message}`);

        // If you have specific error codes you want to handle, you can still do so
        // but don't try to parse the message as JSON
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
          return fromPromise(
            getNewToken().catch((error) => {
              console.error('Failed to get new token:', error);
              return null;
            })
          )
            .filter(Boolean)
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });
              return forward(operation);
            });
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
  } as any),
  authLink = setContext((_, { headers }) => {
    const authData: IAuthData | null = getCache("authData");
    return {
      headers: {
        ...headers,
        authorization: authData?.accessToken || "",
      },
    };
  }),
  httpLink = split(
    (operation) => operation.getContext().server === UNIVERSITY_SERVICE_GQL,
    universityServerGql,
    split(
      (operation) => operation.getContext().server === MESSAGE_SERVICE_GQL,
      messageServerGql,
      split(
        (operation) => operation.getContext().server === USER_SERVICE_GQL,
        userServerGql
      )
    )
  );
const authData: IAuthData | null = getCache("authData");
export const client = new ApolloClient({
    link: from([responseLink, errorLink, authLink, httpLink]),
    headers: {
      authorization: authData?.accessToken || "",
    },
    cache: new InMemoryCache(),
  }),
  messageSocket = () => {
    const socketOptions = {
      path: "",
    };

    if (config.NODE_ENV !== "DEVELOPMENT") {
      socketOptions["path"] = "/msg/socket/socket.io";
    }

    return io(messageSocketAddress, socketOptions);
  },
  callSocket = () => io(callSocketAddress),
  userServer = userServiceAddress,
  messageServer = messagingServiceAddress,
  universityServer = universityServiceAddress;
