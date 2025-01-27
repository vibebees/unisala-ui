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
    const currentTime = configMetrics?.lastVisit || Date.now();
    const metrics = configMetrics || getCache<Metrics>('streakMetrics');

    if (!metrics) {
        return initializeStreak(currentTime);
    }

    if (sessionType === 'SESSION_START') {
        const daysDifference = calculateDayDifference(metrics.lastVisit, currentTime);
        let newStreak = metrics.currentStreak;
        const newLastVisit = max([new Date(metrics.lastVisit), new Date(currentTime)]).getTime();

        if (daysDifference === 0) {
            newStreak = metrics.currentStreak;
        } else if (daysDifference === 1) {
            newStreak = metrics.currentStreak + 1;
        } else if (daysDifference > 1) {
            newStreak = 1;
        }

        return {
            lastVisit: newLastVisit,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, metrics.longestStreak),
            startTime: currentTime,
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
