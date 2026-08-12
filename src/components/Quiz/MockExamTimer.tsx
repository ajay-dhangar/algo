import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaClock, FaExclamationTriangle } from "react-icons/fa";

interface MockExamTimerProps {
  timeLimitSeconds: number;
  onTimeExpired: () => void;
  isSubmitted: boolean;
  onTick?: (secondsLeft: number) => void;
}

export function formatTime(seconds: number): string {
  const safeSecs = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safeSecs / 3600);
  const mins = Math.floor((safeSecs % 3600) / 60);
  const secs = safeSecs % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/** Countdown timer backed by a wall-clock deadline so backgrounded tabs still lose real time. */
const MockExamTimer: React.FC<MockExamTimerProps> = ({
  timeLimitSeconds,
  onTimeExpired,
  isSubmitted,
  onTick,
}) => {
  const deadlineRef = useRef<number>(Date.now() + timeLimitSeconds * 1000);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimitSeconds);
  const expiredRef = useRef<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onTickRef = useRef(onTick);
  const onTimeExpiredRef = useRef(onTimeExpired);
  useEffect(() => { onTickRef.current = onTick; }, [onTick]);
  useEffect(() => { onTimeExpiredRef.current = onTimeExpired; }, [onTimeExpired]);

  // Recalculate remaining time from the wall-clock deadline.
  const recalc = useCallback(() => {
    const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
    setTimeLeft(remaining);

    if (onTickRef.current) {
      onTickRef.current(timeLimitSeconds - remaining);
    }

    if (remaining <= 0 && !expiredRef.current) {
      expiredRef.current = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onTimeExpiredRef.current();
    }
  }, [timeLimitSeconds]);

  // Reset deadline when timeLimitSeconds changes (e.g. parent re-mounts the timer).
  useEffect(() => {
    deadlineRef.current = Date.now() + timeLimitSeconds * 1000;
    expiredRef.current = false;
    setTimeLeft(timeLimitSeconds);
  }, [timeLimitSeconds]);

  // Main countdown: wall-clock based so backgrounded tabs still lose real time.
  useEffect(() => {
    if (isSubmitted) return;

    recalc();

    intervalRef.current = setInterval(() => {
      recalc();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  // recalc is stable (timeLimitSeconds only changes on reset, handled above).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  // When the user switches back to the tab, immediately snap to the correct time
  // instead of waiting for the next 1-second tick.
  useEffect(() => {
    if (isSubmitted) return;

    /** Snaps the displayed time to the wall-clock value when the tab regains focus. */
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        recalc();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isSubmitted, recalc]);

  const isWarning = timeLeft > 0 && timeLeft <= 300; // < 5 mins
  const isCritical = timeLeft > 0 && timeLeft <= 60;  // < 1 min

  let badgeColorClass =
    "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700";
  if (isCritical) {
    badgeColorClass =
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse font-bold";
  } else if (isWarning) {
    badgeColorClass =
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold";
  }

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${formatTime(timeLeft)}`}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono transition-colors ${badgeColorClass}`}
    >
      {isCritical || isWarning ? (
        <FaExclamationTriangle className="text-xs" />
      ) : (
        <FaClock className="text-xs text-blue-500" />
      )}
      <span className="font-bold tracking-wider">{formatTime(timeLeft)}</span>
      <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400">
        {timeLeft <= 0 ? "Time's up!" : "remaining"}
      </span>
    </div>
  );
};

export default MockExamTimer;
