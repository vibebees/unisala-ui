interface Analytics {
    typingSpeed: number;
    wordCount: number;
    charCount: number;
    focusTime: number;
    idleTime: number;
    toolbarUsage: Record<string, number>;
  }
  
  // Track typing speed
  export const trackTypingSpeed = (content: string, startTime: number, analytics: Analytics) => {
    const elapsedTime = (Date.now() - startTime) / 60000; // Time in minutes
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  
    analytics.typingSpeed = parseFloat((wordCount / elapsedTime).toFixed(2));
  };
  
  // Track toolbar usage
  export const trackToolbarUsage = (action: string, analytics: Analytics) => {
    if (!analytics.toolbarUsage[action]) {
      analytics.toolbarUsage[action] = 0;
    }
    analytics.toolbarUsage[action]++;
  };
  
  // Compute analytics
  export const computeAnalytics = (content: string, startTime: number, analytics: Analytics) => {
    const plainText = content.trim();
  
    analytics.wordCount = plainText.split(/\s+/).filter(Boolean).length;
    analytics.charCount = plainText.length;
  
    // Update typing speed
    trackTypingSpeed(content, startTime, analytics);
  
    return analytics;
  };
  