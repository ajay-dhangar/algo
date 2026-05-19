import React from "react";

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => (
  <div className="mb-6">
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
      Question <span className="font-semibold text-gray-900 dark:text-gray-100">{current + 1}</span> of {total}
    </p>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />
    </div>
  </div>
);

export default QuizProgress;