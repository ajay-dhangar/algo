import React, { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiCode } from "react-icons/fi";

interface EdgeCase {
  title: string;
  description: string;
  example: string;
  impact: "high" | "medium" | "low";
}

interface EdgeCasesProps {
  cases?: EdgeCase[];
}

const defaultEdgeCases: EdgeCase[] = [
  {
    title: "Empty Input",
    description: "Handling arrays, strings, or collections that are empty",
    example: "arr = [], str = '', list = []",
    impact: "high",
  },
  {
    title: "Single Element",
    description: "Processing with only one element in the input",
    example: "arr = [5], str = 'a'",
    impact: "high",
  },
  {
    title: "Duplicate Values",
    description: "Handling multiple identical elements in the input",
    example: "arr = [1, 1, 1, 2, 2, 2]",
    impact: "medium",
  },
  {
    title: "Negative/Zero Values",
    description: "Dealing with negative numbers or zero values",
    example: "arr = [-5, -1, 0, 1, 5]",
    impact: "high",
  },
  {
    title: "Pre-sorted Data",
    description: "Input that is already sorted or reverse-sorted",
    example: "arr = [1, 2, 3, 4, 5] or [5, 4, 3, 2, 1]",
    impact: "medium",
  },
  {
    title: "Boundary Constraints",
    description: "Values at the limits of data type ranges",
    example: "Integer.MAX_VALUE, Integer.MIN_VALUE, Float limits",
    impact: "high",
  },
  {
    title: "Large Input",
    description: "Testing with very large datasets",
    example: "arr with millions of elements",
    impact: "medium",
  },
  {
    title: "Special Characters",
    description: "Strings containing special characters or whitespace",
    example: "str = '!@#$%', str = '   ', str with unicode",
    impact: "medium",
  },
];

const getImpactColor = (impact: EdgeCase["impact"]) => {
  switch (impact) {
    case "high":
      return "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800";
    case "medium":
      return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
    case "low":
      return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
    default:
      return "bg-gray-100 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800";
  }
};

const getImpactBadgeColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const EdgeCases: React.FC<EdgeCasesProps> = ({ cases = defaultEdgeCases }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full my-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FiAlertCircle className="w-6 h-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edge Cases
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Important edge cases to consider when implementing or testing this algorithm. These cases are crucial for technical interviews and robust implementation.
          </p>
        </div>

        <div className="space-y-4">
          {cases.map((edgeCase, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-lg ${getImpactColor(
                edgeCase.impact
              )} ${expandedIndex === index ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setExpandedIndex(expandedIndex === index ? null : index);
                }
              }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <FiCheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {edgeCase.title}
                      </h3>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${getImpactBadgeColor(
                          edgeCase.impact
                        )} uppercase`}
                      >
                        {edgeCase.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {edgeCase.description}
                    </p>
                  </div>
                </div>

                {expandedIndex === index && (
                  <div className="mt-4 pt-4 border-t-2 border-gray-300 dark:border-gray-600 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-950/50 rounded p-4 border-l-4 border-blue-500">
                      <div className="flex items-start gap-2 mb-2">
                        <FiCode className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Example:
                          </p>
                          <code className="block text-sm text-gray-600 dark:text-gray-400 break-words font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded">
                            {edgeCase.example}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>💡 Tip:</strong> Always test your implementation against these edge cases before considering it complete. Edge cases are a critical part of technical interviews and real-world software development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EdgeCases;
