import React from "react";

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  if (total <= 0) return null;

  const percentage = Math.min(((current + 1) / total) * 100, 100);

  return (
    <div className="mb-6" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Question <span className="font-semibold text-gray-900 dark:text-gray-100">{current + 1}</span> of {total}
      </p>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: percentage + '%' }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;