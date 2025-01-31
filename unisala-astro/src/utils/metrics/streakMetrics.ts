import moment from 'moment';
import type { Metrics } from "@/types/metrics";
import { getCache, setCache } from "../cache";
import { differenceInDays, startOfDay ,max} from 'date-fns';

export type SessionType = 'SESSION_START' | 'SESSION_END';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const initializeStreak = (currentTime = Date.now()): Metrics => {
    return {
        lastVisit: currentTime,
        currentStreak: 1,
        longestStreak: 1,
        startTime: currentTime,
        lastActiveTime: currentTime,
        totalSessions: 1,
        totalTimeSpent: 0
    };
};


export const calculateDayDifference = (lastVisit: number, currentTime: number): number => {
  // Convert timestamps to Moment objects
  const lastDate = moment(lastVisit).startOf('day'); // Reset to midnight
  const currentDate = moment(currentTime).startOf('day'); // Reset to midnight

  // Calculate the difference in days
  return currentDate.diff(lastDate, 'days');
};



export const calculateStreak = (sessionType: SessionType, configMetrics?: Metrics): Metrics => {
    const currentTime = Date.now(); // Always use the actual current time
    const metrics = configMetrics || getCache<Metrics>('streakMetrics');

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
            totalTimeSpent: metrics.totalTimeSpent
        };
    }

    if (sessionType === 'SESSION_END') {
        const sessionTime = Math.max(0, currentTime - metrics.startTime);
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
    sessionData?: Metrics
): Metrics => {
    const data = calculateStreak(sessionType, sessionData);
    setCache('streakMetrics', data);
    return data;
};
