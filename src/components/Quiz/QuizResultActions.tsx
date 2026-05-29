import React from "react";
import Link from "@docusaurus/Link";

interface QuizResultActionsProps {
  onRetry: () => void;
}

const QuizResultActions: React.FC<QuizResultActionsProps> = ({ onRetry }) => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center" aria-label="Quiz navigation actions">
      <Link
        to="/quizzes"
        className="inline-flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        ← Back to Quizzes
      </Link>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors border-none cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResultActions;
