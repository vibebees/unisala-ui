import { useEffect, useRef, useState, type MutableRefObject } from "react";
import Quill from "quill";
import { getCache, setCache } from "@/utils/cache";

type FormattingAction = {
  type: 'bold' | 'italic' | 'link' | 'list' | 'header' | 'blockquote' | 'code' | 'underline' | 'strike';
  count: number;
};

type SessionMetrics = {
  formatting: {
    actions: FormattingAction[];
    totalFormatActions: number;
  };
  pasting: {
    wordsPasted: number;
    pasteCount: number;
  };
  typing: {
    wordsAdded: number;
    charactersTyped: number;
  };
  deleting: {
    wordsDeleted: number;
    charactersDeleted: number;
  };
};

type Session = {
  id: number;
  timestamp: number;
  duration: number;
  startTime: number;
  endTime: number;
  idle: boolean;
  metrics: SessionMetrics;
};

type Draft = {
  id: string;
  createdAt: number;
  updatedAt: number;
  sessionIds: number[];
  metrics: {
    formatting: {
      totalBoldActions: number;
      totalItalicActions: number;
      totalFormatActions: number;
    };
    content: {
      totalWordsAdded: number;
      totalWordsDeleted: number;
      totalWordsPasted: number;
      totalCharactersTyped: number;
      totalCharactersDeleted: number;
    };
    focus: {
      activeTime: number;
      idleTime: number;
      totalTime: number;
      percentIdle: number;
    };
  };
};

type Metrics = {
  sessions: Session[];
  drafts: Record<string, Draft>;
};

interface Config {
  saveInterval?: number; // Default: 10 seconds
  sessionDuration?: number; // Default: 2 minutes
  idleTimeout?: number; // Default: 3 minutes
}

const DEFAULT_SESSION_METRICS: SessionMetrics = {
  formatting: {
    actions: [],
    totalFormatActions: 0
  },
  pasting: { 
    wordsPasted: 0, 
    pasteCount: 0 
  },
  typing: { 
    wordsAdded: 0, 
    charactersTyped: 0 
  },
  deleting: { 
    wordsDeleted: 0, 
    charactersDeleted: 0 
  }
};

const DEFAULT_DRAFT_METRICS = {
  formatting: {
    totalBoldActions: 0,
    totalItalicActions: 0,
    totalFormatActions: 0
  },
  content: {
    totalWordsAdded: 0,
    totalWordsDeleted: 0,
    totalWordsPasted: 0,
    totalCharactersTyped: 0,
    totalCharactersDeleted: 0
  },
  focus: {
    activeTime: 0,
    idleTime: 0,
    totalTime: 0,
    percentIdle: 0
  }
};

