import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { FiShare2 } from "react-icons/fi";
import ShareResultModal from "./ShareResultModal";

interface QuizResultActionsProps {
  onRetry: () => void;
  /** Human-readable topic name, e.g. "Graph Algorithms". Used in the shareable result card. */
  topic: string;
  score: number;
  total: number;
}

const QuizResultActions: React.FC<QuizResultActionsProps> = ({ onRetry, topic, score, total }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <nav className="mt-6 flex flex-col sm:flex-row gap-3 justify-center" aria-label="Quiz navigation actions">
        <Link
          to="/quizzes"
          className="inline-flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <span aria-hidden="true" className="mr-1">&larr;</span> Back to Quizzes
        </Link>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors border-none cursor-pointer"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={() => setIsShareOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors border-none cursor-pointer"
        >
          <FiShare2 size={16} />
          Share Result
        </button>
      </nav>

      <ShareResultModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        topic={topic}
        score={score}
        total={total}
      />
    </>
  );
};

export default QuizResultActions;
