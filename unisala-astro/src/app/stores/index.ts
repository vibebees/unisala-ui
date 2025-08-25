/**
 * Store registry and exports for the entire application
 * This file serves as the single entry point for all state management
 */

// Store exports
export { useUserStore, userSelectors, userActions } from './user.store';
export { useDraftsStore, draftSelectors, draftActions } from './drafts.store';
export { useAppStore, appSelectors, appActions } from './app.store';

// Store types
export type { UserStore } from './user.store';
export type { DraftsStore } from './drafts.store';
export type { AppStore, Theme, LayoutConfig, EditorConfig, AppNotification } from './app.store';

// Domain types re-exports for convenience
export type { User, UserAuth } from '@/core/domain/user';
export type { PostDraft, Tag } from '@/core/domain/post';

import type { UserStore } from './user.store';
import type { DraftsStore } from './drafts.store';
import type { AppStore } from './app.store';
import { useUserStore } from './user.store';
import { useDraftsStore } from './drafts.store';
import { useAppStore } from './app.store';

/**
 * Combined store selector type for components that need multiple stores
 */
export interface StoreSelectors {
  user: UserStore;
  drafts: DraftsStore;
  app: AppStore;
}

/**
 * Hook to access all stores (use sparingly to avoid unnecessary re-renders)
 */
export function useAllStores(): StoreSelectors {
  return {
    user: useUserStore(),
    drafts: useDraftsStore(),
    app: useAppStore(),
  };
}

/**
 * Hook for components that only need specific store actions (no re-renders on state changes)
 */
export function useStoreActions() {
  const userStore = useUserStore.getState();
  const draftsStore = useDraftsStore.getState();
  const appStore = useAppStore.getState();
  
  return {
    user: {
      login: userStore.login,
      logout: userStore.logout,
      updateProfile: userStore.updateProfile,
      clearError: userStore.clearError,
    },
    drafts: {
      createDraft: draftsStore.createDraft,
      saveDraft: draftsStore.saveDraft,
      deleteDraft: draftsStore.deleteDraft,
      loadDraft: draftsStore.loadDraft,
    },
    app: {
      setTheme: appStore.setTheme,
      toggleTheme: appStore.toggleTheme,
      toggleSidebar: appStore.toggleSidebar,
      addNotification: appStore.addNotification,
    },
  };
}

/**
 * Store initialization function
 * Call this during app bootstrap to set up stores properly
 */
export function initializeStores() {
  // Initialize app store first
  const appStore = useAppStore.getState();
  
  // Apply theme if we're in the browser
  if (typeof window !== 'undefined') {
    appStore.setTheme(appStore.theme);
    appStore.setInitialized(true);
  }

  // Set up store cross-subscriptions if needed
  // For example, when user logs out, clear drafts
  useUserStore.subscribe(
    (state: UserStore) => state.isAuthenticated,
    (isAuthenticated: boolean, previousIsAuthenticated: boolean) => {
      if (previousIsAuthenticated && !isAuthenticated) {
        // User logged out, optionally clear drafts or other sensitive data
        console.log('User logged out, cleaning up state...');
      }
    }
  );

  // Set up drafts auto-save subscription
  let autoSaveTimeout: NodeJS.Timeout;
  useDraftsStore.subscribe(
    (state: DraftsStore) => ({ 
      currentDraftId: state.currentDraftId, 
      currentDraft: state.currentDraftId ? state.drafts[state.currentDraftId] : null 
    }),
    ({ currentDraftId, currentDraft }: { currentDraftId: string | null; currentDraft: any }) => {
      if (currentDraft && currentDraft.autoSaveEnabled && !useDraftsStore.getState().isSaving) {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
          const store = useDraftsStore.getState();
          if (currentDraftId && currentDraft) {
            store.saveDraft(currentDraftId, currentDraft.title, currentDraft.content);
          }
        }, useAppStore.getState().editor.autoSaveInterval);
      }
    }
  );

  return {
    user: useUserStore.getState(),
    drafts: useDraftsStore.getState(),
    app: appStore,
  };
}

/**
 * Store cleanup function
 * Call this during app teardown
 */
export function cleanupStores() {
  // Clear any pending timeouts or subscriptions
  console.log('Cleaning up stores...');
  
  // Reset stores to initial state if needed
  // (Usually not necessary as the browser page is being unloaded)
}

/**
 * Development helpers
 */
if (process.env['NODE_ENV'] === 'development') {
  // Add stores to window object for debugging
  if (typeof window !== 'undefined') {
    (window as any).__STORES__ = {
      user: useUserStore,
      drafts: useDraftsStore,
      app: useAppStore,
    };
  }
}