import type { DraftData, EditorMetrics, StreakMetrics } from "@/types/metrics";
import { getCache } from "@/utils/cache";

// Calculate total time spent in the app
  const calculateTotalTimeSpent = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalSessionTime || 0), 0);
  };

  // Calculate total words written
  const calculateTotalWords = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalWords || 0), 0);
  };

  // Calculate average WPM
  const calculateAverageWpm = (totalWords: number, totalTimeSpent: number): number => {
    if (totalTimeSpent === 0) return 0;
    return Math.trunc(totalWords / (totalTimeSpent / 60000))
  };

  // Find max WPM ever
  const findMaxWpm = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Math.max(...Object.values(drafts).map(draft => draft.maxWpmEver || 0));
  };

  // Calculate total focus time
  const calculateTotalFocusTime = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalFocusTime || 0), 0);
  };

  // Calculate total idle time
  const calculateTotalIdleTime = (drafts: { [key: string]: DraftData }): number => {
    if (!drafts) return 0;
    return Object.values(drafts).reduce((sum, draft) => sum + (draft.totalIdleTime || 0), 0);
  };

  // Calculate focus percentage
  const calculateFocusPercentage = (totalFocusTime: number, totalTimeSpent: number): number => {
    if (totalTimeSpent === 0) return 0;
    return parseFloat(((totalFocusTime / totalTimeSpent) * 100).toFixed(2));
  };

  const millisecondsToHours = (ms: number): number => {
    return parseFloat((ms / (1000 * 60 * 60)).toFixed(2)); // Convert to hours and round to 2 decimal places
  };

  const calculateLongestStreak = (
    storyDrafts = getCache('storyDrafts'),
    editorMetrics: EditorMetrics = getCache('editorMetrics') || {} as EditorMetrics,
    streakMetrics: StreakMetrics = getCache('streakMetrics') || {} as StreakMetrics
  ): number => {
  
    const allTimestamps: number[] = [];
  
    // Add timestamps from storyDrafts
    if (storyDrafts) {
      Object.values(storyDrafts).forEach(draft => {
        if (draft.createdAt) allTimestamps.push(draft.createdAt);
        if (draft.updatedAt) allTimestamps.push(draft.updatedAt);
      });
    }
  
    // Add timestamps from editorMetrics.drafts
    if (editorMetrics?.drafts) {
      Object.values(editorMetrics.drafts).forEach(draft => {
        if (draft.lastModified) allTimestamps.push(draft.lastModified);
      });
    }
  
    // Add timestamps from streakMetrics.sessions
    if (streakMetrics?.sessions) {
      streakMetrics.sessions.forEach(session => {
        allTimestamps.push(session.startTime);
        allTimestamps.push(session.endTime);
      });
    }
  
    // If no timestamps are available, return 0
    if (allTimestamps.length === 0) return 0;
  
    // Sort and deduplicate timestamps
    const uniqueTimestamps = Array.from(new Set(allTimestamps)).sort((a, b) => a - b);
  
    // Convert timestamps to dates and calculate the streak
    const sortedDates = uniqueTimestamps.map(timestamp => new Date(timestamp).toISOString().split('T')[0]); // Extract YYYY-MM-DD
    const uniqueDates = Array.from(new Set(sortedDates)).sort(); // Deduplicate and sort dates
  
    let maxStreak = 0;
    let currentStreak = 1;
  
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currentDate = new Date(uniqueDates[i]);
  
      const diffInDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
  
      if (diffInDays === 1) {
        currentStreak++;
      } else if (diffInDays > 1) {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
    return Math.max(maxStreak, currentStreak);
  };


  const calculateWritingStreak = (
    editorMetrics: EditorMetrics = getCache('editorMetrics') || {} as EditorMetrics,
    storyDrafts = getCache('storyDrafts')
  ): number => {
    const allTimestamps: number[] = [];
  
    // Add timestamps from editorMetrics.drafts (preferred source)
    if (editorMetrics?.drafts) {
      Object.values(editorMetrics.drafts).forEach(draft => {
        if (draft.lastModified) allTimestamps.push(draft.lastModified);
      });
    }
  
    // Optionally, add timestamps from storyDrafts (if needed)
    if (storyDrafts) {
      Object.values(storyDrafts).forEach(draft => {
        if (draft.createdAt) allTimestamps.push(draft.createdAt);
        if (draft.updatedAt) allTimestamps.push(draft.updatedAt);
      });
    }
  
    // If no timestamps are available, return 0
    if (allTimestamps.length === 0) return 0;
  
    // Sort and deduplicate timestamps
    const uniqueTimestamps = Array.from(new Set(allTimestamps)).sort((a, b) => a - b);
  
    // Convert timestamps to dates and calculate the streak
    const sortedDates = uniqueTimestamps.map(timestamp => new Date(timestamp).toISOString().split('T')[0]); // Extract YYYY-MM-DD
    const uniqueDates = Array.from(new Set(sortedDates)).sort(); // Deduplicate and sort dates
  
    let maxStreak = 0;
    let currentStreak = 1;
  
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currentDate = new Date(uniqueDates[i]);
  
      const diffInDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
  
      if (diffInDays === 1) {
        currentStreak++;
      } else if (diffInDays > 1) {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
    return Math.max(maxStreak, currentStreak);
  };


  export {
    calculateTotalTimeSpent,
    calculateTotalWords,
    calculateAverageWpm,
    findMaxWpm,
    calculateTotalFocusTime,
    calculateTotalIdleTime,
    calculateFocusPercentage,
    millisecondsToHours,
    calculateLongestStreak,
    calculateWritingStreak
  }