import React from "react";

const QuizSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
      </div>

      {/* Progress Bar Skeleton */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-full mb-8"></div>

      {/* Question Card Skeleton */}
      <div className="bg-white dark:bg-[#1a2333] p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-6"></div>

        {/* Options Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 dark:bg-[#0b0f19] rounded-xl border border-slate-200 dark:border-slate-700 w-full"></div>
          ))}
        </div>

        {/* Buttons Skeleton */}
        <div className="flex justify-between mt-8">
          <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl w-32"></div>
          <div className="h-12 bg-blue-200 dark:bg-blue-900/50 rounded-xl w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default QuizSkeleton;
