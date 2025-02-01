export interface TimeSeriesData {
    time: string;
    wpm: number;
    focusScore: number;
  }
  
  export interface DraftData {
    createdAt: number;
    postText: string;
    updatedAt: number;
    totalWords?: number;
    totalFocusTime?: number;
    totalSessionTime?: number;
    maxWpmEver?: number;
  }
  
  export interface DayCount {
    [key: string]: number;
  }
  
  export interface PeakUsageData {
    [key: string]: number;
  }

  export interface DraftMetrics {
    totalWords: number;
    totalFocusTime: number;
    totalIdleTime: number;
    totalSessionTime: number;
    maxWpmEver: number;
    lastModified: number;
  }
  
  export interface GlobalMetrics {
    totalWordsWritten: number;
    totalFocusTime: number;
    totalIdleTime: number;
    highestWpmEver: number;
    firstSessionDate: number;
    lastSessionDate: number;
    consecutiveDays: number;
    longestStreak: number;
    draftsVersion: number;
  }
  
  export type MetaData = {
    drafts: Record<string, DraftMetrics>; // Map of draft IDs to their metrics
    global: GlobalMetrics;
  };
  