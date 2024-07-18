import { getCache } from "../cache";

interface GAEventParams {
    category: string;
    label?: string;
    value?: number;
    [key: string]: any; // For any additional parameters
  }
  
  export function sendGAEvent(eventName: string, eventParams: GAEventParams) {
    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', eventName, {
        event_category: eventParams.category,
        event_label: eventParams.label,
        value: eventParams.value,
        userId: (getCache('authData') as { id?: string })?.id,
        ...eventParams // Spread any additional parameters
      });
    }
  }



  export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
      return new Promise((resolve) => {
        if (timeout) {
          clearTimeout(timeout);
        }
  
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
    };
  }