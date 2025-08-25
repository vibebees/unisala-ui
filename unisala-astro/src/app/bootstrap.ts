import { apolloClient, apiClient } from '@/infrastructure/api/apollo-setup';
import { initializeServiceRegistry } from '@/infrastructure/api/service-registry';

/**
 * Application bootstrap function
 * Initializes all core services and dependencies
 */
export function bootstrapApp() {
  // Initialize service registry with API client
  const serviceRegistry = initializeServiceRegistry(apiClient);
  
  // Initialize error reporting for production
  if (process.env['NODE_ENV'] === 'production') {
    // Set up global error handlers
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // Additional error reporting logic can go here
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Additional error reporting logic can go here
    });
  }

  return {
    apolloClient,
    apiClient,
    serviceRegistry,
  };
}

/**
 * Application teardown function
 * Cleans up resources when app shuts down
 */
export function teardownApp() {
  // Clear Apollo cache
  apolloClient.clearStore();
  
  // Remove global error handlers
  if (process.env['NODE_ENV'] === 'production') {
    window.removeEventListener('error', () => {});
    window.removeEventListener('unhandledrejection', () => {});
  }
}