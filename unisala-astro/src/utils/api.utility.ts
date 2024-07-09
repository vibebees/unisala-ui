import { getCache } from "./cache";

// utils.js
export async function fetchApi(url: string | URL | Request, options: Record<string, any> = {}) {
    const authData: { accessToken?: string } | null = getCache('authData');
    const accessToken = authData?.accessToken;
    
    console.log('accessToken', accessToken)
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
      },
    };
  
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };
  
    const response = await fetch(url, mergedOptions);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }