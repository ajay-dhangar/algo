import React from "react";

interface QuestionProgressProps {
  currentQuestion: number; // Changed to match your main component state prop name
  totalQuestions: number;  // Changed to match your main component state prop name
}

const QuestionProgress: React.FC<QuestionProgressProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  if (totalQuestions <= 0) return null;

  // Calculate strict progress percentage
  const percentage = Math.min(((currentQuestion + 1) / totalQuestions) * 100, 100);

  return (
    <div 
      className="mb-8 w-full select-none" 
      role="progressbar" 
      aria-valuenow={currentQuestion + 1} 
      aria-valuemin={1} 
      aria-valuemax={totalQuestions}
    >
      {/* Label and Statistics */}
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
          Compilation Progress
        </span>
        <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
          Node <span className="font-black text-red-600 dark:text-red-500 text-base">{currentQuestion + 1}</span>
          <span className="text-slate-300 dark:text-slate-700 mx-1">/</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{totalQuestions}</span>
        </p>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-xl h-2.5 p-0.5 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div
          className="bg-gradient-to-r from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 h-full rounded-lg transition-all duration-500 ease-out shadow-[0_0_8px_rgba(239,68,68,0.2)]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Segment Indicator Dots */}
      <div className="flex justify-between px-1 mt-1.5 pointer-events-none">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              idx <= currentQuestion
                ? "bg-red-500/60 dark:bg-red-500/80 scale-125"
                : "bg-slate-200 dark:bg-slate-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionProgress;