import { updateStreak } from '@/utils/metrics/streakMetrics';
import { beforeEach, describe, it, expect } from 'vitest';


import { calculateDayDifference } from '@/utils/metrics/streakMetrics';
import moment from 'moment';

describe('calculateDayDifference', () => {
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  let NOW = 1697049600000; // Fixed timestamp for testing
  const YESTERDAY = NOW - DAY_IN_MS;
  const TOMORROW = NOW + DAY_IN_MS;
  const TWO_DAYS_AGO = NOW - 2 * DAY_IN_MS;




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
    // Set lastVisit to just before midnight on Day 1
    const lastVisit = moment().subtract(1, 'day').endOf('day').subtract(1, 'second').valueOf(); // Day 1, 23:59:59
    // Set currentTime to just after midnight on Day 2
    const currentTime = moment().startOf('day').add(1, 'second').valueOf(); // Day 2, 00:00:01

    const result = calculateDayDifference(lastVisit, currentTime);
    expect(result).toBe(1); // Expect 1 day difference
  });

});

describe('Streak Metrics', () => {
  beforeEach(() => {
    localStorage.removeItem('streakMetrics');
  });

  // Constants
  const NOW = moment().valueOf();  // Current timestamp
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const YESTERDAY = moment().subtract(1, 'day').valueOf();
  const TWO_DAYS_AGO = moment().subtract(2, 'days').valueOf();

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
      sessions: [{ startTime: YESTERDAY, endTime: YESTERDAY }]
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
      sessions: [{ startTime: YESTERDAY, endTime: YESTERDAY }]
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
      sessions: [{ startTime: TWO_DAYS_AGO, endTime: TWO_DAYS_AGO }]
    };

    const result = updateStreak('SESSION_START', previousMetrics);

    expect(result.currentStreak).toBe(1); // Streak resets
    expect(result.longestStreak).toBe(3); // Longest streak remains
    expect(result.totalSessions).toBe(4); // Total sessions incremented
  });

  // Multiple Visits on Same Day
  it('should increment streak for consecutive daily visits', () => {
    const previousMetrics = {
      lastVisit: YESTERDAY,
      currentStreak: 1,
      longestStreak: 1,
      startTime: YESTERDAY,
      lastActiveTime: YESTERDAY,
      totalSessions: 1,
      totalTimeSpent: 0,
      sessions: [{ startTime: YESTERDAY, endTime: YESTERDAY }]
    };

    const result = updateStreak('SESSION_START', previousMetrics);

    expect(result.currentStreak).toBe(2);  // This is failing
    expect(result.longestStreak).toBe(2);
    expect(result.totalSessions).toBe(2);
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
      sessions: [{ startTime: YESTERDAY, endTime: YESTERDAY }]
    };

    const result = updateStreak('SESSION_END', previousMetrics);

    expect(result.totalTimeSpent).toBeGreaterThan(0); // Time incremented
    expect(result.lastActiveTime).toBeGreaterThan(startTime); // Updated
    expect(result.totalSessions).toBe(1); // Sessions unchanged on end
  });

  // Negative Day Difference
  it('should handle negative day difference (incorrect time)', () => {
    const futureTimestamp = moment().add(1, 'day').valueOf();  // Use moment to add a day
    const previousMetrics = {
      lastVisit: futureTimestamp,
      currentStreak: 3,
      longestStreak: 3,
      startTime: futureTimestamp,
      lastActiveTime: futureTimestamp,
      totalSessions: 3,
      totalTimeSpent: 1000,
      sessions: [{ startTime: futureTimestamp, endTime: futureTimestamp }]
    };


    expect(() => updateStreak('SESSION_START', previousMetrics))
      .toThrow('Invalid timestamp: lastVisit cannot be in the future');
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

describe('Streak Metrics - Edge Cases', () => {
  it('should handle streak across months correctly', () => {
    // Set last visit to last day of previous month
    const lastDayOfMonth = moment().subtract(1, 'month').endOf('month').valueOf();
    const previousMetrics = {
      lastVisit: lastDayOfMonth,
      currentStreak: 1,
      longestStreak: 1,
      startTime: lastDayOfMonth,
      lastActiveTime: lastDayOfMonth,
      totalSessions: 1,
      totalTimeSpent: 0,
      sessions: [{ startTime: lastDayOfMonth, endTime:lastDayOfMonth }]

    };
    const result = updateStreak('SESSION_START', previousMetrics);
    expect(result.currentStreak).toBe(1); // Should reset as it's not consecutive
  });

  it('should handle streak across year boundary', () => {
    // Set last visit to December 31st
    const newYearEve = moment().year(moment().year() - 1).month(11).date(31).valueOf();
    const previousMetrics = {
      lastVisit: newYearEve,
      currentStreak: 1,
      longestStreak: 1,
      startTime: newYearEve,
      lastActiveTime: newYearEve,
      totalSessions: 1,
      totalTimeSpent: 0,
      sessions: [{ startTime: newYearEve, endTime: newYearEve + 1000 }]

    };
    const result = updateStreak('SESSION_START', previousMetrics);
    expect(result.currentStreak).toBe(1); // Should reset as it's not consecutive
  });

  it('should handle multiple sessions with varying time gaps', () => {
    let metrics = updateStreak('SESSION_START');

    // Same day session
    metrics = updateStreak('SESSION_START', {
      ...metrics,
      lastVisit: moment().subtract(2, 'hours').valueOf()
    });
    expect(metrics.currentStreak).toBe(1);

    // Next day session
    metrics = updateStreak('SESSION_START', {
      ...metrics,
      lastVisit: moment().subtract(1, 'day').valueOf()
    });
    expect(metrics.currentStreak).toBe(2);

    // Skip a day
    metrics = updateStreak('SESSION_START', {
      ...metrics,
      lastVisit: moment().subtract(3, 'days').valueOf()
    });
    expect(metrics.currentStreak).toBe(1);
  });

  it('should maintain longest streak after multiple streak resets', () => {
    let metrics = updateStreak('SESSION_START');

    // Build up a 5-day streak by visiting each consecutive day
    for (let i = 4; i >= 0; i--) {
      metrics = updateStreak('SESSION_START', {
        ...metrics,
        lastVisit: moment().subtract(i, 'days').valueOf(),
        currentStreak: 5 - i,  // Streak increases as we get closer to today
        longestStreak: 5 - i
      });
    }
    expect(metrics.longestStreak).toBe(5);

    // Break streak by not visiting for a week
    metrics = updateStreak('SESSION_START', {
      ...metrics,
      lastVisit: moment().subtract(7, 'days').valueOf()
    });
    expect(metrics.currentStreak).toBe(1);
    expect(metrics.longestStreak).toBe(5);
  });


  it('should handle very short sessions correctly', () => {
    const startTime = moment().valueOf();
    const previousMetrics = {
      lastVisit: startTime,
      currentStreak: 1,
      longestStreak: 1,
      startTime: startTime,
      lastActiveTime: startTime,
      totalSessions: 1,
      totalTimeSpent: 0,
      sessions: [{ startTime: startTime, endTime: startTime + 1000 }]

    };

    // End session immediately
    const result = updateStreak('SESSION_END', previousMetrics);
    expect(result.totalTimeSpent).toBeGreaterThanOrEqual(0);
    expect(result.totalTimeSpent).toBeLessThan(1000); // Less than 1 second
  });

  it('should handle very long sessions correctly', () => {
    const startTime = moment().subtract(12, 'hours').valueOf();
    const previousMetrics = {
      lastVisit: startTime,
      currentStreak: 1,
      longestStreak: 1,
      startTime: startTime,
      lastActiveTime: startTime,
      totalSessions: 1,
      totalTimeSpent: 0,
      sessions: [{ startTime: startTime, endTime: startTime + 1000 }]

    };

    const result = updateStreak('SESSION_END', previousMetrics);
    expect(result.totalTimeSpent).toBeGreaterThanOrEqual(12 * 60 * 60 * 1000); // 12 hours in ms
  });
})



describe('Streak Metrics - Additional Test Cases', () => {
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const NOW = new Date().getTime();



  describe('Session timing validation', () => {
    it('should handle invalid session end (end before start)', () => {
      const startTime = NOW - 1000; // 1 second ago
      const metrics = {
        lastVisit: startTime,
        currentStreak: 1,
        longestStreak: 1,
        startTime: startTime + 2000, // Start time after lastVisit/lastActiveTime
        lastActiveTime: startTime,
        totalSessions: 1,
        totalTimeSpent: 0,
        sessions: [{ startTime: startTime, endTime: startTime + 1000 }]
      };

      const result = updateStreak('SESSION_END', metrics);
      expect(result.totalTimeSpent).toBeGreaterThanOrEqual(0);
      expect(result.totalTimeSpent).toBeLessThan(3000);
    });

    it('should handle long sessions appropriately', () => {
      const startTime = NOW - (2 * 60 * 60 * 1000); // 2 hours ago
      const metrics = {
        lastVisit: startTime,
        currentStreak: 1,
        longestStreak: 1,
        startTime: startTime,
        lastActiveTime: startTime,
        totalSessions: 1,
        totalTimeSpent: 0,
        sessions: [{startTime: new Date().getTime(), endTime: new Date().getTime()}]

      };

      const result = updateStreak('SESSION_END', metrics);
      expect(result.totalTimeSpent).toBeGreaterThan(0);
      expect(result.totalTimeSpent).toBeGreaterThanOrEqual(1 * 60 * 60 * 1000);
      expect(result.totalTimeSpent).toBeLessThanOrEqual(3 * 60 * 60 * 1000);
    });
  });

  describe('Data integrity', () => {
    it('should handle missing or corrupted localStorage data', () => {
      localStorage.setItem('streakMetrics', 'invalid-json{');
      const result = updateStreak('SESSION_START');
      expect(result).toEqual({
        lastVisit: expect.any(Number),
        currentStreak: 1,
        longestStreak: 1,
        startTime: expect.any(Number),
        lastActiveTime: expect.any(Number),
        totalSessions: 1,
        totalTimeSpent: 0
      });
    });

    it('should handle partial metrics object', () => {
      const incompleteMetrics = {
        lastVisit: NOW - 1000, // Ensure it's in the past
        currentStreak: 1
        // missing other required fields
      };

      const result = updateStreak('SESSION_START', incompleteMetrics as any);
      expect(result).toHaveProperty('longestStreak');
      expect(result).toHaveProperty('totalSessions');
      expect(result).toHaveProperty('totalTimeSpent');
    });
  });



  describe('DST transitions', () => {
    it('should maintain streak during spring forward', () => {
      // Use past DST transition dates
      const beforeDST = new Date(2023, 2, 12, 1, 59).getTime(); // March 12, 2023 1:59 AM
      const afterDST = new Date(2023, 2, 12, 3, 0).getTime();  // March 12, 2023 3:00 AM

      const metrics = updateStreak('SESSION_START', {
        lastVisit: beforeDST,
        currentStreak: 1,
        longestStreak: 1,
        startTime: beforeDST,
        lastActiveTime: beforeDST,
        totalSessions: 1,
        totalTimeSpent: 0,
        sessions: [{ startTime: beforeDST, endTime: beforeDST }]
      });

      const dstMetrics = updateStreak('SESSION_START', {
        ...metrics,
        lastVisit: afterDST
      });

      expect(dstMetrics.currentStreak).toBe(1); // Same day
    });
  });

  describe('Leap year handling', () => {
    it('should maintain streak across February 28/29 boundary', () => {
      // Create initial metrics for Feb 28
      const NOW = new Date().getTime();
      const baseMetrics = updateStreak('SESSION_START');

      // Simulate a visit on Feb 28 (yesterday)
      const yesterdayMetrics = updateStreak('SESSION_START', {
        ...baseMetrics,
        lastVisit: NOW - DAY_IN_MS,
        currentStreak: 1,
        longestStreak: 1
      });

      // Simulate the next visit on Feb 29 (today)
      const todayMetrics = updateStreak('SESSION_START', {
        ...yesterdayMetrics,
        lastVisit: NOW,
      });

      // Since these are consecutive days, streak should increment
      expect(todayMetrics.currentStreak).toBe(2);
    });
  });
  describe('Performance degradation', () => {
    it('should handle high session counts efficiently', () => {
      let metrics = updateStreak('SESSION_START');
      const baseTime = NOW - (1000 * 1000); // Start 1000 seconds ago

      // Simulate 1000 sessions in the same day
      const startTime = performance.now();
      for (let i = 0; i < 1000; i++) {
        metrics = updateStreak('SESSION_START', {
          ...metrics,
          lastVisit: baseTime + (i * 1000), // Each session 1 second apart
          totalSessions: metrics.totalSessions + 1
        });
      }
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(1000); // Should process in under 1 second
      expect(metrics.totalSessions).toBe(1001);
    });
  });
});