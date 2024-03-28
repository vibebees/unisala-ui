import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  fromPromise,
  split
} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"
import {onError} from "@apollo/client/link/error"
import {getNewToken} from "../api/authentication"
import {io} from "socket.io-client"
import {
  MESSAGE_SERVICE_GQL,
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL
} from "./types"

const urls = require("./index"); 

const config = require("./config");

const {
  messagingServiceAddress,
  universityServiceAddress,
  messageSocketAddress,
  userServiceAddress,
  callSocketAddress
} = urls; // Removed parentheses here


  errorLink = onError(({graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({message, locations, path}) => {
        if (message === "You are not logged in. Please login") {
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          window.location.href = "/login"
        }
      }
      )
    }
    try {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          const {message, path} = err || {}
          const {statusCode} = JSON.parse(message) || {}
          switch (statusCode) {
            // case 400:
            case 401:
              return fromPromise(
                getNewToken()
                  .catch((error) => {
                    return error // Consider whether you should be returning 'error' here
                  })
              )
              .filter((value) => {
                return Boolean(value)
              })
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`
                  }
                })
                return forward(operation)
              })

            default:
          }
        }
      }
    } catch (err) {
      console.log(err)
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }),
  messageServerGql = new HttpLink({
    uri: messagingServiceAddress + "/graphql",
    server: MESSAGE_SERVICE_GQL
  }),
  universityServerGql = new HttpLink({
    uri: universityServiceAddress + "/graphql",
    server: UNIVERSITY_SERVICE_GQL
  }),
  userServerGql = new HttpLink({
    uri: userServiceAddress + "/graphql",
    server: USER_SERVICE_GQL
  }),
  authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken")
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : ""
      }
    }
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
  )

export const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    headers: {
      authorization: localStorage?.getItem("accessToken") || ""
    },
    cache: new InMemoryCache()
  }),
  messageSocket = () => io(messageSocketAddress),
  callSocket = () => io(callSocketAddress),
  userServer = userServiceAddress,
  messageServer = messagingServiceAddress,
  universityServer = universityServiceAddress
