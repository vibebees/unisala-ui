import { useState, useEffect, useRef } from "react";
import { getCache, setCache } from "@/utils/cache";

interface EditorMetrics {
  maxWpm: number;
  totalWordCount: number;
  totalLines: number;
  totalActiveTime: number;
  totalIdleTime: number;
  productivityByHour: Record<string, number>;
  sessions: Array<{
    sessionStart: number;
    sessionEnd: number;
    wordCount: number;
    characterCount: number;
    typingSpeed: number;
    activeTime: number;
    idleTime: number;
    maxTypingSpeed: number;
    focusDuration: number;
  }>;
}

interface Metrics {
  wordCount: number;
  characterCount: number;
  typingSpeed: number;
  isIdle: boolean;
  maxTypingSpeed: number;
  activeTime: number;
  idleTime: number;
}

interface Session {
  sessionStart: number;
  sessionEnd: number;
  wordCount: number;
  characterCount: number;
  typingSpeed: number;
  maxTypingSpeed: number;
  activeTime: number;
}

function calculateDraftMetrics(sessions: Session[]): Metrics {
  if (!sessions.length) {
    return {
      wordCount: 0,
      characterCount: 0,
      typingSpeed: 0,
      isIdle: true,
      maxTypingSpeed: 0,
      activeTime: 0,
      idleTime: 0
    };
  }

  const now = Date.now();
  const latestSession = sessions[sessions.length - 1];
  
  // Calculate continuous metrics
  const metrics: Metrics = {
    // Latest counts
    wordCount: latestSession.wordCount,
    characterCount: latestSession.characterCount,
    
    // Typing speed with smoothing
    typingSpeed: calculateSmoothedWPM(sessions),
    
    // Idle state with proper timeout
    isIdle: (now - latestSession.sessionEnd) > 3000,
    
    // Max speed with outlier filtering
    maxTypingSpeed: calculateMaxWPM(sessions),
    
    // Cumulative time tracking
    activeTime: sessions.reduce((total, session) => {
      return total + (session.activeTime || 0);
    }, 0),
    
    // Proper idle time tracking
    idleTime: sessions.reduce((total, session, index) => {
      if (index === 0) return 0;
      const prevSession = sessions[index - 1];
      const betweenSessions = (session.sessionStart - prevSession.sessionEnd) / 1000;
      return total + betweenSessions + (session.idleTime || 0);
    }, 0)
  };

  return metrics;
}

// Helper functions
function calculateSmoothedWPM(sessions: Session[]): number {
  const recentSessions = sessions.slice(-5); // Look at last 5 sessions
  if (recentSessions.length === 0) return 0;
  
  const totalWords = recentSessions[recentSessions.length - 1].wordCount - 
                    recentSessions[0].wordCount;
  const totalMinutes = (recentSessions[recentSessions.length - 1].sessionEnd - 
                       recentSessions[0].sessionStart) / 60000;
  
  return Math.round(totalWords / totalMinutes) || 0;
}

function calculateMaxWPM(sessions: Session[]): number {
  const speeds = sessions.map(s => s.typingSpeed).filter(speed => speed > 0);
  if (speeds.length === 0) return 0;
  
  // Filter out obvious outliers (more than 2 standard deviations)
  const mean = speeds.reduce((a, b) => a + b) / speeds.length;
  const stdDev = Math.sqrt(speeds.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / speeds.length);
  const validSpeeds = speeds.filter(speed => Math.abs(speed - mean) <= 2 * stdDev);
  
  return Math.max(...validSpeeds);
}

const EditorAnalytics = (content: string) => {
  // Local state just for UI updates
  const [metrics, setMetrics] = useState({
    wordCount: 0,
    characterCount: 0,
    typingSpeed: 0,
    isIdle: false,
    maxTypingSpeed: 0,
    activeTime: 0,
    idleTime: 0
  });

  // Single session tracking
  const session = useRef({
    startTime: Date.now(),
    lastUpdate: Date.now(),
    lastContent: content,
    words: 0,
    chars: 0,
    wpm: 0,
    peakWpm: 0,
    activeTime: 0,
    idleTime: 0,
    changes: 0
  });

  const draftId = window.location.search.split("id=")[1];

  // Calculate current metrics
  const updateMetrics = () => {
    const now = Date.now();
    const timeSinceUpdate = (now - session.current.lastUpdate) / 1000; // seconds
    const isIdle = timeSinceUpdate > 2; // 2 second idle threshold

    // Only process if content changed
    if (content !== session.current.lastContent) {
      const div = document.createElement('div');
      div.innerHTML = content;
      const text = div.textContent || div.innerText || '';
      
      const currentWords = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      const currentChars = text.length;
      
      // Calculate WPM only if actively typing
      const elapsedMinutes = (now - session.current.startTime) / 60000;
      const currentWpm = Math.round((currentWords - session.current.words) / elapsedMinutes) || 0;

      session.current = {
        ...session.current,
        lastContent: content,
        lastUpdate: now,
        words: currentWords,
        chars: currentChars,
        wpm: currentWpm,
        peakWpm: Math.max(session.current.peakWpm, currentWpm),
        activeTime: session.current.activeTime + (isIdle ? 0 : timeSinceUpdate),
        idleTime: session.current.idleTime + (isIdle ? timeSinceUpdate : 0),
        changes: session.current.changes + 1
      };

      // Update UI metrics
      setMetrics({
        wordCount: currentWords,
        characterCount: currentChars,
        typingSpeed: currentWpm,
        isIdle,
        maxTypingSpeed: session.current.peakWpm,
        activeTime: Math.round(session.current.activeTime),
        idleTime: Math.round(session.current.idleTime)
      });

      // Save only on significant changes
      if (session.current.changes >= 20) { // Save after 20 changes
        const stats: EditorMetrics = getCache(draftId) || {
          maxWpm: 0,
          totalWordCount: 0,
          totalLines: 0,
          totalActiveTime: 0,
          totalIdleTime: 0,
          productivityByHour: {},
          sessions: []
        };

        // Create new session
        stats.sessions.push({
          sessionStart: session.current.startTime,
          sessionEnd: now,
          wordCount: currentWords,
          characterCount: currentChars,
          typingSpeed: currentWpm,
          activeTime: Math.round(session.current.activeTime),
          idleTime: Math.round(session.current.idleTime),
          maxTypingSpeed: session.current.peakWpm,
          focusDuration: Math.round(session.current.activeTime)
        });

        // Update stats
        stats.maxWpm = Math.max(stats.maxWpm, session.current.peakWpm);
        stats.totalWordCount = currentWords;
        stats.totalLines = content.split("\n").length;
        stats.totalActiveTime += Math.round(session.current.activeTime);
        stats.totalIdleTime += Math.round(session.current.idleTime);

        const hour = new Date().getHours().toString();
        stats.productivityByHour[hour] = (stats.productivityByHour[hour] || 0) + currentWords;

        setCache(draftId, stats);

        // Reset session
        session.current = {
          startTime: now,
          lastUpdate: now,
          lastContent: content,
          words: currentWords,
          chars: currentChars,
          wpm: 0,
          peakWpm: 0,
          activeTime: 0,
          idleTime: 0,
          changes: 0
        };
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateMetrics, 1000);
    return () => {
      clearInterval(interval);
      updateMetrics(); // Final update
    };
  }, [content]);

  const resetIdleTimer = () => {
    session.current.lastUpdate = Date.now();
  };

  return {
    metrics: calculateDraftMetrics((getCache(draftId) as EditorMetrics)?.sessions || []),
    resetIdleTimer
  };
};

export default EditorAnalytics;