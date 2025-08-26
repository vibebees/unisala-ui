import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

/**
 * Theme options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * App layout configurations
 */
export interface LayoutConfig {
  sidebarCollapsed: boolean;
  sidebarWidth: number;
  showPreviewPanel: boolean;
  editorLayout: 'split' | 'tabs' | 'fullscreen';
}

/**
 * Editor preferences
 */
export interface EditorConfig {
  fontSize: number;
  lineHeight: number;
  wordWrap: boolean;
  showLineNumbers: boolean;
  autoSave: boolean;
  autoSaveInterval: number; // milliseconds
  spellCheck: boolean;
}

/**
 * Application state
 */
export interface AppState {
  theme: Theme;
  layout: LayoutConfig;
  editor: EditorConfig;
  isOnline: boolean;
  lastSyncedAt: Date | null;
  notifications: AppNotification[];
  isInitialized: boolean;
}

/**
 * App notification
 */
export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  persistent?: boolean;
}

/**
 * App store actions
 */
export interface AppStoreActions {
  // Theme management
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Layout management
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  setShowPreviewPanel: (show: boolean) => void;
  setEditorLayout: (layout: LayoutConfig['editorLayout']) => void;
  
  // Editor configuration
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setWordWrap: (wrap: boolean) => void;
  setShowLineNumbers: (show: boolean) => void;
  setAutoSave: (enabled: boolean) => void;
  setAutoSaveInterval: (interval: number) => void;
  setSpellCheck: (enabled: boolean) => void;
  
  // App state
  setOnlineStatus: (online: boolean) => void;
  setSyncedAt: (date: Date) => void;
  setInitialized: (initialized: boolean) => void;
  
  // Notifications
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Bulk actions
  resetLayout: () => void;
  resetEditor: () => void;
  resetAll: () => void;
}

/**
 * Complete app store interface
 */
export interface AppStore extends AppState, AppStoreActions {}

/**
 * Default configurations
 */
const DEFAULT_LAYOUT: LayoutConfig = {
  sidebarCollapsed: false,
  sidebarWidth: 280,
  showPreviewPanel: false,
  editorLayout: 'split',
};

const DEFAULT_EDITOR: EditorConfig = {
  fontSize: 14,
  lineHeight: 1.5,
  wordWrap: true,
  showLineNumbers: true,
  autoSave: true,
  autoSaveInterval: 5000, // 5 seconds
  spellCheck: true,
};

/**
 * App store implementation
 */
