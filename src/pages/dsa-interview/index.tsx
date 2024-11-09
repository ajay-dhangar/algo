import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs"; // Import Tabs component
import TabItem from "@theme/TabItem"; // Import TabItem component
import problemsData from "../../data/problemData";

const DSAQuestions: React.FC = () => {
  const [openProblems, setOpenProblems] = useState<Record<string, boolean>>({});
  const [copiedLang, setCopiedLang] = useState<{
    problemKey: string;
    lang: string;
  } | null>(null);

  const handleToggle = (problem: string) => {
    setOpenProblems((prev) => ({
      ...prev,
      [problem]: !prev[problem],
    }));
  };

  const handleCopySolution = (
    solution: string,
    problemKey: string,
    lang: string
  ) => {
    navigator.clipboard.writeText(solution).then(() => {
      setCopiedLang({ problemKey, lang });
      setTimeout(() => setCopiedLang(null), 2000);
    });
  };

  const problemKeys = Object.keys(problemsData);

  return (
    <Layout
      title="DSA Questions"
      description="Frequently asked DSA interview questions."
    >
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6">
        <section className="container mx-auto text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Top DSA Interview Questions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get prepared for your next interview with these common DSA problems.
          </motion.p>
        </section>

        <div className="max-w-4xl mx-auto space-y-6">
        {problemKeys.map((key) => (
        <div
          key={key}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleToggle(key)}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {problemsData[key].title}
            </h2>
            <motion.div
              className="text-2xl text-gray-500 dark:text-gray-300"
              animate={{ rotate: openProblems[key] ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openProblems[key] ? "▲" : "▼"}
            </motion.div>
          </div>

          <AnimatePresence>
            {openProblems[key] && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-end mb-4">
                  <a
                    href={problemsData[key].leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    title="Practice on LeetCode"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-code"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Practice
                  </a>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  {problemsData[key].description}
                </p>

                <h3 className="text-lg font-medium mt-4">Examples:</h3>
                <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
                  {problemsData[key].examples.map((example, index) => (
                    <li key={index}>
                      <strong>Example {index + 1}:</strong> Input:{" "}
                      <code>{example.input}</code>, Output:{" "}
                      <code>{example.output}</code>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 border-blue-600">
                  <h4 className="text-lg font-bold mb-2">Solutions:</h4>

                  <Tabs>
                    <TabItem value="cpp" label="C++">
                      <div className="relative">
                        <button
                          className="absolute top-2 right-2 text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                          onClick={() =>
                            handleCopySolution(
                              problemsData[key].solution.cpp,
                              key,
                              "cpp"
                            )
                          }
                        >
                          {copiedLang?.problemKey === key &&
                          copiedLang?.lang === "cpp"
                            ? "Copied!"
                            : "Copy"}
                        </button>
                        <pre className="whitespace-pre-wrap bg-gray-200 dark:bg-gray-800 p-3 rounded-md text-sm font-mono mt-2 overflow-auto">
                          {problemsData[key].solution.cpp}
                        </pre>
                      </div>
                    </TabItem>
                    <TabItem value="java" label="Java">
                      <div className="relative">
                        <button
                          className="absolute top-2 right-2 text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                          onClick={() =>
                            handleCopySolution(
                              problemsData[key].solution.java,
                              key,
                              "java"
                            )
                          }
                        >
                          {copiedLang?.problemKey === key &&
                          copiedLang?.lang === "java"
                            ? "Copied!"
                            : "Copy"}
                        </button>
                        <pre className="whitespace-pre-wrap bg-gray-200 dark:bg-gray-800 p-3 rounded-md text-sm font-mono mt-2 overflow-auto">
                          {problemsData[key].solution.java}
                        </pre>
                      </div>
                    </TabItem>
                    <TabItem value="python" label="Python">
                      <div className="relative">
                        <button
                          className="absolute top-2 right-2 text-sm text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                          onClick={() =>
                            handleCopySolution(
                              problemsData[key].solution.python,
                              key,
                              "python"
                            )
                          }
                        >
                          {copiedLang?.problemKey === key &&
                          copiedLang?.lang === "python"
                            ? "Copied!"
                            : "Copy"}
                        </button>
                        <pre className="whitespace-pre-wrap bg-gray-200 dark:bg-gray-800 p-3 rounded-md text-sm font-mono mt-2 overflow-auto">
                          {problemsData[key].solution.python}
                        </pre>
                      </div>
                    </TabItem>
                  </Tabs>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
        </div>
      </div>
    </Layout>
  );
};

export default DSAQuestions;
