import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  split,
  useMutation,
  useQuery,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { APIClient } from './client';
import { createAPIClient } from './client';
import { getCache } from '@/utils/cache';
import { errorReporter, ErrorSeverity } from '@/infrastructure/error-reporter';
import { createTransportError } from '@/infrastructure/errors';

// Import service configurations
import { getServiceConfig } from '@/datasource/servers';
import {
  MESSAGE_SERVICE_GQL,
  UNIVERSITY_SERVICE_GQL,
  USER_SERVICE_GQL,
} from '@/datasource/servers/types';

/**
 * Authentication link that adds auth headers to requests
 */
const authLink = setContext((operation, { headers = {} }) => {
  const authData = getCache('authData') || { accessToken: null };
  const { accessToken } = authData as { accessToken: string | null };

  return {
    headers: {
      ...headers,
      ...(accessToken && { authorization: `Bearer ${accessToken}` }),
      'Content-Type': 'application/json',
    },
  };
});

/**
 * Error handling link with proper error mapping
 */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      const transportError = createTransportError(
        400,
        error.message,
        error
      );

      // Report GraphQL errors
      errorReporter.batchError(
        transportError,
        ErrorSeverity.MEDIUM,
        {
          additionalData: {
            operation: 'graphql',
            operationName: operation.operationName,
            variables: operation.variables,
          }
        }
      );

      console.error(`GraphQL error: ${error.message}`, error);
    }
  }

  if (networkError) {
    const transportError = createTransportError(
      (networkError as any)?.statusCode || 500,
      networkError.message,
      networkError
    );

    // Report network errors
    errorReporter.batchError(
      transportError,
      ErrorSeverity.HIGH,
      {
        additionalData: {
          operation: 'network',
          operationName: operation.operationName,
          variables: operation.variables,
        }
      }
    );

    console.error('Network error:', networkError);
  }
});

/**
 * Response interceptor link for handling server responses
 */
const responseLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // Handle successful responses
    if (response.data && !response.errors) {
      // Log successful operations in development
      if (process.env['NODE_ENV'] === 'development') {
        console.log(`✓ ${operation.operationName}:`, response.data);
      }
    }

    return response;
  });
});

/**
 * Creates HTTP link for a specific service
 */
function createServiceHttpLink(serviceUrl: string): HttpLink {
  return new HttpLink({
    uri: serviceUrl,
    credentials: 'include',
  });
}

/**
 * Service selector link that routes requests to appropriate services
 */
const serviceConfig = getServiceConfig();

const serviceLink = split(
  operation => operation.getContext()['server'] === USER_SERVICE_GQL,
  createServiceHttpLink(`${serviceConfig.userServiceAddress}/graphql`),
  split(
    operation => operation.getContext()['server'] === UNIVERSITY_SERVICE_GQL,
    createServiceHttpLink(`${serviceConfig.universityServiceAddress}/graphql`),
    split(
      operation => operation.getContext()['server'] === MESSAGE_SERVICE_GQL,
      createServiceHttpLink(`${serviceConfig.messagingServiceAddress}/graphql`),
      createServiceHttpLink(`${serviceConfig.userServiceAddress}/graphql`) // Default fallback
    )
  )
);

/**
 * Apollo Cache configuration with type policies
 */
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Configure cache policies for different query fields
        posts: {
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
        drafts: {
          merge(existing = [], incoming: any[]) {
            return incoming; // Replace existing drafts
          },
        },
      },
    },
    Post: {
      fields: {
        comments: {
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

/**
 * Complete Apollo Client setup with all links
 */
export const apolloClient = new ApolloClient({
  link: from([
    authLink,
    errorLink,
    responseLink,
    serviceLink,
  ]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: process.env['NODE_ENV'] === 'development',
});

/**
 * Unified API client instance
 */
export const apiClient: APIClient = createAPIClient(apolloClient);

/**
 * Legacy compatibility layer - these will be deprecated
 * @deprecated Use service layer (useUserService, usePostService) instead
 */
export const useAstroMutation = (query: any, options: any) => {
  console.warn('useAstroMutation is deprecated. Use service layer (useUserService, usePostService) instead.');
  
  return useMutation(query, {
    ...options,
    client: apolloClient,
  });
};

/**
 * @deprecated Use service layer (useUserService, usePostService) instead
 */
export const useAstroQuery = (query: any, options: any) => {
  console.warn('useAstroQuery is deprecated. Use service layer (useUserService, usePostService) instead.');
  
  return useQuery(query, {
    ...options,
    client: apolloClient,
  });
};

// Export for backward compatibility
export const client = apolloClient;