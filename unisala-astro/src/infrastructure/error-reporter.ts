import { DomainError } from '@/core/errors';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Error context information
 */
export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  timestamp?: Date;
  buildVersion?: string;
  environment?: string;
  additionalData?: Record<string, unknown>;
}

/**
 * Error report structure
 */
export interface ErrorReport {
  error: DomainError;
  severity: ErrorSeverity;
  context: ErrorContext;
  fingerprint: string;
}

/**
 * Interface for error reporting services
 */
export interface ErrorReporter {
  report(report: ErrorReport): Promise<void>;
  reportBatch(reports: ErrorReport[]): Promise<void>;
}

/**
 * Console error reporter for development
 */
export class ConsoleErrorReporter implements ErrorReporter {
  async report(report: ErrorReport): Promise<void> {
    const { error, severity, context } = report;
    
    console.group(`🚨 ${severity.toUpperCase()} ERROR: ${error.code}`);
    console.error('Message:', error.message);
    console.error('Error:', error);
    console.log('Context:', context);
    console.log('Fingerprint:', report.fingerprint);
    console.groupEnd();
  }

  async reportBatch(reports: ErrorReport[]): Promise<void> {
    for (const report of reports) {
      await this.report(report);
    }
  }
}

/**
 * Remote error reporter for production (placeholder)
 */
export class RemoteErrorReporter implements ErrorReporter {
  constructor(
    private readonly endpoint: string,
    private readonly apiKey: string
  ) {}

  async report(report: ErrorReport): Promise<void> {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(report),
      });
    } catch (error) {
      // Fallback to console in case remote reporting fails
      console.error('Failed to report error remotely:', error);
      await new ConsoleErrorReporter().report(report);
    }
  }

  async reportBatch(reports: ErrorReport[]): Promise<void> {
    try {
      await fetch(`${this.endpoint}/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ reports }),
      });
    } catch (error) {
      console.error('Failed to report errors remotely:', error);
      // Fallback to individual reporting
      for (const report of reports) {
        await this.report(report);
      }
    }
  }
}

/**
 * Error reporting service singleton
 */
class ErrorReportingService {
  private reporter: ErrorReporter;
  private batchedReports: ErrorReport[] = [];
  private batchTimeout?: NodeJS.Timeout | undefined;
  private readonly batchSize = 10;
  private readonly batchDelay = 5000; // 5 seconds

  constructor() {
    // Use console reporter in development, remote in production
    const isDev = import.meta.env.MODE === 'development';
    const endpoint = import.meta.env['ERROR_REPORTING_ENDPOINT'];
    const apiKey = import.meta.env['ERROR_REPORTING_API_KEY'];
    
    this.reporter = isDev || !endpoint || !apiKey
      ? new ConsoleErrorReporter()
      : new RemoteErrorReporter(endpoint, apiKey);
  }

  /**
   * Reports an error immediately
   */
  async reportError(
    error: DomainError,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context: Partial<ErrorContext> = {}
  ): Promise<void> {
    const report = this.createErrorReport(error, severity, context);
    await this.reporter.report(report);
  }

  /**
   * Batches error for later reporting (better performance)
   */
  batchError(
    error: DomainError,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context: Partial<ErrorContext> = {}
  ): void {
    const report = this.createErrorReport(error, severity, context);
    this.batchedReports.push(report);

    // Auto-flush batch when it reaches max size
    if (this.batchedReports.length >= this.batchSize) {
      this.flushBatch();
    } else if (!this.batchTimeout) {
      // Set timeout to flush batch after delay
      this.batchTimeout = setTimeout(() => {
        this.flushBatch();
      }, this.batchDelay);
    }
  }

  /**
   * Flushes all batched errors
   */
  private async flushBatch(): Promise<void> {
    if (this.batchedReports.length === 0) return;

    const reports = [...this.batchedReports];
    this.batchedReports = [];
    
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = undefined;
    }

    await this.reporter.reportBatch(reports);
  }

  /**
   * Creates error report with context
   */
  private createErrorReport(
    error: DomainError,
    severity: ErrorSeverity,
    context: Partial<ErrorContext>
  ): ErrorReport {
    const fullContext: ErrorContext = {
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date(),
      environment: import.meta.env.MODE,
      buildVersion: import.meta.env['BUILD_VERSION'],
      ...context,
    };

    const fingerprint = this.generateFingerprint(error);

    return {
      error,
      severity,
      context: fullContext,
      fingerprint,
    };
  }

  /**
   * Generates a unique fingerprint for error grouping
   */
  private generateFingerprint(error: DomainError): string {
    const components = [
      error.code,
      error.name,
      error.message,
      error.stack?.split('\n')[1], // First stack frame
    ].filter(Boolean);

    return btoa(components.join('|')).replace(/[+/=]/g, '');
  }
}

// Export singleton instance
export const errorReporter = new ErrorReportingService();

/**
 * React hook for error reporting
 */
export function useErrorReporter() {
  return {
    reportError: errorReporter.reportError.bind(errorReporter),
    batchError: errorReporter.batchError.bind(errorReporter),
  };
}