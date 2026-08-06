import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import { FiClock, FiArrowRight } from "react-icons/fi";
import {
  getRecentAlgorithms,
} from "../../utils/recentAlgorithms";

export default function RecentlyViewedAlgorithms() {
  const [algorithms, setAlgorithms] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAlgorithms(getRecentAlgorithms());
  }, []);

  // Wait for client hydration — component reads localStorage which is unavailable during SSR
  if (!mounted || algorithms.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <FiClock className="h-4 w-4 text-blue-500 dark:text-blue-400" aria-hidden="true" />
        <h2 className="m-0 text-lg font-bold text-slate-900 dark:text-white">
          Recently Viewed Algorithms
        </h2>
      </div>

      {/* Algorithm list */}
      <ul className="m-0 list-none space-y-2 p-0">
        {algorithms.map((algo) => (
          <li key={algo.path} className="m-0 p-0">
            <Link
              to={algo.path}
              className="group flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-700 no-underline transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            >
              <span className="flex-1">{algo.title}</span>
              <FiArrowRight
                className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
