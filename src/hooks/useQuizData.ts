import { useState, useCallback } from "react";
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

  const fetchAttempts = useCallback((userId: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate a tiny network delay for smooth UI transition
    setTimeout(() => {
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

  const submitAttempt = useCallback((userId: string, score: number, totalQuestions: number, timeSpent: number) => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
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
