import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  fromPromise,
  split,
  Observable
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

const authData: IAuthData | null = getCache("authData");
import config from "./config";

const {
    messagingServiceAddress,
    universityServiceAddress,
    messageSocketAddress,
    userServiceAddress,
    callSocketAddress,
  } = getServiceConfig(),
  responseLink = new ApolloLink((operation, forward) => {
    return new Observable(observer => {
      const processOperation = async () => {
        try {
          const forwardedOperation = await forward(operation);
          const subscription = forwardedOperation.subscribe({
            next: response => {
              const { validToken } = response?.data?.fetchFeedV2 ?? {};
              console.log('Valid token:', validToken)
              if (validToken === false) {
                console.log("Token is invalid or expired, refreshing token...");
                fromPromise(refreshTokenAndRetry(operation))
                  .subscribe({
                  // Ensure responses are forwarded
                  next: observer.next(response),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(response)
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
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message === "You are not logged in. Please login") {
          alert("You are not logged in. Please login");
        }
      });
    }
    try {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          const { message, path } = err || {};
          const { statusCode } = JSON.parse(message) || {};
          switch (statusCode) {
            // case 400:
            case 401:
              return fromPromise(
                getNewToken().catch((error) => {
                  return error; // Consider whether you should be returning 'error' here
                })
              )
                .filter((value) => {
                  return Boolean(value);
                })
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

            default:
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }),
  messageServerGql = new HttpLink({
    uri: messagingServiceAddress + "/graphql",
    server: MESSAGE_SERVICE_GQL,
  }),
  universityServerGql = new HttpLink({
    uri: universityServiceAddress + "/graphql",
    server: UNIVERSITY_SERVICE_GQL,
  }),
  userServerGql = new HttpLink({
    uri: userServiceAddress + "/graphql",
    server: USER_SERVICE_GQL,
  }),
  authLink = setContext((_, { headers }) => {
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

export const client = new ApolloClient({
  link: from([ responseLink, errorLink, authLink, httpLink]),
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
