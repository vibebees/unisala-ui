/**
 * Base domain error class for all business logic errors
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly httpStatus: number;
  
  constructor(
    message: string,
    public readonly cause?: unknown,
    public readonly metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    
    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      httpStatus: this.httpStatus,
      metadata: this.metadata,
      stack: this.stack,
    };
  }
}

/**
 * Domain validation errors
 */
export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';
  readonly httpStatus = 400;
  
  constructor(message: string, public readonly field?: string, metadata?: Record<string, unknown>) {
    super(message, undefined, { field, ...metadata });
  }
}

/**
 * Domain business rule violations
 */
export class BusinessRuleError extends DomainError {
  readonly code = 'BUSINESS_RULE_ERROR';
  readonly httpStatus = 422;
}

/**
 * Domain authorization errors
 */
export class AuthorizationError extends DomainError {
  readonly code = 'AUTHORIZATION_ERROR';
  readonly httpStatus = 403;
}

/**
 * Domain resource not found errors
 */
export class NotFoundError extends DomainError {
  readonly code = 'NOT_FOUND_ERROR';
  readonly httpStatus = 404;
  
  constructor(resource: string, identifier?: string) {
    super(
      identifier 
        ? `${resource} with id "${identifier}" not found`
        : `${resource} not found`,
      undefined,
      { resource, identifier }
    );
  }
}