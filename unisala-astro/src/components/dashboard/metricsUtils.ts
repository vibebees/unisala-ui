// src/utils/metrics.ts
import { getCache } from "@/utils/cache";

interface Session {
  startTime: number;
  endTime: number;
}

interface DraftData {
  totalWords: number;
  totalFocusTime: number;
  totalIdleTime: number;
  totalSessionTime: number;
  maxWpmEver: number;
  lastModified: number;
  createdAt?: number;
  updatedAt?: number;
}

interface EditorMetrics {
  drafts: { [key: string]: DraftData };
  global: {
    totalWordsWritten: number;
    totalFocusTime: number;
    totalIdleTime: number;
    highestWpmEver: number;
    firstSessionDate: number;
    lastSessionDate: number;
    consecutiveDays: number;
    longestStreak: number;
    draftsVersion: number;
  };
}

interface StreakMetrics {
  lastVisit: number;
  currentStreak: number;
  longestStreak: number;
  startTime: number;
  lastActiveTime: number;
  totalSessions: number;
  totalTimeSpent: number;
  sessions: Session[];
}

const calculateMetrics = () => {
  // Get both metrics sources
  const editorMetrics: EditorMetrics = getCache('editorMetrics') || { 
    drafts: {}, 
    global: {
      totalWordsWritten: 0,
      totalFocusTime: 0,
      totalIdleTime: 0,
      highestWpmEver: 0,
      firstSessionDate: 0,
      lastSessionDate: 0,
      consecutiveDays: 0,
      longestStreak: 0,
      draftsVersion: 0
    }
  };

  const streakMetrics: StreakMetrics = getCache('streakMetrics') || { 
    lastVisit: 0,
    currentStreak: 0,
    longestStreak: 0,
    startTime: 0,
    lastActiveTime: 0,
    totalSessions: 0,
    totalTimeSpent: 0,
    sessions: []
  };

  // Calculate editor metrics
  const drafts = editorMetrics.drafts;
  const editorTotals = {
    totalTime: Object.values(drafts).reduce((sum, draft) => sum + (draft.totalSessionTime || 0), 0),
    totalWords: Object.values(drafts).reduce((sum, draft) => sum + (draft.totalWords || 0), 0),
    totalFocusTime: Object.values(drafts).reduce((sum, draft) => sum + (draft.totalFocusTime || 0), 0),
    totalIdleTime: Object.values(drafts).reduce((sum, draft) => sum + (draft.totalIdleTime || 0), 0),
    maxWpm: Math.max(...Object.values(drafts).map(draft => draft.maxWpmEver || 0))
  };

  // Calculate streak metrics
  const validSessions = streakMetrics.sessions
    .filter(session => session.endTime >= session.startTime)
    .sort((a, b) => a.startTime - b.startTime);

  const calculateActiveTime = (sessions: Session[]): number => {
    let totalTime = 0;
    let lastEndTime = 0;

    sessions.forEach(session => {
      const isNewSession = !lastEndTime || session.startTime - lastEndTime > 300000;
      
      if (isNewSession) {
        totalTime += session.endTime - session.startTime;
      } else if (session.endTime > lastEndTime) {
        totalTime += session.endTime - lastEndTime;
      }
      
      lastEndTime = Math.max(lastEndTime, session.endTime);
    });

    return totalTime;
  };

  const calculateStreaks = (sessions: Session[]) => {
    const daySet = new Set<string>();
    
    sessions.forEach(session => {
      const day = new Date(session.startTime).toLocaleDateString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
      daySet.add(day);
    });

    const sortedDays = Array.from(daySet).map(day => new Date(day).getTime()).sort();
    
    let currentStreak = 1;
    let maxStreak = 1;
    let lastDay = new Date(sortedDays[0]).getTime();

    for (let i = 1; i < sortedDays.length; i++) {
      const currentDay = new Date(sortedDays[i]).getTime();
      const diffDays = Math.round((currentDay - lastDay) / (24 * 60 * 60 * 1000));
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
      
      lastDay = currentDay;
    }

    return { currentStreak, maxStreak };
  };

  const sessionActiveTime = calculateActiveTime(validSessions);
  const { currentStreak, maxStreak } = calculateStreaks(validSessions);
  
  // Calculate average WPM
  const averageWpm = editorTotals.totalTime > 0 
    ? Math.trunc(editorTotals.totalWords / (editorTotals.totalTime / 60000))
    : 0;

  return {
    editorMetrics: {
      totalTimeSpent: editorTotals.totalTime,
      focusPercentage: editorTotals.totalTime > 0 
        ? (editorTotals.totalFocusTime / editorTotals.totalTime) * 100 
        : 0,
      averageWpm,
      ...editorTotals
    },
    
    streakMetrics: {
      sessionTimeSpent: sessionActiveTime,
      currentStreak,
      longestStreak: maxStreak,
      totalSessions: validSessions.length,
      lastVisit: validSessions[validSessions.length - 1]?.endTime || 0,
      startTime: validSessions[0]?.startTime || 0,
      lastActiveTime: validSessions[validSessions.length - 1]?.endTime || 0,
      sessions: validSessions
    }
  };
};

export const getUpdatedMetrics = () => calculateMetrics();