export const useAppStore = create<AppStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // Initial state
        theme: 'system',
        layout: DEFAULT_LAYOUT,
        editor: DEFAULT_EDITOR,
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        lastSyncedAt: null,
        notifications: [],
        isInitialized: false,

        // Theme management
        setTheme: (theme: Theme) => {
          set((state) => {
            state.theme = theme;
          });
          
          // Apply theme to document
          if (typeof document !== 'undefined') {
            const root = document.documentElement;
            if (theme === 'system') {
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              root.classList.toggle('dark', prefersDark);
            } else {
              root.classList.toggle('dark', theme === 'dark');
            }
          }
        },

        toggleTheme: () => {
          const currentTheme = get().theme;
          const newTheme: Theme = currentTheme === 'light' ? 'dark' : 
                                  currentTheme === 'dark' ? 'system' : 'light';
          get().setTheme(newTheme);
        },

        // Layout management
        setSidebarCollapsed: (collapsed: boolean) => {
          set((state) => {
            state.layout.sidebarCollapsed = collapsed;
          });
        },

        toggleSidebar: () => {
          set((state) => {
            state.layout.sidebarCollapsed = !state.layout.sidebarCollapsed;
          });
        },

        setSidebarWidth: (width: number) => {
          set((state) => {
            state.layout.sidebarWidth = Math.max(200, Math.min(500, width));
          });
        },

        setShowPreviewPanel: (show: boolean) => {
          set((state) => {
            state.layout.showPreviewPanel = show;
          });
        },

        setEditorLayout: (layout: LayoutConfig['editorLayout']) => {
          set((state) => {
            state.layout.editorLayout = layout;
          });
        },

        // Editor configuration
        setFontSize: (size: number) => {
          set((state) => {
            state.editor.fontSize = Math.max(10, Math.min(24, size));
          });
        },

        setLineHeight: (height: number) => {
          set((state) => {
            state.editor.lineHeight = Math.max(1.0, Math.min(2.5, height));
          });
        },

        setWordWrap: (wrap: boolean) => {
          set((state) => {
            state.editor.wordWrap = wrap;
          });
        },

        setShowLineNumbers: (show: boolean) => {
          set((state) => {
            state.editor.showLineNumbers = show;
          });
        },

        setAutoSave: (enabled: boolean) => {
          set((state) => {
            state.editor.autoSave = enabled;
          });
        },

        setAutoSaveInterval: (interval: number) => {
          set((state) => {
            state.editor.autoSaveInterval = Math.max(1000, Math.min(60000, interval));
          });
        },

        setSpellCheck: (enabled: boolean) => {
          set((state) => {
            state.editor.spellCheck = enabled;
          });
        },

        // App state
        setOnlineStatus: (online: boolean) => {
          set((state) => {
            state.isOnline = online;
          });
        },

        setSyncedAt: (date: Date) => {
          set((state) => {
            state.lastSyncedAt = date;
          });
        },

        setInitialized: (initialized: boolean) => {
          set((state) => {
            state.isInitialized = initialized;
          });
        },

        // Notifications
        addNotification: (notificationData) => {
          const notification: AppNotification = {
            id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            timestamp: new Date(),
            read: false,
            ...notificationData,
          };

          set((state) => {
            state.notifications.unshift(notification);
            // Keep only the last 50 notifications
            if (state.notifications.length > 50) {
              state.notifications = state.notifications.slice(0, 50);
            }
          });
        },

        markNotificationRead: (id: string) => {
          set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification) {
              notification.read = true;
            }
          });
        },

        removeNotification: (id: string) => {
          set((state) => {
            state.notifications = state.notifications.filter(n => n.id !== id);
          });
        },

        clearNotifications: () => {
          set((state) => {
            state.notifications = [];
          });
        },

        // Bulk actions
        resetLayout: () => {
          set((state) => {
            state.layout = { ...DEFAULT_LAYOUT };
          });
        },

        resetEditor: () => {
          set((state) => {
            state.editor = { ...DEFAULT_EDITOR };
          });
        },

        resetAll: () => {
          set((state) => {
            state.layout = { ...DEFAULT_LAYOUT };
            state.editor = { ...DEFAULT_EDITOR };
            state.theme = 'system';
            state.notifications = [];
          });
        },
      })),
      {
        name: 'unisala-app-store',
        partialize: (state) => ({
          theme: state.theme,
          layout: state.layout,
          editor: state.editor,
          lastSyncedAt: state.lastSyncedAt,
        }),
      }
    )
  )
);

// Set up online/offline listeners
if (typeof window !== 'undefined') {
  const updateOnlineStatus = () => {
    useAppStore.getState().setOnlineStatus(navigator.onLine);
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Theme system preference listener
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = () => {
    const currentTheme = useAppStore.getState().theme;
    if (currentTheme === 'system') {
      useAppStore.getState().setTheme('system'); // Triggers theme application
    }
  };

  mediaQuery.addEventListener('change', handleThemeChange);
}

/**
 * App store selectors
 */
export const appSelectors = {
  theme: (state: AppStore) => state.theme,
  isDarkMode: (state: AppStore) => {
    if (state.theme === 'dark') return true;
    if (state.theme === 'light') return false;
    // System preference
    return typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  },
  layout: (state: AppStore) => state.layout,
  editor: (state: AppStore) => state.editor,
  isOnline: (state: AppStore) => state.isOnline,
  unreadNotifications: (state: AppStore) => state.notifications.filter(n => !n.read),
  notificationCount: (state: AppStore) => state.notifications.filter(n => !n.read).length,
  isInitialized: (state: AppStore) => state.isInitialized,
};

/**
 * App store action selectors
 */
export const appActions = {
  setTheme: (state: AppStore) => state.setTheme,
  toggleTheme: (state: AppStore) => state.toggleTheme,
  toggleSidebar: (state: AppStore) => state.toggleSidebar,
  addNotification: (state: AppStore) => state.addNotification,
  setInitialized: (state: AppStore) => state.setInitialized,
};