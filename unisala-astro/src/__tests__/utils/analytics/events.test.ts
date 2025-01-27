import { updateStreak } from '@/utils/metrics/streakMetrics';
import { beforeEach, describe, it, expect } from 'vitest';

describe('Streak Metrics', () => {
  beforeEach(() => {
    localStorage.removeItem('streakMetrics');
  });

  // Constants
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const NOW = new Date().getTime();

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
    const yesterdayTimestamp = NOW - DAY_IN_MS;
    const previousMetrics = {
      lastVisit: yesterdayTimestamp,
      currentStreak: 1,
      longestStreak: 1,
      startTime: yesterdayTimestamp,
      lastActiveTime: yesterdayTimestamp,
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
    const twoDaysAgoTimestamp = NOW - (2 * DAY_IN_MS);
    const previousMetrics = {
      lastVisit: twoDaysAgoTimestamp,
      currentStreak: 3,
      longestStreak: 3,
      startTime: twoDaysAgoTimestamp,
      lastActiveTime: twoDaysAgoTimestamp,
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
    const todayTimestamp = NOW;
    const previousMetrics = {
      lastVisit: todayTimestamp,
      currentStreak: 2,
      longestStreak: 2,
      startTime: todayTimestamp,
      lastActiveTime: todayTimestamp,
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
});
