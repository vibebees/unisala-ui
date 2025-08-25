import { DomainError } from './errors';

/**
 * Result type for functional error handling
 * Inspired by Rust's Result<T, E> and other functional languages
 */
export type Result<T, E extends DomainError = DomainError> = 
  | { success: true; data: T; error?: never }
  | { success: false; error: E; data?: never };

/**
 * Success result constructor
 */
export function Ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Error result constructor  
 */
export function Err<E extends DomainError>(error: E): Result<never, E> {
  return { success: false, error };
}

/**
 * Maps a Result<T, E> to Result<U, E> by applying a function to the success value
 */
export function map<T, U, E extends DomainError>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  if (result.success) {
    return Ok(fn(result.data));
  }
  return result;
}

/**
 * Maps a Result<T, E> to Result<T, F> by applying a function to the error value
 */
export function mapError<T, E extends DomainError, F extends DomainError>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  if (!result.success) {
    return Err(fn(result.error));
  }
  return result;
}

/**
 * Chains Result operations (flatMap)
 */
export function chain<T, U, E extends DomainError>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  if (result.success) {
    return fn(result.data);
  }
  return result;
}

/**
 * Matches on Result type for control flow
 */
export function match<T, U, V, E extends DomainError>(
  result: Result<T, E>,
  handlers: {
    ok: (data: T) => U;
    error: (error: E) => V;
  }
): U | V {
  if (result.success) {
    return handlers.ok(result.data);
  }
  return handlers.error(result.error);
}

/**
 * Unwraps Result or throws error
 */
export function unwrap<T, E extends DomainError>(result: Result<T, E>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwraps Result or returns default value
 */
export function unwrapOr<T, E extends DomainError>(
  result: Result<T, E>,
  defaultValue: T
): T {
  if (result.success) {
    return result.data;
  }
  return defaultValue;
}

/**
 * Converts a Promise to a Result
 */
export async function fromPromise<T>(
  promise: Promise<T>
): Promise<Result<T, DomainError>> {
  try {
    const data = await promise;
    return Ok(data);
  } catch (error) {
    if (error instanceof DomainError) {
      return Err(error);
    }
    // Convert unknown errors to generic DomainError
    return Err(new (class extends DomainError {
      readonly code = 'UNKNOWN_ERROR';
      readonly httpStatus = 500;
    })(
      error instanceof Error ? error.message : 'Unknown error occurred',
      error
    ));
  }
}

/**
 * Combines multiple Results into a single Result
 * If all are successful, returns Ok with array of values
 * If any fail, returns the first error
 */
export function combine<T extends readonly Result<any, DomainError>[]>(
  results: T
): Result<
  { [K in keyof T]: T[K] extends Result<infer U, any> ? U : never },
  DomainError
> {
  const values: any[] = [];
  
  for (const result of results) {
    if (!result.success) {
      return result;
    }
    values.push(result.data);
  }
  
  return Ok(values as any);
}

/**
 * Type guard to check if Result is successful
 */
export function isOk<T, E extends DomainError>(
  result: Result<T, E>
): result is { success: true; data: T } {
  return result.success;
}

/**
 * Type guard to check if Result is an error
 */
export function isErr<T, E extends DomainError>(
  result: Result<T, E>
): result is { success: false; error: E } {
  return !result.success;
}