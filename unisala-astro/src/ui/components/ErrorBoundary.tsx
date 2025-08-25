import React, { Component, ReactNode } from 'react';
import type { DomainError } from '@/core/errors';
import type { TransportError } from '@/infrastructure/errors';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Global error boundary component that catches React errors
 * and provides user-friendly fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to external service in production
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      return <DefaultErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error;
  onRetry: () => void;
}

/**
 * Default error fallback UI component
 */
function DefaultErrorFallback({ error, onRetry }: DefaultErrorFallbackProps) {
  const isDomainError = error instanceof DomainError;
  const isTransportError = error instanceof TransportError;

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try again.';
  let canRetry = true;

  if (isDomainError) {
    title = 'Application Error';
    message = error.message;
    canRetry = false; // Domain errors usually need user action, not retry
  } else if (isTransportError) {
    title = 'Connection Error';
    message = 'Unable to connect to the server. Please check your internet connection and try again.';
    canRetry = true;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6 bg-card rounded-lg border border-border shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">{message}</p>
          
          <div className="space-y-3">
            {canRetry && (
              <button
                onClick={onRetry}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            )}
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors"
            >
              Reload Page
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                Debug Info
              </summary>
              <pre className="mt-2 text-xs bg-muted p-3 rounded border overflow-auto max-h-32">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to access error boundary context
 */
export function useErrorHandler() {
  return (error: Error) => {
    // In production, you might want to log to an external service
    console.error('Handled error:', error);
    
    // Re-throw to be caught by error boundary
    throw error;
  };
}