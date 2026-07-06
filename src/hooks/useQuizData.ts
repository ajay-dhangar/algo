import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "react-toastify";

interface DBAttempt {
  id: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
}

interface UseQuizDataOptions {
  quizId: string;
}

export function useQuizData({ quizId }: UseQuizDataOptions) {
  const [attempts, setAttempts] = useState<DBAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fetchAttempts = useCallback((userId?: string | null) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Simulate a tiny network delay for smooth UI transition
    timerRef.current = setTimeout(() => {
      try {
        const historyKey = `quiz_attempts_${userId}_${quizId}`;
        const savedAttempts = localStorage.getItem(historyKey);
        if (savedAttempts) {
          setAttempts(JSON.parse(savedAttempts));
        } else {
          setAttempts([]);
        }
      } catch (e) {
        console.error("Error parsing history attempts:", e);
        setError("Failed to parse history data.");
        toast.error("Failed to load past attempts.");
        setAttempts([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [quizId]);

  const submitAttempt = useCallback((userId: string | null | undefined, score: number, totalQuestions: number, timeSpent: number) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        const newAttempt: DBAttempt = {
          id: Math.random().toString(36).substring(2, 9),
          score,
          totalQuestions,
          timeSpent,
          completedAt: new Date().toISOString()
        };
        const historyKey = `quiz_attempts_${userId}_${quizId}`;
        const savedAttempts = localStorage.getItem(historyKey);
        const existing = savedAttempts ? JSON.parse(savedAttempts) : [];
        const updated = [newAttempt, ...existing].slice(0, 5);
        localStorage.setItem(historyKey, JSON.stringify(updated));
        
        toast.success("Quiz submitted successfully!");
        setAttempts(updated);
      } catch (e) {
        console.error("Failed to submit quiz attempt:", e);
        setError("Failed to save attempt.");
        toast.error("Failed to save your result.");
      } finally {
        setIsLoading(false);
      }
    }, 400);
  }, [quizId]);

  return {
    attempts,
    isLoading,
    error,
    fetchAttempts,
    submitAttempt,
    setAttempts
  };
}
