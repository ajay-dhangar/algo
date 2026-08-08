import React, { useEffect, useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import { FiRepeat } from "react-icons/fi";
import { getDueReviewCount, getSpacedRepetitionQueue, syncMissedQuestionsFromHistory } from "../utils/spacedRepetition";
import { useQuizProgress } from "../hooks/useQuizProgress";
import { QUIZ_IDS, QUESTION_COUNTS } from "../data/quizzesConfig";

export default function ReviewBadgeNavItem() {
  const { stats, userId, loaded } = useQuizProgress(QUIZ_IDS, QUESTION_COUNTS);
  const [count, setCount] = useState(0);

  const queue = useMemo(() => {
    if (!loaded) return {};
    return syncMissedQuestionsFromHistory(stats, userId);
  }, [loaded, stats, userId]);

  useEffect(() => {
    if (!loaded) return;
    setCount(getDueReviewCount(queue));
  }, [loaded, queue]);

  if (!loaded) {
    return null;
  }

  const dueCount = getDueReviewCount(queue);

  return (
    <Link
      to="/quizzes/review"
      className="navbar__item navbar__link inline-flex items-center gap-2 rounded-full bg-indigo-50/80 px-3 py-1.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-200 dark:hover:bg-indigo-900/60"
      title={`${dueCount} review item${dueCount === 1 ? "" : "s"} due`}
    >
      <FiRepeat size={14} />
      <span>Review</span>
      {dueCount > 0 ? (
        <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
          {dueCount}
        </span>
      ) : null}
    </Link>
  );
}
