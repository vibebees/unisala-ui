import { DomainError } from '@/core/errors';

/**
 * Transport/Infrastructure layer errors
 */
export class TransportError extends DomainError {
  readonly code: string = 'TRANSPORT_ERROR';
  readonly httpStatus: number = 500;

  constructor(
    message: string,
    public readonly originalStatus?: number,
    cause?: unknown,
    metadata?: Record<string, unknown>
  ) {
    super(message, cause, { originalStatus, ...metadata });
  }
}

/**
 * Network connection errors
 */
export class NetworkError extends TransportError {
  override readonly code = 'NETWORK_ERROR' as const;
  override readonly httpStatus = 503 as const;

  constructor(message: string = 'Network connection failed', cause?: unknown) {
    super(message, undefined, cause, { type: 'network' });
  }
}

/**
 * API rate limiting errors
 */
export class RateLimitError extends TransportError {
  override readonly code = 'RATE_LIMIT_ERROR' as const;
  override readonly httpStatus = 429 as const;

  constructor(
    message: string = 'Rate limit exceeded',
    public readonly retryAfter?: number,
    cause?: unknown
  ) {
    super(message, 429, cause, { retryAfter, type: 'rate_limit' });
  }
}

/**
 * Server errors (5xx)
 */
export class ServerError extends TransportError {
  override readonly code = 'SERVER_ERROR' as const;
  override readonly httpStatus = 500 as const;

  constructor(message: string, originalStatus: number = 500, cause?: unknown) {
    super(message, originalStatus, cause, { type: 'server' });
  }
}

/**
 * Result type for handling errors functionally
 */
export type Result<T, E = DomainError> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

/**
 * Helper functions for Result type
 */
export const Ok = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
});

export const Err = <E extends DomainError>(error: E): Result<never, E> => ({
  success: false,
  error,
});

/**
 * Maps HTTP status codes to appropriate error classes
 */
export function createTransportError(
  status: number,
  message: string,
  cause?: unknown
): TransportError {
  switch (true) {
    case status === 429:
      return new RateLimitError(message, undefined, cause) as TransportError;
    case status >= 500:
      return new ServerError(message, status, cause) as TransportError;
    case status >= 400:
      return new TransportError(message, status, cause);
    default:
      return new NetworkError(message, cause) as TransportError;
  }
}

/**
 * Error boundary helpers
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof NetworkError) return true;
  if (error instanceof RateLimitError) return true;
  if (error instanceof ServerError && error.originalStatus && error.originalStatus >= 500) return true;
  return false;
}

export function getRetryDelay(error: unknown, attempt: number): number {
  if (error instanceof RateLimitError && error.retryAfter) {
    return error.retryAfter * 1000; // Convert to ms
  }
  
  // Exponential backoff: 1s, 2s, 4s, 8s, max 30s
  return Math.min(1000 * Math.pow(2, attempt), 30000);
}