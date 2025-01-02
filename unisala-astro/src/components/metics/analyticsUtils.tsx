// utils/analyticsUtilities.ts
export const calculateWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };
  
  export const calculateCharacterCount = (text: string) => {
    return text.length;
  };
  
  export const calculateTypingSpeed = (wordCount: number, startTime: number, currentTime: number) => {
    const timeElapsed = (currentTime - startTime) / 60000; // Time in minutes
    return Math.round(wordCount / timeElapsed) || 0;
  };
  
  export const isUserIdle = (lastInteraction: number, idleThreshold = 7000) => {
    return Date.now() - lastInteraction > idleThreshold;
  };
  