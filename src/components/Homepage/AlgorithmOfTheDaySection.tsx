import React from "react";
import { algorithmsData } from "../../data/algorithmsData";
import Link from "@docusaurus/Link";

const AlgorithmOfTheDaySection: React.FC = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const algo = algorithmsData[dayOfYear % algorithmsData.length];

  const categoryColors: Record<string, string> = {
    Sorting: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    Searching: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    Graph: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    "Dynamic Programming": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  };

  const badgeClass =
    categoryColors[algo.category] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Algorithm of the{" "}
            <span className="text-indigo-500 dark:text-yellow-400">Day</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            A new algorithm every day — explore, learn, and master one at a time.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition transform hover:scale-[1.01] hover:shadow-2xl">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}
            >
              {algo.category}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {now.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Algorithm Name */}
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {algo.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {algo.description}
          </p>

          {/* Complexity Table */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Complexity Analysis
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Best Case</span>
                <p className="font-mono font-semibold text-indigo-600 dark:text-yellow-400">
                  {algo.timeComplexity.best}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Average Case</span>
                <p className="font-mono font-semibold text-indigo-600 dark:text-yellow-400">
                  {algo.timeComplexity.average}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Worst Case</span>
                <p className="font-mono font-semibold text-indigo-600 dark:text-yellow-400">
                  {algo.timeComplexity.worst}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Space</span>
                <p className="font-mono font-semibold text-indigo-600 dark:text-yellow-400">
                  {algo.spaceComplexity}
                </p>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <Link
            to={algo.docLink}
            className="inline-block bg-indigo-500 hover:bg-indigo-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 no-underline"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmOfTheDaySection;