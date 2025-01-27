import { updateStreak } from '@/utils/metrics/streakMetrics';
import { beforeEach, describe, it, expect } from 'vitest';


import { calculateDayDifference } from '@/utils/metrics/streakMetrics';
 
describe('calculateDayDifference', () => {
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const NOW = 1697049600000; // Fixed timestamp for testing
  const YESTERDAY = NOW - DAY_IN_MS;
  const TOMORROW = NOW + DAY_IN_MS;
  const TWO_DAYS_AGO = NOW - 2 * DAY_IN_MS;
  const TWO_DAYS_LATER = NOW + 2 * DAY_IN_MS;

  // Same Day
  it('should return 0 for the same day', () => {
    const lastVisit = NOW;
    const currentTime = NOW + 1000; // 1 second later
    const result = calculateDayDifference(lastVisit, currentTime);
    expect(result).toBe(0);
  });

  // Consecutive Days
  it('should return 1 for consecutive days', () => {
    const lastVisit = YESTERDAY;
    const currentTime = NOW;
    const result = calculateDayDifference(lastVisit, currentTime);
    expect(result).toBe(1);
  });

  // Multiple Days Gap
  it('should return the correct number of days for gaps greater than one day', () => {
    const lastVisit = TWO_DAYS_AGO;
    const currentTime = NOW;
    const result = calculateDayDifference(lastVisit, currentTime);
    expect(result).toBe(2);
  });

  // Negative Day Difference
  it('should return a negative number if currentTime is before lastVisit', () => {
    const lastVisit = TOMORROW;
    const currentTime = NOW;
    const result = calculateDayDifference(lastVisit, currentTime);
    expect(result).toBe(-1);
  });

  // Midnight Edge Case
  it('should handle midnight edge cases correctly', () => {
    const lastVisit = NOW - 1000; // Just before midnight
    const currentTime = NOW; // Just after midnight
    const result = calculateDayDifference(lastVisit, currentTime);
    expect(result).toBe(1);
  });
});

describe('Streak Metrics', () => {
  beforeEach(() => {
    localStorage.removeItem('streakMetrics');
  });

  // Constants
  const NOW = 1697049600000; // Fixed timestamp for testing
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const YESTERDAY = NOW - DAY_IN_MS;
  const TWO_DAYS_AGO = NOW - 2 * DAY_IN_MS;

  // First Session
  it('should initialize metrics for the first session', () => {
    const result = updateStreak('SESSION_START');
    expect(result).toEqual({
      lastVisit: expect.any(Number),
      currentStreak: 1,
      longestStreak: 1,
      startTime: expect.any(Number),
      lastActiveTime: expect.any(Number),
      totalSessions: 1,
      totalTimeSpent: 0,
    });
  });

  // Consecutive Visits
  it('should increment streak for consecutive daily visits', () => {
    const previousMetrics = {
      lastVisit: YESTERDAY,
      currentStreak: 1,
      longestStreak: 1,
      startTime: YESTERDAY,
      lastActiveTime: YESTERDAY,
      totalSessions: 1,
      totalTimeSpent: 0,
    };

    const result = updateStreak('SESSION_START', previousMetrics);

    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.totalSessions).toBe(2);
  });

  // Breaking Streak
  it('should break streak if more than one day has passed', () => {
    const previousMetrics = {
      lastVisit: TWO_DAYS_AGO,
      currentStreak: 3,
      longestStreak: 3,
      startTime: TWO_DAYS_AGO,
      lastActiveTime: TWO_DAYS_AGO,
      totalSessions: 3,
      totalTimeSpent: 1000,
    };

    const result = updateStreak('SESSION_START', previousMetrics);

    expect(result.currentStreak).toBe(1); // Streak resets
    expect(result.longestStreak).toBe(3); // Longest streak remains
    expect(result.totalSessions).toBe(4); // Total sessions incremented
  });

  // Multiple Visits on Same Day
  it('should maintain streak for multiple visits in the same day', () => {
    const previousMetrics = {
      lastVisit: NOW,
      currentStreak: 2,
      longestStreak: 2,
      startTime: NOW,
      lastActiveTime: NOW,
      totalSessions: 2,
      totalTimeSpent: 1000,
    };

    const result = updateStreak('SESSION_START', previousMetrics);

    expect(result.currentStreak).toBe(2); // Streak unchanged
    expect(result.longestStreak).toBe(2); // Longest streak unchanged
    expect(result.totalSessions).toBe(3); // Sessions incremented
  });

  // Ending Session
  it('should update total time spent on session end', () => {
    const startTime = NOW - 1000; // 1 second ago
    const previousMetrics = {
      lastVisit: startTime,
      currentStreak: 1,
      longestStreak: 1,
      startTime: startTime,
      lastActiveTime: startTime,
      totalSessions: 1,
      totalTimeSpent: 0,
    };

    const result = updateStreak('SESSION_END', previousMetrics);

    expect(result.totalTimeSpent).toBeGreaterThan(0); // Time incremented
    expect(result.lastActiveTime).toBeGreaterThan(startTime); // Updated
    expect(result.totalSessions).toBe(1); // Sessions unchanged on end
  });

  // Negative Day Difference
  it('should handle negative day difference (incorrect time)', () => {
    const futureTimestamp = NOW + DAY_IN_MS;
    const previousMetrics = {
      lastVisit: futureTimestamp,
      currentStreak: 3,
      longestStreak: 3,
      startTime: futureTimestamp,
      lastActiveTime: futureTimestamp,
      totalSessions: 3,
      totalTimeSpent: 1000,
    };

    const result = updateStreak('SESSION_START', previousMetrics);

    expect(result.currentStreak).toBe(1); // Streak resets
    expect(result.longestStreak).toBe(3); // Longest streak remains
    expect(result.totalSessions).toBe(4); // Total sessions incremented
  });

  // Session End Without Start
  it('should handle session end without session start', () => {
    const result = updateStreak('SESSION_END');

    expect(result.totalTimeSpent).toBe(0); // No time spent
    expect(result.totalSessions).toBe(1); // Initialized session
  });

  // Cache Persistence
  it('should persist metrics in localStorage', () => {
    const result = updateStreak('SESSION_START');

    const cachedMetrics = JSON.parse(localStorage.getItem('streakMetrics') || '{}');
    expect(cachedMetrics).toEqual(result);
  });
});