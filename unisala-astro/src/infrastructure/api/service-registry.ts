import type { APIClient } from './client';
import type { UserService } from './services/user.service';
import { createUserService } from './services/user.service';
import type { PostService } from './services/post.service';
import { createPostService } from './services/post.service';

/**
 * Service registry that provides access to all API services
 * Follows the Service Locator pattern with dependency injection
 */
export class ServiceRegistry {
  private readonly _userService: UserService;
  private readonly _postService: PostService;

  constructor(private readonly apiClient: APIClient) {
    this._userService = createUserService(apiClient);
    this._postService = createPostService(apiClient);
  }

  get userService(): UserService {
    return this._userService;
  }

  get postService(): PostService {
    return this._postService;
  }
}

/**
 * Global service registry instance
 * This will be initialized in the app setup
 */
let serviceRegistryInstance: ServiceRegistry | null = null;

/**
 * Initialize the service registry with an API client
 */
export function initializeServiceRegistry(apiClient: APIClient): ServiceRegistry {
  if (serviceRegistryInstance) {
    console.warn('Service registry already initialized. Using existing instance.');
    return serviceRegistryInstance;
  }
  
  serviceRegistryInstance = new ServiceRegistry(apiClient);
  return serviceRegistryInstance;
}

/**
 * Get the global service registry instance
 * @throws Error if not initialized
 */
export function getServiceRegistry(): ServiceRegistry {
  if (!serviceRegistryInstance) {
    throw new Error(
      'Service registry not initialized. Call initializeServiceRegistry() first.'
    );
  }
  
  return serviceRegistryInstance;
}

/**
 * React hook to access services
 */
export function useServices() {
  return getServiceRegistry();
}

/**
 * Individual service hooks for convenience
 */
export function useUserService(): UserService {
  return getServiceRegistry().userService;
}

export function usePostService(): PostService {
  return getServiceRegistry().postService;
}

/**
 * Type-safe service accessor with error handling
 */
export function withServices<T>(
  callback: (services: ServiceRegistry) => T
): T | null {
  try {
    const services = getServiceRegistry();
    return callback(services);
  } catch (error) {
    console.error('Failed to access services:', error);
    return null;
  }
}