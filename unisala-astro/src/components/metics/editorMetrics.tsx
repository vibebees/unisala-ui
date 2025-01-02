import { useState, useEffect, useRef } from "react";
import {
  calculateWordCount,
  calculateCharacterCount,
  calculateTypingSpeed,
  isUserIdle,
} from "./analyticsUtils";
import { getCache, setCache } from "@/utils/cache";

interface Metrics {
  wordCount: number;
  characterCount: number;
  typingSpeed: number;
  activeTime: number;
  isIdle: boolean;
  maxTypingSpeed: number;
}

interface Session {
  sessionStart: number;
  sessionEnd: number;
  wordCount: number;
  characterCount: number;
  typingSpeed: number;
  activeTime: number;
  maxTypingSpeed: number;
}

interface DraftMetrics {
  sessions: Session[];
}

const EditorAnalytics = (content: string) => {
  const [metrics, setMetrics] = useState<Metrics>({
    wordCount: 0,
    characterCount: 0,
    typingSpeed: 0,
    activeTime: 0,
    isIdle: false,
    maxTypingSpeed: 0,
  });

  const typingStartTime = useRef<number>(Date.now());
  const lastInteractionTime = useRef<number>(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const draftId = window.location.search.split("id=")[1];

  if (!draftId) {
    console.warn("No draftId provided; analytics will not be stored.");
    return { metrics, resetIdleTimer: () => {} };
  }

  const saveSessionMetrics = () => {
    const storedMetrics = (getCache("draftsMetrics") || {}) as Record<string, DraftMetrics>;
    const draftMetrics = storedMetrics[draftId] || { sessions: [] };

    draftMetrics.sessions.push({
      sessionStart: typingStartTime.current,
      sessionEnd: Date.now(),
      wordCount: metrics.wordCount,
      characterCount: metrics.characterCount,
      typingSpeed: metrics.typingSpeed,
      activeTime: metrics.activeTime,
      maxTypingSpeed: metrics.maxTypingSpeed,
    });

    storedMetrics[draftId] = draftMetrics;
    setCache("draftsMetrics", storedMetrics);
    console.log("Session saved for draft:", draftId, draftMetrics);
  };

  const updateMetrics = () => {
    const now = Date.now();
    const wordCount = calculateWordCount(content);
    const characterCount = calculateCharacterCount(content);
    const typingSpeed = calculateTypingSpeed(wordCount, typingStartTime.current, now);
    const idle = isUserIdle(lastInteractionTime.current);

    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      wordCount,
      characterCount,
      typingSpeed: idle ? prevMetrics.typingSpeed : typingSpeed,
      maxTypingSpeed: idle
        ? prevMetrics.maxTypingSpeed
        : Math.max(prevMetrics.maxTypingSpeed, typingSpeed),
      isIdle: idle,
      activeTime: idle ? prevMetrics.activeTime : prevMetrics.activeTime + 1,
    }));
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      lastInteractionTime.current = Date.now();
      updateMetrics();
    }, 5000); // Update metrics every 5 seconds

    const handleBeforeUnload = () => {
      saveSessionMetrics();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      saveSessionMetrics(); // Save session on unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content]);

  const resetIdleTimer = () => {
    lastInteractionTime.current = Date.now();
  };

  return { metrics, resetIdleTimer };
};

export default EditorAnalytics;