const useEditorAnalytics = (
  quillRef: MutableRefObject<Quill | null>,
  config: Config
) => {
  const {
    saveInterval = 10000,
    sessionDuration = 120000,
    idleTimeout = 180000,
  } = config;

  const [metrics, setMetrics] = useState<Metrics>(() =>
    getCache("editorMetrics") || { sessions: [], drafts: {} }
  );

  const lastContentRef = useRef("");
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const draftId = useRef<string | null>(null);
  
  const sessionRef = useRef({
    id: Date.now(),
    startTime: Date.now(),
    lastUpdateTime: Date.now(),
    currentMetrics: JSON.parse(JSON.stringify(DEFAULT_SESSION_METRICS)),
    pendingChanges: false
  });

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getDraft = (id: string): Draft => {
    if (metrics.drafts[id]) {
      return metrics.drafts[id];
    }

    const newDraft: Draft = {
      id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      sessionIds: [],
      metrics: { ...DEFAULT_DRAFT_METRICS }
    };

    setMetrics(prev => ({
      ...prev,
      drafts: { ...prev.drafts, [id]: newDraft }
    }));

    return newDraft;
  };

  const updateDraftWithSession = (draft: Draft, session: Session): Draft => {
    const formatActions = session.metrics.formatting.actions;
    const boldActions = formatActions.find(a => a.type === 'bold')?.count || 0;
    const italicActions = formatActions.find(a => a.type === 'italic')?.count || 0;

    return {
      ...draft,
      sessionIds: [...draft.sessionIds, session.id],
      updatedAt: Date.now(),
      metrics: {
        formatting: {
          totalBoldActions: draft.metrics.formatting.totalBoldActions + boldActions,
          totalItalicActions: draft.metrics.formatting.totalItalicActions + italicActions,
          totalFormatActions: draft.metrics.formatting.totalFormatActions + session.metrics.formatting.totalFormatActions
        },
        content: {
          totalWordsAdded: draft.metrics.content.totalWordsAdded + session.metrics.typing.wordsAdded,
          totalWordsDeleted: draft.metrics.content.totalWordsDeleted + session.metrics.deleting.wordsDeleted,
          totalWordsPasted: draft.metrics.content.totalWordsPasted + session.metrics.pasting.wordsPasted,
          totalCharactersTyped: draft.metrics.content.totalCharactersTyped + session.metrics.typing.charactersTyped,
          totalCharactersDeleted: draft.metrics.content.totalCharactersDeleted + session.metrics.deleting.charactersDeleted
        },
        focus: {
          activeTime: draft.metrics.focus.activeTime + (session.idle ? 0 : session.duration),
          idleTime: draft.metrics.focus.idleTime + (session.idle ? session.duration : 0),
          totalTime: draft.metrics.focus.totalTime + session.duration,
          percentIdle: ((draft.metrics.focus.idleTime + (session.idle ? session.duration : 0)) /
            (draft.metrics.focus.totalTime + session.duration)) * 100
        }
      }
    };
  };

  const startNewSession = () => {
    const now = Date.now();
    sessionRef.current = {
      id: now,
      startTime: now,
      lastUpdateTime: now,
      currentMetrics: JSON.parse(JSON.stringify(DEFAULT_SESSION_METRICS)),
      pendingChanges: false
    };
    // Reset content reference for new session
    lastContentRef.current = quillRef.current?.getText() || "";
  };

  const saveCurrentSession = (isIdle: boolean = false) => {
    const now = Date.now();
    const session: Session = {
      id: sessionRef.current.id,
      timestamp: now,
      duration: now - sessionRef.current.startTime,
      startTime: sessionRef.current.startTime,
      endTime: now,
      idle: isIdle,
      metrics: JSON.parse(JSON.stringify(sessionRef.current.currentMetrics))
    };

    setMetrics(prev => {
      const draft = draftId.current ? getDraft(draftId.current) : null;
      const newMetrics = {
        ...prev,
        sessions: [...prev.sessions, session]
      };

      if (!draft) return newMetrics;

      return {
        ...newMetrics,
        drafts: {
          ...prev.drafts,
          [draft.id]: updateDraftWithSession(draft, session)
        }
      };
    });

    // Start fresh session after saving
    startNewSession();
  };

  const handleTextChange = (delta: any, oldContents: any, source: string) => {
    if (source !== 'user' || !quillRef.current) return;

    const now = Date.now();
    const newText = quillRef.current.getText();
    const oldText = lastContentRef.current;
    
    // Create a new metrics object for this change
    const metricsUpdate = { ...sessionRef.current.currentMetrics };

    if (delta.ops?.some((op: any) => op.insert && typeof op.insert === 'string' && op.insert.length > 10)) {
      // Paste operation
      const pastedWords = Math.max(0, countWords(newText) - countWords(oldText));
      metricsUpdate.pasting.wordsPasted += pastedWords;
      metricsUpdate.pasting.pasteCount += 1;
    } else if (delta.ops?.some((op: any) => op.attributes)) {
      // Formatting operation
      const formattingActions: FormattingAction[] = [];
      delta.ops.forEach((op: any) => {
        if (op.attributes) {
          Object.keys(op.attributes).forEach((attr: string) => {
            if (['bold', 'italic', 'link', 'list', 'header', 'blockquote', 'code', 'underline', 'strike'].includes(attr)) {
              const existing = formattingActions.find(a => a.type === attr);
              if (existing) {
                existing.count++;
              } else {
                formattingActions.push({ type: attr as any, count: 1 });
              }
            }
          });
        }
      });
      
      metricsUpdate.formatting.actions = [
        ...metricsUpdate.formatting.actions,
        ...formattingActions
      ];
      metricsUpdate.formatting.totalFormatActions += 
        formattingActions.reduce((sum, action) => sum + action.count, 0);
    } else {
      // Regular typing or deleting
      const charDelta = newText.length - oldText.length;
      const wordDelta = countWords(newText) - countWords(oldText);

      if (charDelta > 0) {
        metricsUpdate.typing.wordsAdded += Math.max(0, wordDelta);
        metricsUpdate.typing.charactersTyped += charDelta;
      } else if (charDelta < 0) {
        metricsUpdate.deleting.wordsDeleted += Math.max(0, -wordDelta);
        metricsUpdate.deleting.charactersDeleted += Math.abs(charDelta);
      }
    }

    // Update session state
    sessionRef.current = {
      ...sessionRef.current,
      lastUpdateTime: now,
      currentMetrics: metricsUpdate,
      pendingChanges: true
    };

    // Check if session duration exceeded
    if (now - sessionRef.current.startTime >= sessionDuration) {
      saveCurrentSession(false);
    }

    // Update content reference and reset idle timer
    lastContentRef.current = newText;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => saveCurrentSession(true), idleTimeout);
  };

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    quill.on('text-change', handleTextChange);
    lastContentRef.current = quill.getText();

    return () => {
      quill.off('text-change', handleTextChange);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      
      if (sessionRef.current.pendingChanges) {
        saveCurrentSession(false);
      }
    };
  }, [quillRef.current]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionRef.current.pendingChanges) {
        saveCurrentSession(false);
      }
      setCache("editorMetrics", metrics);
    }, saveInterval);

    return () => clearInterval(interval);
  }, [metrics, saveInterval]);

  return {
    metrics,
    setDraftId: (id: string) => { draftId.current = id; },
    getCurrentSession: () => ({ ...sessionRef.current })
  };
};

export default useEditorAnalytics;