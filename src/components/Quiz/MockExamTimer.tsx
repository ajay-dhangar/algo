import React, { useState, useEffect, useRef } from "react";
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

export default function MockExamTimer({
  timeLimitSeconds,
  onTimeExpired,
  isSubmitted,
  onTick,
}: MockExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(timeLimitSeconds);
  const expiredRef = useRef<boolean>(false);

  useEffect(() => {
    setTimeLeft(timeLimitSeconds);
    expiredRef.current = false;
  }, [timeLimitSeconds]);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (onTick) {
          onTick(next);
        }

        if (next <= 0 && !expiredRef.current) {
          expiredRef.current = true;
          clearInterval(timer);
          setTimeout(() => {
            onTimeExpired();
          }, 0);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, onTimeExpired, onTick]);

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
}
