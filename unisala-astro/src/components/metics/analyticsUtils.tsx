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
  
  export const calculateTextMetrics = (editor: { getText: () => any; }, sessionRef: { current: { lastWPMCalculation: any; wordCount?: any; startTime?: any; }; }) => {
    const text = editor.getText();
    const currentWordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const { wordCount, startTime, lastWPMCalculation = Date.now() } = sessionRef.current;
    
    // Calculate WPM
    const timeElapsed = (Date.now() - lastWPMCalculation) / 1000 / 60; // in minutes
    const wordsAdded = currentWordCount - wordCount.current;
    const currentWPM = timeElapsed > 0 ? Math.round(wordsAdded / timeElapsed) : 0;
    
    // Update word counts
    if (currentWordCount > wordCount.current) {
      wordCount.added += currentWordCount - wordCount.current;
    } else if (currentWordCount < wordCount.current) {
      wordCount.deleted += wordCount.current - currentWordCount;
    }
    wordCount.current = currentWordCount;
  
    sessionRef.current.lastWPMCalculation = Date.now();
  
    return {
      wordCount: currentWordCount,
      characterCount: text.length,
      lineCount: (text.match(/\n/g) || []).length + 1,
      wpm: currentWPM
    };
  };