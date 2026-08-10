import { useCallback, useEffect, useRef, useState } from 'react';

export type HintStageKey = 'nudge' | 'approach' | 'pseudocode' | 'fullSolution';

export interface HintStages {
  nudge?: string;
  approach?: string;
  pseudocode?: string;
  fullSolution?: string;
}

export interface ProblemHintLadderRecord {
  stageIndex: number;
  revealedAt: string[];
  updatedAt: string;
}

export type ProblemHintLadderState = Record<string, ProblemHintLadderRecord>;

const STORAGE_KEY = 'algo.dsa.hint-ladder.v1';

function readHintLadderState(): ProblemHintLadderState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ProblemHintLadderState;
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  return {};
}

function writeHintLadderState(state: ProblemHintLadderState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — ignore.
  }
}

export interface UseProblemHintLadderReturn {
  currentStageIndex: number;
  canRevealNextStage: boolean;
  hasSeenHint: boolean;
  isFullyRevealed: boolean;
  revealNextStage: () => void;
  resetHintLadder: () => void;
  record: ProblemHintLadderRecord;
}

export function useProblemHintLadder(problemId: string, totalStages: number): UseProblemHintLadderReturn {
  const [record, setRecord] = useState<ProblemHintLadderRecord>({
    stageIndex: -1,
    revealedAt: [],
    updatedAt: '',
  });

  // Keep a ref in sync with the latest record so callbacks always read the
  // current value without needing it as a dependency (avoids stale closures
  // on rapid successive calls such as double-clicks).
  const recordRef = useRef(record);
  useEffect(() => {
    recordRef.current = record;
  }, [record]);

  useEffect(() => {
    if (!problemId) return;
    const state = readHintLadderState();
    const found = state[problemId];
    if (found) {
      setRecord({
        stageIndex: Math.max(-1, Math.min(found.stageIndex, totalStages - 1)),
        revealedAt: Array.isArray(found.revealedAt) ? found.revealedAt : [],
        updatedAt: typeof found.updatedAt === 'string' ? found.updatedAt : '',
      });
    } else {
      setRecord({ stageIndex: -1, revealedAt: [], updatedAt: '' });
    }
  }, [problemId, totalStages]);

  const saveRecord = useCallback(
    (next: ProblemHintLadderRecord) => {
      setRecord(next);
      const state = readHintLadderState();
      writeHintLadderState({
        ...state,
        [problemId]: next,
      });
    },
    [problemId]
  );

  const currentStageIndex = Math.max(-1, Math.min(record.stageIndex, totalStages - 1));
  const canRevealNextStage = currentStageIndex + 1 < totalStages;
  const hasSeenHint = currentStageIndex >= 0;
  const isFullyRevealed = currentStageIndex >= totalStages - 1 && totalStages > 0;

  const revealNextStage = useCallback(() => {
    if (!problemId || totalStages <= 0) return;
    // Read from the ref so rapid successive calls always see the latest
    // stageIndex and revealedAt, not a stale closure snapshot.
    const latest = recordRef.current;
    const currentIndex = Math.max(-1, Math.min(latest.stageIndex, totalStages - 1));
    const nextIndex = Math.min(currentIndex + 1, totalStages - 1);
    if (nextIndex === currentIndex) return;
    const now = new Date().toISOString();
    saveRecord({
      stageIndex: nextIndex,
      revealedAt: [...latest.revealedAt, now],
      updatedAt: now,
    });
  }, [problemId, saveRecord, totalStages]);

  const resetHintLadder = useCallback(() => {
    if (!problemId) return;
    const next: ProblemHintLadderRecord = { stageIndex: -1, revealedAt: [], updatedAt: new Date().toISOString() };
    saveRecord(next);
  }, [problemId, saveRecord]);

  return {
    currentStageIndex,
    canRevealNextStage,
    hasSeenHint,
    isFullyRevealed,
    revealNextStage,
    resetHintLadder,
    record,
  };
}
