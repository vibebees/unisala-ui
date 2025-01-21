import { useEffect, useRef, useState } from 'react';
import { getCache, setCache } from "@/utils/cache";
import { debounce } from 'lodash';
import { RefObject } from 'react';
import ReactQuill from 'react-quill';

interface EditorConfig {
  saveInterval?: number;
  idleTimeout?: number;
  wpmSampleInterval?: number;
}

interface WordSample {
  timestamp: number;
  wordCount: number;
}

interface DraftMetrics {
  totalWords: number;
  totalFocusTime: number;
  totalIdleTime: number;
  totalSessionTime: number;
  maxWpmEver: number;
  lastModified: number;
}

interface GlobalMetrics {
  totalWordsWritten: number;
  totalFocusTime: number;
  totalIdleTime: number;
  highestWpmEver: number;
  firstSessionDate: number;
  lastSessionDate: number;
  consecutiveDays: number;
  longestStreak: number;
}

const DEFAULT_CONFIG = {
  saveInterval: 3000,
  idleTimeout: 10000,     // 2 minutes until idle
  wpmSampleInterval: 5000
};

const METRICS_STORE_KEY = 'editorMetrics';
const IDLE_UPDATE_INTERVAL = 10000; // Update idle metrics every 10 seconds

const useEditorAnalytics = (editorRef: RefObject<ReactQuill>, config: EditorConfig = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // State for UI updates
  const [wordCount, setWordCount] = useState(0);
  const [currentWpm, setCurrentWpm] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [activeTime, setActiveTime] = useState(0);

  // Refs for continuous tracking
  const sessionStart = useRef(Date.now());
  const lastActive = useRef(Date.now());
  const idleStart = useRef<number | null>(null);
  const totalIdleTime = useRef(0);
  const wordSamples = useRef<WordSample[]>([]);
  const lastWordCount = useRef(0);
  const maxWpm = useRef(0);
  const wpmInterval = useRef<NodeJS.Timeout | null>(null);
  const idleUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  const getDraftId = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || window.location.pathname || Date.now().toString();
  };

  const calculateWPM = (samples: WordSample[]): number => {
    if (samples.length < 2) return 0;
    
    const wordDelta = samples[samples.length - 1].wordCount - samples[0].wordCount;
    const timeDelta = (samples[samples.length - 1].timestamp - samples[0].timestamp) / 1000 / 60;
    
    return timeDelta <= 0 ? 0 : Math.round(wordDelta / timeDelta);
  };

  const updateWPM = () => {
    const quill = editorRef.current?.getEditor();
    if (!quill || isIdle) return;

    const now = Date.now();
    const text = quill.getText();
    const newWordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    wordSamples.current.push({
      timestamp: now,
      wordCount: newWordCount
    });
    
    const thirtySecondsAgo = now - 30000;
    wordSamples.current = wordSamples.current.filter(s => s.timestamp > thirtySecondsAgo);
    
    if (wordSamples.current.length >= 2) {
      const wpm = calculateWPM(wordSamples.current);
      setCurrentWpm(wpm);
      if (wpm > 0) {
        maxWpm.current = Math.max(maxWpm.current, wpm);
      }
    }
    
    lastWordCount.current = newWordCount;
  };

  const startIdleUpdates = () => {
    // Clear any existing interval
    if (idleUpdateInterval.current) {
      clearInterval(idleUpdateInterval.current);
    }
    
    // Start new interval to update metrics while idle
    idleUpdateInterval.current = setInterval(() => {
      updateMetrics(true);
    }, IDLE_UPDATE_INTERVAL);
  };

  const stopIdleUpdates = () => {
    if (idleUpdateInterval.current) {
      clearInterval(idleUpdateInterval.current);
      idleUpdateInterval.current = null;
    }
  };

  const handleIdle = () => {
    if (!isIdle) {
      setIsIdle(true);
      idleStart.current = Date.now();
      
      // Clear WPM samples when going idle
      wordSamples.current = [];
      setCurrentWpm(0);
      
      // Start periodic updates while idle
      startIdleUpdates();
      
      // Save current state when going idle
      updateMetrics(true);
    }
  };

  const handleActive = () => {
    if (isIdle && idleStart.current) {
      setIsIdle(false);
      
      // Stop idle updates
      stopIdleUpdates();
      
      const now = Date.now();
      const idleDuration = now - idleStart.current;
      
      // Only count idle time if it's over the threshold
      if (idleDuration > finalConfig.idleTimeout) {
        totalIdleTime.current += idleDuration;
      }
      
      idleStart.current = null;
      lastActive.current = now;
      
      // Clear word samples after idle period
      wordSamples.current = [];
      
      // Force a metrics update when returning from idle
      updateMetrics(true);
    }
  };

  const updateMetrics = (isIdleTransition: boolean = false) => {
    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    try {
      const text = quill.getText();
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const newWordCount = words.length;
      
      setWordCount(newWordCount);

      const now = Date.now();
      
      // Calculate current idle time if we're in an idle state
      const currentIdleTime = (isIdle && idleStart.current) ? (now - idleStart.current) : 0;
      
      // Only include current idle time if it's over the threshold
      const validCurrentIdleTime = currentIdleTime > finalConfig.idleTimeout ? currentIdleTime : 0;
      
      // Total time since session start
      const totalSessionTime = now - sessionStart.current;
      
      // Total idle time is accumulated idle time plus current idle period if valid
      const actualIdleTime = totalIdleTime.current + validCurrentIdleTime;
      
      // Focus time is total session time minus idle time
      const focusTime = Math.max(0, totalSessionTime - actualIdleTime);
      
      setActiveTime(Math.floor(focusTime / 1000));

      // Save to storage
      const metricsStore = loadMetrics();
      const draftId = getDraftId();
      
      if (!metricsStore.drafts[draftId]) {
        metricsStore.drafts[draftId] = {
          totalWords: 0,
          totalFocusTime: 0,
          totalIdleTime: 0,
          totalSessionTime: 0,
          maxWpmEver: 0,
          lastModified: now
        };
      }

      const draft = metricsStore.drafts[draftId];
      const oldWordCount = draft.totalWords;

      // Update draft metrics
      draft.totalWords = newWordCount;
      draft.maxWpmEver = Math.max(draft.maxWpmEver, maxWpm.current);
      draft.totalSessionTime = totalSessionTime;
      draft.totalIdleTime = actualIdleTime;
      draft.totalFocusTime = focusTime;
      draft.lastModified = now;

      // Update global metrics
      if (newWordCount > oldWordCount) {
        metricsStore.global.totalWordsWritten += (newWordCount - oldWordCount);
      }
      metricsStore.global.highestWpmEver = Math.max(
        metricsStore.global.highestWpmEver,
        maxWpm.current
      );
      metricsStore.global.totalFocusTime += focusTime;
      metricsStore.global.totalIdleTime += actualIdleTime;
      metricsStore.global.lastSessionDate = now;

      // Update streak if saving due to idle or significant changes
      if (isIdleTransition || newWordCount !== oldWordCount) {
        const lastDate = new Date(metricsStore.global.lastSessionDate).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        if (lastDate < today) {
          metricsStore.global.consecutiveDays++;
          metricsStore.global.longestStreak = Math.max(
            metricsStore.global.longestStreak,
            metricsStore.global.consecutiveDays
          );
        }
      }

      saveMetrics(metricsStore);
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  };

  // Setup effects
  useEffect(() => {
    const debouncedUpdate = debounce(() => updateMetrics(false), finalConfig.saveInterval);
    const quill = editorRef.current?.getEditor();
    
    if (quill) {
      quill.on('text-change', debouncedUpdate);
      
      // Start WPM sampling interval
      wpmInterval.current = setInterval(updateWPM, finalConfig.wpmSampleInterval);
      
      return () => {
        quill.off('text-change', debouncedUpdate);
        debouncedUpdate.cancel();
        if (wpmInterval.current) {
          clearInterval(wpmInterval.current);
        }
        stopIdleUpdates();
        updateMetrics(true); // Final update on unmount
      };
    }
  }, [editorRef.current]);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      handleActive();
      idleTimer = setTimeout(handleIdle, finalConfig.idleTimeout);
    };

    const events = ['mousedown', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => document.addEventListener(event, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach(event => document.removeEventListener(event, resetIdleTimer));
      clearTimeout(idleTimer);
      stopIdleUpdates();
    };
  }, []);

  // Initial setup
  useEffect(() => {
    const draftId = getDraftId();
    const metricsStore = loadMetrics();
    
    if (!metricsStore.drafts[draftId]) {
      metricsStore.drafts[draftId] = {
        totalWords: 0,
        totalFocusTime: 0,
        totalIdleTime: 0,
        totalSessionTime: 0,
        maxWpmEver: 0,
        lastModified: Date.now()
      };
      saveMetrics(metricsStore);
    }

    updateMetrics(false);
  }, []);

  const loadMetrics = () => {
    const savedMetrics = getCache(METRICS_STORE_KEY);
    if (savedMetrics && typeof savedMetrics === 'object') {
      return savedMetrics as { drafts: Record<string, DraftMetrics>; global: GlobalMetrics };
    }

    return {
      drafts: {},
      global: {
        totalWordsWritten: 0,
        totalFocusTime: 0,
        totalIdleTime: 0,
        highestWpmEver: 0,
        firstSessionDate: Date.now(),
        lastSessionDate: Date.now(),
        consecutiveDays: 1,
        longestStreak: 1
      }
    };
  };

  const saveMetrics = (metrics: { drafts: Record<string, DraftMetrics>; global: GlobalMetrics }) => {
    setCache(METRICS_STORE_KEY, metrics);
  };

  return {
    wordCount,
    currentWpm,
    maxWpm: maxWpm.current,
    activeTime,
    isIdle,
    draft: loadMetrics().drafts[getDraftId()],
    global: loadMetrics().global
  };
};

export default useEditorAnalytics;