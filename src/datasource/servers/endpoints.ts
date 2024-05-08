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
import { getNewToken } from "../api/authentication";
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
      let handle;
      Promise.resolve(operation)
        .then(oper => forward(oper))
        .then(observable => {
          handle = observable.subscribe({
            next: response => {
              console.log("Response received:", response)
              const {validToken }= response?.data?.fetchFeedV2 ?? {};
              // Check for the validToken flag in the response
              if (validToken === false) {
                console.log("Token is invalid or expired, refreshing token...");

                // Suspend the current response and attempt to refresh the token
                fromPromise(
                  getNewToken()
                    .then(newToken => {
                      localStorage.setItem('accessToken', newToken); // Save the new token
                      operation.setContext(({ headers = {} }) => ({
                        headers: {
                          ...headers,
                          authorization: `Bearer ${newToken}`
                        }
                      }));

                      // Retry the original request with the new token
                      return forward(operation);
                    })
                    .catch(error => {
                      // Handle errors, like refreshing token failure
                      console.error('Error refreshing token:', error);
                      observer.error(error); // Pass the error on
                      return Observable.throw(error);
                    })
                ).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              } else {
                // If the token is valid, pass the response as is
                observer.next(response);
              }
            },
            error: err => observer.error(err),
            complete: () => observer.complete(),
          });
        })
        .catch(observer.error.bind(observer));

      // Cleanup function
      return () => {
        if (handle) handle.unsubscribe();
      };
    });
  }),
  errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log('----------->')
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
