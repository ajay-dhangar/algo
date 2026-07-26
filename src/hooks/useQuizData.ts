import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { saveQuizAttemptLocal } from "../utils/safeStorage";
import { supabase } from "../utils/supabaseClient";

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

  const fetchAttempts = useCallback(async (userId?: string | null) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: sbError } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', userId)
        .eq('quiz_id', quizId)
        .order('completedAt', { ascending: false })
        .limit(5);

      if (sbError) {
        throw sbError;
      }
      
      setAttempts(data || []);
    } catch (e: any) {
      console.error("Error fetching history attempts:", e);
      setError(e.message || "Failed to parse history data.");
      toast.error("Failed to load past attempts.");
      setAttempts([]);
    } finally {
      setIsLoading(false);
    }
  }, [quizId]);

  const submitAttempt = useCallback(async (userId: string | null | undefined, score: number, totalQuestions: number, timeSpent: number) => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    try {
      const newAttempt = {
        user_id: userId,
        quiz_id: quizId,
        score,
        totalQuestions,
        timeSpent,
        completedAt: new Date().toISOString()
      };
      
      const { data, error: sbError } = await supabase
        .from('quiz_attempts')
        .insert([newAttempt])
        .select();

      if (sbError) {
        throw sbError;
      }

      saveQuizAttemptLocal(userId, quizId, {
        score,
        totalQuestions,
        timeSpent,
        completedAt: newAttempt.completedAt,
      });
      
      toast.success("Quiz submitted successfully!");
      setAttempts((prev) => {
        const inserted = data && data[0] ? data[0] : { id: Math.random().toString(), ...newAttempt };
        return [inserted as DBAttempt, ...prev].slice(0, 5);
      });
    } catch (e: any) {
      console.error("Failed to submit quiz attempt:", e);
      saveQuizAttemptLocal(userId, quizId, {
        score,
        totalQuestions,
        timeSpent,
        completedAt: new Date().toISOString(),
      });
      setAttempts((prev) => {
        const fallbackAttempt = {
          id: Math.random().toString(),
          score,
          totalQuestions,
          timeSpent,
          completedAt: new Date().toISOString(),
        };
        return [fallbackAttempt as DBAttempt, ...prev].slice(0, 5);
      });
      setError(e.message || "Failed to save attempt.");
      toast.error("Saved locally, but cloud sync failed.");
    } finally {
      setIsLoading(false);
    }
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
