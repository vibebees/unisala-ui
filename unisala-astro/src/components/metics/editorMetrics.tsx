import { useEffect, useRef, useState } from 'react';
import { getCache, setCache } from "@/utils/cache";
import { debounce } from 'lodash';
import { RefObject } from 'react';
import ReactQuill from 'react-quill';

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

const METRICS_STORE_KEY = 'editorMetrics';
const WPM_SAMPLE_INTERVAL = 5000;
const WPM_WINDOW_SIZE = 30000;
const IDLE_THRESHOLD = 30000; // 30 seconds


const useEditorAnalytics = (editorRef: RefObject<ReactQuill>) => {
  const [wordCount, setWordCount] = useState(0);
  const [currentWpm, setCurrentWpm] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);
  
  const sessionStart = useRef(Date.now());
  const wordSamples = useRef<WordSample[]>([]);
  const lastWordCount = useRef(0);
  const maxWpm = useRef(0);
  const wpmInterval = useRef<NodeJS.Timeout | null>(null);
  const lastActivity = useRef(Date.now());
  const totalIdleTime = useRef(0);

  const getDraftId = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || window.location.pathname || Date.now().toString();
  };

  const handleVisibilityChange = () => {
    const isVisible = !document.hidden;
    setIsTabActive(isVisible);
    updateMetrics();
  };

  const handleEditorActivity = debounce(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity.current;
    
    if (timeSinceLastActivity >= IDLE_THRESHOLD) {
      totalIdleTime.current += timeSinceLastActivity;
    }
    
    lastActivity.current = now;
    updateMetrics();
  }, 100);

  const calculateWPM = (samples: WordSample[]): number => {
    if (samples.length < 2) return 0;
    
    const wordDelta = samples[samples.length - 1].wordCount - samples[0].wordCount;
    const timeDelta = (samples[samples.length - 1].timestamp - samples[0].timestamp) / 1000 / 60;
    
    return timeDelta <= 0 ? 0 : Math.round(wordDelta / timeDelta);
  };

  const updateWPM = () => {
    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    const now = Date.now();
    const text = quill.getText();
    const newWordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    wordSamples.current.push({
      timestamp: now,
      wordCount: newWordCount
    });
    
    const windowStart = now - WPM_WINDOW_SIZE;
    wordSamples.current = wordSamples.current.filter(s => s.timestamp > windowStart);
    
    if (wordSamples.current.length >= 2) {
      const wpm = calculateWPM(wordSamples.current);
      setCurrentWpm(wpm);
      if (wpm > 0) {
        maxWpm.current = Math.max(maxWpm.current, wpm);
      }
    }
    
    lastWordCount.current = newWordCount;
  };

  const updateMetrics = () => {
    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    const now = Date.now();
    const text = quill.getText();
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const newWordCount = words.length;
    
    setWordCount(newWordCount);
    setActiveTime(Math.floor((now - sessionStart.current) / 1000));

    const metricsStore = loadMetrics();
    const draftId = getDraftId();
    const draft = metricsStore.drafts[draftId] || {
      totalWords: 0,
      totalFocusTime: 0,
      totalIdleTime: 0,
      totalSessionTime: 0,
      maxWpmEver: 0,
      lastModified: now
    };

    draft.totalWords = newWordCount;
    draft.maxWpmEver = Math.max(draft.maxWpmEver, maxWpm.current);
    draft.totalSessionTime = now - sessionStart.current;
    draft.lastModified = now;
    draft.totalIdleTime = totalIdleTime.current;

    metricsStore.drafts[draftId] = draft;
    saveMetrics(metricsStore);
  };

  useEffect(() => {
    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    const debouncedUpdate = debounce(() => updateMetrics(), 3000);
    
    const events = ['text-change', 'selection-change'];
    events.forEach(event => {
      quill.on(event, () => {
        handleEditorActivity();
        debouncedUpdate();
      });
    });
    
    wpmInterval.current = setInterval(updateWPM, WPM_SAMPLE_INTERVAL);

    return () => {
      events.forEach(event => {
        quill.off(event, handleEditorActivity);
        quill.off(event, debouncedUpdate);
      });
      handleEditorActivity.cancel();
      debouncedUpdate.cancel();
      if (wpmInterval.current) {
        clearInterval(wpmInterval.current);
      }
      updateMetrics();
    };
  }, [editorRef.current]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      updateMetrics();
    };
  }, []);

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

    updateMetrics();
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
    isTabActive,
    draft: loadMetrics().drafts[getDraftId()],
    global: loadMetrics().global
  };
};

export default useEditorAnalytics;