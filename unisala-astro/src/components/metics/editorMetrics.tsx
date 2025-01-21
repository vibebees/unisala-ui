import { useEffect, useRef, useState } from 'react';
import { getCache, setCache } from "@/utils/cache";
import { debounce } from 'lodash';
import { RefObject } from 'react';
import ReactQuill from 'react-quill';

interface EditorConfig {
  saveInterval?: number;
  idleTimeout?: number;
}

interface SessionMetrics {
  startTime: number;
  endTime: number;
  wordsWritten: number;
  currentWpm: number;
  maxWpm: number;
  focusTime: number;
  idleTime: number;
}

interface DraftMetrics {
  totalWords: number;
  totalFocusTime: number;
  totalIdleTime: number;
  maxWpmEver: number;
  sessions: SessionMetrics[];
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

interface MetricsStore {
  drafts: {
    [timestamp: string]: DraftMetrics;
  };
  global: GlobalMetrics;
}

const METRICS_STORE_KEY = 'editorMetrics';

const DEFAULT_CONFIG = {
  saveInterval: 3000,   // Save every 3 seconds
  idleTimeout: 120000,  // 2 minutes until idle
};

const useEditorAnalytics = (editorRef: RefObject<ReactQuill>, config: EditorConfig = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const [isIdle, setIsIdle] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [maxTypingSpeed, setMaxTypingSpeed] = useState(0);
  const [activeTime, setActiveTime] = useState(0);

  const sessionStartTime = useRef(Date.now());
  const lastActiveTime = useRef(Date.now());
  const idleStartTime = useRef<number | null>(null);
  const totalIdleTime = useRef(0);
  const currentSession = useRef<SessionMetrics>({
    startTime: Date.now(),
    endTime: Date.now(),
    wordsWritten: 0,
    currentWpm: 0,
    maxWpm: 0,
    focusTime: 0,
    idleTime: 0
  });

  const getDraftId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || Date.now().toString();
  };

  const loadMetrics = (): MetricsStore => {
    const savedMetrics = getCache(METRICS_STORE_KEY);
    if (savedMetrics && typeof savedMetrics === 'object') {
      return savedMetrics;
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

  const createNewDraftMetrics = (): DraftMetrics => ({
    totalWords: 0,
    totalFocusTime: 0,
    totalIdleTime: 0,
    maxWpmEver: 0,
    sessions: [],
    lastModified: Date.now()
  });

  const saveMetrics = (store: MetricsStore) => {
    setCache(METRICS_STORE_KEY, store);
  };

  const calculateWPM = (words: number) => {
    const timeElapsed = (Date.now() - sessionStartTime.current - totalIdleTime.current) / 1000 / 60;
    return timeElapsed > 0 ? Math.round(words / timeElapsed) : 0;
  };

  const updateMetrics = () => {
    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    try {
      const text = quill.getText();
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const newWordCount = words.length;
      const wpm = calculateWPM(newWordCount);

      setWordCount(newWordCount);
      setTypingSpeed(wpm);
      if (wpm > maxTypingSpeed) {
        setMaxTypingSpeed(wpm);
      }

      const metricsStore = loadMetrics();
      const draftId = getDraftId();

      if (!metricsStore.drafts[draftId]) {
        metricsStore.drafts[draftId] = createNewDraftMetrics();
      }

      const draft = metricsStore.drafts[draftId];
      const oldWordCount = draft.totalWords;

      // Update draft metrics
      draft.totalWords = newWordCount;
      draft.maxWpmEver = Math.max(draft.maxWpmEver, wpm);
      draft.lastModified = Date.now();

      // Update session metrics
      currentSession.current = {
        ...currentSession.current,
        wordsWritten: newWordCount,
        currentWpm: wpm,
        maxWpm: Math.max(currentSession.current.maxWpm, wpm),
        endTime: Date.now()
      };

      // Update focus/idle time
      if (!isIdle) {
        const focusTime = Math.floor((Date.now() - sessionStartTime.current - totalIdleTime.current) / 1000);
        draft.totalFocusTime = focusTime * 1000;
        currentSession.current.focusTime = focusTime;
        setActiveTime(focusTime);
      }

      // Update global metrics
      metricsStore.global.totalWordsWritten += (newWordCount - oldWordCount);
      metricsStore.global.highestWpmEver = Math.max(metricsStore.global.highestWpmEver, wpm);
      metricsStore.global.lastSessionDate = Date.now();

      // Update streak
      const lastDate = new Date(metricsStore.global.lastSessionDate).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      
      if (lastDate < today) {
        metricsStore.global.consecutiveDays++;
        metricsStore.global.longestStreak = Math.max(
          metricsStore.global.longestStreak,
          metricsStore.global.consecutiveDays
        );
      }

      saveMetrics(metricsStore);
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  };

  const debouncedUpdateMetrics = debounce(updateMetrics, finalConfig.saveInterval);

  const handleIdle = () => {
    if (!isIdle) {
      setIsIdle(true);
      idleStartTime.current = Date.now();
      
      const metricsStore = loadMetrics();
      const draftId = getDraftId();
      const draft = metricsStore.drafts[draftId];
      
      if (draft) {
        const idleTime = Date.now() - (lastActiveTime.current || Date.now());
        draft.totalIdleTime += idleTime;
        currentSession.current.idleTime += idleTime;
        saveMetrics(metricsStore);
      }
    }
  };

  const handleActive = () => {
    if (isIdle) {
      setIsIdle(false);
      if (idleStartTime.current) {
        totalIdleTime.current += Date.now() - idleStartTime.current;
        idleStartTime.current = null;
      }
    }
    lastActiveTime.current = Date.now();
  };

  // Initialize metrics
  useEffect(() => {
    const draftId = getDraftId();
    const metricsStore = loadMetrics();
    
    if (!metricsStore.drafts[draftId]) {
      metricsStore.drafts[draftId] = createNewDraftMetrics();
      saveMetrics(metricsStore);
    }

    // Initial metrics update
    updateMetrics();
  }, []);

  // Monitor text changes
  useEffect(() => {
    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    // Using Quill's built-in text-change event
    quill.on('text-change', debouncedUpdateMetrics);
    
    return () => {
      quill.off('text-change', debouncedUpdateMetrics);
    };
  }, [editorRef.current]);

  // Set up idle detection
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      handleActive();
      idleTimer = setTimeout(handleIdle, finalConfig.idleTimeout);
    };

    const events = ['mousedown', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer);
      });
      clearTimeout(idleTimer);
    };
  }, []);

  // Save final session data on unmount
  useEffect(() => {
    return () => {
      const metricsStore = loadMetrics();
      const draftId = getDraftId();
      
      if (metricsStore.drafts[draftId]) {
        currentSession.current.endTime = Date.now();
        metricsStore.drafts[draftId].sessions.push(currentSession.current);
        saveMetrics(metricsStore);
      }
    };
  }, []);

  return {
    wordCount,
    typingSpeed,
    maxTypingSpeed,
    activeTime,
    isIdle,
    currentDraft: loadMetrics().drafts[getDraftId()],
    global: loadMetrics().global
  };
};

export default useEditorAnalytics;