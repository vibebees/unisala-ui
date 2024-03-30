// cacheUtils.ts

/**
 * A utility module for handling local storage in a TypeScript application.
 * Provides functions to safely set, get, and remove items from local storage.
 */

/**
 * Safely retrieves an item from local storage and parses it as JSON.
 * @param key The key under which the item is stored.
 * @returns The parsed item if found and valid JSON, or null otherwise.
 */
export function getCache<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
    } catch (error) {
        console.error(`Error retrieving item from local storage: ${error}`);
        return null;
    }
}

/**
 * Safely stores an item in local storage as a JSON string.
 * @param key The key under which to store the item.
 * @param value The item to store, which will be stringified as JSON.
 */
export function setCache<T>(key: string, value: T): void {
    try {
        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
    } catch (error) {
        console.error(`Error storing item in local storage: ${error}`);
    }
}

/**
 * Removes an item from local storage.
 * @param key The key under which the item is stored.
 */
export function removeCache(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item from local storage: ${error}`);
    }
}

/**
 * Clears all entries from local storage. Use with caution.
 */
export function clearCache(): void {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Error clearing local storage: ${error}`);
    }
}
