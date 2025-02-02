import moment from 'moment';
 import { getCache, setCache } from "../cache";
import type { StreakMetrics } from '@/types/metrics';

export type SessionType = 'SESSION_START' | 'SESSION_END';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const initializeStreak = (currentTime = Date.now()): StreakMetrics => {
    return {
        lastVisit: currentTime,
        currentStreak: 1,
        longestStreak: 1,
        startTime: currentTime,
        lastActiveTime: currentTime,
        totalSessions: 1,
        totalTimeSpent: 0,
        sessions:[{
            startTime: currentTime,
            endTime: currentTime
        }]
    };
};


export const calculateDayDifference = (lastVisit: number, currentTime: number): number => {
  // Convert timestamps to Moment objects
  const lastDate = moment(lastVisit).startOf('day'); // Reset to midnight
  const currentDate = moment(currentTime).startOf('day'); // Reset to midnight

  // Calculate the difference in days
  return currentDate.diff(lastDate, 'days');
};



export const calculateStreak = (sessionType: SessionType, configMetrics?: StreakMetrics): StreakMetrics => {
    const currentTime = Date.now(); // Always use the actual current time
    const metrics = configMetrics || getCache<StreakMetrics>('streakMetrics');

    if (!metrics) {
        return initializeStreak(currentTime);
    }

    if (sessionType === 'SESSION_START') {
        const daysDifference = calculateDayDifference(metrics.lastVisit, currentTime);

        if (daysDifference < 0) {
            throw new Error('Invalid timestamp: lastVisit cannot be in the future');
        }

        
        let newStreak = metrics.currentStreak;

        if (daysDifference === 0) {
            // Same day, no change to the streak
            newStreak = metrics.currentStreak;
        } else if (daysDifference === 1) {
            // Consecutive day, increment the streak
            newStreak = metrics.currentStreak + 1;
        } else if (daysDifference > 1) {
            // More than one day gap, reset the streak
            newStreak = 1;
        }

        return {
            lastVisit: currentTime, // Update lastVisit to the current time
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, metrics.longestStreak),
            startTime: metrics.startTime, // Keep the original start time
            lastActiveTime: currentTime,
            totalSessions: metrics.totalSessions + 1,
            totalTimeSpent: metrics.totalTimeSpent,
            sessions: [...metrics.sessions, {
                startTime: currentTime,
                endTime: currentTime
            }]
        };
    }

    if (sessionType === 'SESSION_END') {
        const sessionTime = Math.max(0, currentTime - metrics.sessions[metrics.sessions.length - 1].startTime);
        const updatedSessions = [...metrics.sessions];
        updatedSessions[updatedSessions.length - 1].endTime = currentTime;
        return {
            ...metrics,
            lastActiveTime: currentTime,
            totalTimeSpent: metrics.totalTimeSpent + sessionTime
        };
    }

    return metrics;
};

export const updateStreak = (
    sessionType: SessionType,
    sessionData?: StreakMetrics
): StreakMetrics => {
    const data = calculateStreak(sessionType, sessionData);
    setCache('streakMetrics', data);
    return data;
};
