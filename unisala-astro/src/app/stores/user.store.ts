import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { User, UserAuth } from '@/core/domain/user';
import type { Result } from '@/core/result';
import { TransportError } from '@/infrastructure/errors';
import { getCache, setCache, removeCache } from '@/utils/cache';
// import { UserService } from '@/infrastructure/api/services/user.service';

/**
 * User authentication state
 */
export interface UserAuthState {
  isAuthenticated: boolean;
  user: User | null;
  userAuth: UserAuth | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * User store actions
 */
export interface UserStoreActions {
  // Authentication actions
  login: (email: string, verificationCode: number) => Promise<Result<UserAuth, TransportError>>;
  logout: () => void;
  setUser: (user: User, userAuth: UserAuth) => void;
  clearError: () => void;
  
  // Profile actions
  updateProfile: (updates: Partial<User>) => Promise<Result<User, TransportError>>;
  refreshUserProfile: () => Promise<Result<User, TransportError>>;
  
  // Loading state
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

/**
 * Complete user store interface
 */
export interface UserStore extends UserAuthState, UserStoreActions {}

/**
 * User store implementation with Zustand
 */
export const useUserStore = create<UserStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // Initial state
        isAuthenticated: false,
        user: null,
        userAuth: null,
        isLoading: false,
        error: null,

        // Authentication actions
        login: async (email: string, _verificationCode: number) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // This would typically use the UserService
            // For now, simulate a login response
            const mockUserAuth: UserAuth = {
              userId: 'user-123',
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              expiresAt: new Date(Date.now() + 3600000),
              tokenType: 'Bearer',
            };

            const mockUser: User = {
              id: 'user-123',
              email,
              username: email,
              displayName: email.split('@')[0] || 'User',
              createdAt: new Date(),
              updatedAt: new Date(),
              profile: {
                firstName: '',
                lastName: '',
                bio: '',
                university: '',
                major: '',
                graduationYear: 0,
                location: '',
              },
              preferences: {
                theme: 'system',
                notifications: {
                  email: true,
                  browser: true,
                  comments: true,
                  replies: true,
                  mentions: true,
                  newsletters: false,
                },
                privacy: {
                  profileVisibility: 'public',
                  activityTracking: true,
                  dataSharing: false,
                },
              },
            };

            // Save to cache
            setCache('authData', {
              accessToken: mockUserAuth.accessToken,
              refreshToken: mockUserAuth.refreshToken,
              user: mockUser,
            });

            set((state) => {
              state.isAuthenticated = true;
              state.user = mockUser;
              state.userAuth = mockUserAuth;
              state.isLoading = false;
              state.error = null;
            });

            return { success: true, data: mockUserAuth };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            
            set((state) => {
              state.isLoading = false;
              state.error = errorMessage;
            });

            return { 
              success: false, 
              error: new TransportError(errorMessage, 400, error)
            };
          }
        },

        logout: () => {
          // Clear cache
          removeCache('authData');
          removeCache('notesPublished');
          removeCache('drafts');

          set((state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.userAuth = null;
            state.error = null;
          });
        },

        setUser: (user: User, userAuth: UserAuth) => {
          set((state) => {
            state.isAuthenticated = true;
            state.user = user;
            state.userAuth = userAuth;
            state.error = null;
          });

          // Update cache
          setCache('authData', {
            accessToken: userAuth.accessToken,
            refreshToken: userAuth.refreshToken,
            user,
          });
        },

        clearError: () => {
          set((state) => {
            state.error = null;
          });
        },

        // Profile actions
        updateProfile: async (updates: Partial<User>) => {
          const currentUser = get().user;
          if (!currentUser) {
            return { 
              success: false, 
              error: new TransportError('No user logged in', 401)
            };
          }

          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // In real implementation, this would call the UserService
            const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() };

            set((state) => {
              state.user = updatedUser;
              state.isLoading = false;
            });

            // Update cache
            const authData = getCache('authData');
            if (authData) {
              setCache('authData', {
                ...authData,
                user: updatedUser,
              });
            }

            return { success: true, data: updatedUser };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
            
            set((state) => {
              state.isLoading = false;
              state.error = errorMessage;
            });

            return { 
              success: false, 
              error: new TransportError(errorMessage, 500, error)
            };
          }
        },

        refreshUserProfile: async () => {
          const currentUser = get().user;
          if (!currentUser) {
            return { 
              success: false, 
              error: new TransportError('No user logged in', 401)
            };
          }

          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // In real implementation, this would fetch fresh user data
            // For now, just return the current user
            set((state) => {
              state.isLoading = false;
            });

            return { success: true, data: currentUser };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Profile refresh failed';
            
            set((state) => {
              state.isLoading = false;
              state.error = errorMessage;
            });

            return { 
              success: false, 
              error: new TransportError(errorMessage, 500, error)
            };
          }
        },

        // Loading state actions
        setLoading: (loading: boolean) => {
          set((state) => {
            state.isLoading = loading;
          });
        },

        setError: (error: string) => {
          set((state) => {
            state.error = error;
          });
        },
      })),
      {
        name: 'unisala-user-store',
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          userAuth: state.userAuth,
        }),
        onRehydrateStorage: () => (state) => {
          // Verify auth token validity on rehydration
          if (state?.userAuth?.expiresAt && new Date() > state.userAuth.expiresAt) {
            // Token expired, clear auth state
            state.logout();
          }
        },
      }
    )
  )
);

/**
 * User store selectors for optimized component re-renders
 */
export const userSelectors = {
  isAuthenticated: (state: UserStore) => state.isAuthenticated,
  user: (state: UserStore) => state.user,
  isLoading: (state: UserStore) => state.isLoading,
  error: (state: UserStore) => state.error,
  displayName: (state: UserStore) => state.user?.displayName || 'Anonymous',
  avatar: (state: UserStore) => state.user?.avatarUrl,
  theme: (state: UserStore) => state.user?.preferences.theme || 'system',
};

/**
 * User store action selectors (for components that only need actions)
 */
export const userActions = {
  login: (state: UserStore) => state.login,
  logout: (state: UserStore) => state.logout,
  updateProfile: (state: UserStore) => state.updateProfile,
  clearError: (state: UserStore) => state.clearError,
};