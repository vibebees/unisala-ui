import { useEffect, useRef, useState, type MutableRefObject } from "react";
import Quill from "quill";
import { getCache, setCache } from "@/utils/cache";

type Session = {
  timestamp: number;
  type: "typing" | "pasting" | "idle";
  duration: number;
  wordsAdded: number;
  wordsDeleted: number;
  idle: boolean;
  startTime: number;
  endTime: number;
  actions: {
    wordsPasted: number;
    wordsFormatted: number;
    boldActions: number;
    italicActions: number;
  };
};

type Draft = {
  id: string;
  createdAt: number;
  updatedAt: number;
  sessionIds: number[];
  metrics: {
    wordMetrics: {
      totalWordsAdded: number;
      totalWordsDeleted: number;
      totalWordsPasted: number;
      totalWordsFormatted: number;
    };
    focusMetrics: {
      activeTime: number;
      idleTime: number;
      totalTime: number;
      percentIdle: number;
    };
    actionSummary: {
      boldActions: number;
      italicActions: number;
    };
  };
};

type Metrics = {
  sessions: Session[];
  drafts: Record<string, Draft>;
};

interface Config {
  saveInterval?: number;
  minWordChangeThreshold?: number;
  sessionDuration?: number; // Default: 2 minutes (120000ms)
  idleTimeout?: number; // Default: 3 minutes (180000ms)
}

const useEditorAnalytics = (
  quillRef: MutableRefObject<Quill | null>,
  config: Config
) => {
  const {
    saveInterval = 10000,
    minWordChangeThreshold = 10,
    sessionDuration = 120000,
    idleTimeout = 180000,
  } = config;

  // Initialize metrics state
  const [metrics, setMetrics] = useState<Metrics>(() =>
    getCache("editorMetrics") || { sessions: [], drafts: {} }
  );

  const sessionStartRef = useRef(Date.now());
  const lastActiveRef = useRef(Date.now());
  const wordCountRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const draftId = useRef<string | null>(null); // Assume draftId is from the URL or context

  const getDraft = (id: string) => {
    const existingDraft = metrics.drafts[id];
    if (existingDraft) {
      return existingDraft;
    }

    const newDraft: Draft = {
      id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      sessionIds: [],
      metrics: {
        wordMetrics: { totalWordsAdded: 0, totalWordsDeleted: 0, totalWordsPasted: 0, totalWordsFormatted: 0 },
        focusMetrics: { activeTime: 0, idleTime: 0, totalTime: 0, percentIdle: 0 },
        actionSummary: { boldActions: 0, italicActions: 0 },
      },
    };

    setMetrics((prev) => ({
      ...prev,
      drafts: { ...prev.drafts, [id]: newDraft },
    }));

    return newDraft;
  };

  const endSession = (type: "typing" | "idle") => {
    const currentTime = Date.now();
    const duration = currentTime - sessionStartRef.current;

    if (duration < sessionDuration) {
      console.log("Session duration too short, skipping.");
      return;
    }

    const draft = draftId.current ? getDraft(draftId.current) : null;

    const session: Session = {
      timestamp: Date.now(),
      type,
      duration,
      wordsAdded: wordCountRef.current,
      wordsDeleted: 0,
      idle: type === "idle",
      startTime: sessionStartRef.current,
      endTime: currentTime,
      actions: { wordsPasted: 0, wordsFormatted: 0, boldActions: 0, italicActions: 0 },
    };

    setMetrics((prev) => {
      const updatedDrafts = draft
        ? {
            ...prev.drafts,
            [draft.id]: {
              ...draft,
              sessionIds: [...draft.sessionIds, session.timestamp],
              updatedAt: Date.now(),
              metrics: {
                ...draft.metrics,
                wordMetrics: {
                  ...draft.metrics.wordMetrics,
                  totalWordsAdded: draft.metrics.wordMetrics.totalWordsAdded + session.wordsAdded,
                },
                focusMetrics: {
                  ...draft.metrics.focusMetrics,
                  activeTime: draft.metrics.focusMetrics.activeTime + (type === "idle" ? 0 : session.duration),
                  idleTime: draft.metrics.focusMetrics.idleTime + (type === "idle" ? session.duration : 0),
                  totalTime: draft.metrics.focusMetrics.totalTime + session.duration,
                  percentIdle:
                    ((draft.metrics.focusMetrics.idleTime + (type === "idle" ? session.duration : 0)) /
                      (draft.metrics.focusMetrics.totalTime + session.duration)) *
                    100,
                },
              },
            },
          }
        : prev.drafts;

      return {
        ...prev,
        sessions: [...prev.sessions, session],
        drafts: updatedDrafts,
      };
    });

    sessionStartRef.current = Date.now();
    wordCountRef.current = 0;
  };

  const handleIdle = () => {
    console.log("User is idle.");
    endSession("idle");
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const handleTextChange = () => {
    lastActiveRef.current = Date.now();
    const currentWordCount =
      quillRef.current?.getText()?.trim().split(/\s+/).length || 0;

    if (currentWordCount !== wordCountRef.current) {
      console.log("Word count updated:", currentWordCount);
      wordCountRef.current = currentWordCount;
    }

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(handleIdle, idleTimeout);

    if (Date.now() - sessionStartRef.current >= sessionDuration) {
      console.log("Session duration exceeded, ending session.");
      endSession("typing");
    }
  };

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current;
    quill.on("text-change", handleTextChange);

    return () => {
      quill.off("text-change", handleTextChange);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [quillRef, sessionDuration, idleTimeout]);

  const saveMetrics = async () => {
    try {
      console.log("Saving metrics to cache:", metrics);
      setCache("editorMetrics", metrics);
    } catch (error) {
      console.error("Error saving metrics:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveMetrics();
    }, saveInterval);

    return () => clearInterval(interval);
  }, [metrics, saveInterval]);

  useEffect(() => {
    const cachedMetrics = getCache("editorMetrics");
    if (cachedMetrics && cachedMetrics.sessions && cachedMetrics.drafts) {
      console.log("Loaded metrics from cache:", cachedMetrics);
      setMetrics(cachedMetrics);
    } else {
      console.log("No metrics found in cache.");
    }
  }, []);

  return metrics;
};

export default useEditorAnalytics;
