import { ApolloClient } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import type { Result } from '@/core/result';
import { Ok, Err } from '@/core/result';
import { TransportError, createTransportError, isRetryableError, getRetryDelay } from '@/infrastructure/errors';
import { errorReporter, ErrorSeverity } from '@/infrastructure/error-reporter';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';

// Define OperationVariables type locally since it's not exporting properly
export type OperationVariables = Record<string, any>;

/**
 * API operation configuration
 */
export interface ApiOperationConfig {
  retries?: number;
  timeout?: number;
  skipErrorReporting?: boolean;
  errorReportingSeverity?: ErrorSeverity;
}

/**
 * GraphQL query result type
 */
export interface QueryResult<TData> {
  data: TData;
  loading: boolean;
  error?: TransportError;
}

/**
 * GraphQL mutation result type
 */
export interface MutationResult<TData> {
  data?: TData;
  loading: boolean;
  error?: TransportError;
}

/**
 * Unified API client interface
 */
export interface APIClient {
  /**
   * Execute GraphQL query
   */
  query<TData = any, TVars extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>>;

  /**
   * Execute GraphQL mutation
   */
  mutate<TData = any, TVars extends OperationVariables = OperationVariables>(
    mutation: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>>;

  /**
   * Execute query with React hooks integration
   */
  useQuery<TData = any, TVars extends OperationVariables = OperationVariables>(
    query: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): QueryResult<TData>;

  /**
   * Execute mutation with React hooks integration
   */
  useMutation<TData = any, TVars extends OperationVariables = OperationVariables>(
    mutation: DocumentNode,
    config?: ApiOperationConfig
  ): [
    (variables?: TVars) => Promise<Result<TData, TransportError>>,
    MutationResult<TData>
  ];
}

/**
 * Default operation configuration
 */
const DEFAULT_CONFIG: Required<ApiOperationConfig> = {
  retries: 3,
  timeout: 10000, // 10 seconds
  skipErrorReporting: false,
  errorReportingSeverity: ErrorSeverity.MEDIUM,
};

/**
 * Apollo Client implementation of APIClient
 */
export class ApolloAPIClient implements APIClient {
  constructor(private readonly apolloClient: ApolloClient<any>) {}

  async query<TData, TVars extends OperationVariables>(
    query: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    return this.executeWithRetry(async () => {
      try {
        const result = await this.apolloClient.query<TData, TVars>({
          query,
          variables,
          fetchPolicy: 'cache-first',
          errorPolicy: 'all',
          context: { server: USER_SERVICE_GQL }, // Default to user service for queries
        });

        if (result.error) {
          const transportError = this.mapApolloErrorToTransportError(result.error);
          if (!finalConfig.skipErrorReporting) {
            await errorReporter.reportError(
              transportError,
              finalConfig.errorReportingSeverity,
              {
                operation: 'query',
                operationName: this.getOperationName(query),
                variables: variables as Record<string, unknown>,
              }
            );
          }
          return Err(transportError);
        }

        return Ok(result.data);
      } catch (error) {
        const transportError = this.mapApolloErrorToTransportError(error);
        if (!finalConfig.skipErrorReporting) {
          await errorReporter.reportError(
            transportError,
            finalConfig.errorReportingSeverity,
            {
              operation: 'query',
              operationName: this.getOperationName(query),
              variables: variables as Record<string, unknown>,
            }
          );
        }
        return Err(transportError);
      }
    }, finalConfig);
  }

  async mutate<TData, TVars extends OperationVariables>(
    mutation: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): Promise<Result<TData, TransportError>> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    return this.executeWithRetry(async () => {
      try {
        const result = await this.apolloClient.mutate<TData, TVars>({
          mutation,
          variables,
          errorPolicy: 'all',
          context: { server: USER_SERVICE_GQL }, // Default to user service for mutations
        });

        if (result.errors && result.errors.length > 0) {
          const transportError = this.mapApolloErrorToTransportError(result.errors[0]);
          if (!finalConfig.skipErrorReporting) {
            await errorReporter.reportError(
              transportError,
              finalConfig.errorReportingSeverity,
              {
                operation: 'mutation',
                operationName: this.getOperationName(mutation),
                variables: variables as Record<string, unknown>,
              }
            );
          }
          return Err(transportError);
        }

        return Ok(result.data!);
      } catch (error) {
        const transportError = this.mapApolloErrorToTransportError(error);
        if (!finalConfig.skipErrorReporting) {
          await errorReporter.reportError(
            transportError,
            finalConfig.errorReportingSeverity,
            {
              operation: 'mutation',
              operationName: this.getOperationName(mutation),
              variables: variables as Record<string, unknown>,
            }
          );
        }
        return Err(transportError);
      }
    }, finalConfig);
  }

  useQuery<TData, TVars extends OperationVariables>(
    query: DocumentNode,
    variables?: TVars,
    config?: ApiOperationConfig
  ): QueryResult<TData> {
    // This method should not be called directly on the client instance
    // React hooks should be used through service facades
    throw new Error(
      'useQuery should not be called directly on APIClient. Use service facades instead.'
    );
  }

  useMutation<TData, TVars extends OperationVariables>(
    mutation: DocumentNode,
    config?: ApiOperationConfig
  ): [
    (variables?: TVars) => Promise<Result<TData, TransportError>>,
    MutationResult<TData>
  ] {
    // This method should not be called directly on the client instance
    // React hooks should be used through service facades
    throw new Error(
      'useMutation should not be called directly on APIClient. Use service facades instead.'
    );
  }

  /**
   * Execute operation with retry logic
   */
  private async executeWithRetry<T>(
    operation: () => Promise<Result<T, TransportError>>,
    config: Required<ApiOperationConfig>
  ): Promise<Result<T, TransportError>> {
    let lastError: TransportError;
    
    for (let attempt = 0; attempt <= config.retries; attempt++) {
      const result = await operation();
      
      if (result.success) {
        return result;
      }

      lastError = result.error;

      // Don't retry if error is not retryable or we've exhausted attempts
      if (!isRetryableError(lastError) || attempt === config.retries) {
        break;
      }

      // Wait before retrying
      const delay = getRetryDelay(lastError, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return Err(lastError!);
  }

  /**
   * Maps Apollo errors to our TransportError type
   */
  private mapApolloErrorToTransportError(error: any): TransportError {
    if (error?.networkError) {
      const networkError = error.networkError;
      if (networkError.statusCode) {
        return createTransportError(
          networkError.statusCode,
          networkError.message || 'Network error occurred',
          error
        );
      }
      return createTransportError(0, 'Network connection failed', error);
    }

    if (error?.graphQLErrors?.length > 0) {
      const gqlError = error.graphQLErrors[0];
      return createTransportError(
        400,
        gqlError.message || 'GraphQL error occurred',
        error
      );
    }

    return createTransportError(
      500,
      error?.message || 'Unknown API error occurred',
      error
    );
  }

  /**
   * Extracts operation name from DocumentNode
   */
  private getOperationName(query: DocumentNode): string {
    const operationDef = query.definitions.find(
      def => def.kind === 'OperationDefinition'
    ) as any;
    
    return operationDef?.name?.value || 'Unknown';
  }
}

/**
 * Factory function to create API client instance
 */
export function createAPIClient(apolloClient: ApolloClient<any>): APIClient {
  return new ApolloAPIClient(apolloClient);
}

// Re-exports removed to avoid circular dependencies