import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import problemsData from "../../data/problemData";
import '../../css/index.css';

const FAQ: React.FC = () => {
    const [openProblems, setOpenProblems] = useState({
        twoSum: false,
        containerWithMostWater: false,
        threeSum: false,
        isValidParentheses: false,
    });

    const [copiedProblem, setCopiedProblem] = useState(""); 

    const handleToggle = (problem: string) => {
        setOpenProblems((prev) => ({
            ...prev,
            [problem]: !prev[problem],
        }));
    };

    const handleCopySolution = (solution: string, problemKey: string) => {
        navigator.clipboard.writeText(solution).then(() => {
            setCopiedProblem(problemKey); 
            setTimeout(() => setCopiedProblem(""), 2000); 
        });
    };

    const problemKeys = Object.keys(problemsData);

    return (
        <Layout
            title="FAQ"
            description="Find answers to the most common questions about Algo."
        >
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <section className="container mx-auto py-12 px-6 md:px-12 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Top DSA Interview Questions
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Frequently asked DSA questions.
                    </motion.p>
                </section>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                {problemKeys.map((key) => (
                    <div key={key} className="mb-4 p-4 bg-white rounded-lg shadow-lg cursor-pointer">
                        <div className="flex items-center" onClick={() => handleToggle(key)}>
                            <h1 className="text-2xl font-bold text-black mr-2">{problemsData[key].title}</h1>
                            <button
                                className="toggle-button cursor-pointer w-10 h-10 bg-white text-black rounded flex items-center justify-center hover:bg-white-500 text-xl ml-auto"
                                onClick={() => handleToggle(key)}
                            >
                                {openProblems[key] ? '-' : '+'}
                            </button>
                        </div>

                        {openProblems[key] && (
                            <motion.div
                                className="transition-all duration-300"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <p>{problemsData[key].description}</p>

                                <h2 className="text-xl font-semibold mt-4">Examples:</h2>
                                <ul className="list-disc ml-5">
                                    {problemsData[key].examples.map((example, index) => (
                                        <li key={index}>
                                            <strong>Example {index + 1}:</strong> Input: <code>{example.input}</code><br />Output: <code>{example.output}</code>
                                        </li>
                                    ))}
                                </ul>
                                <div className="relative bg-gray-100 p-4 rounded border-l-4 border-black">
                                    <h2 className="text-xl font-bold">Solution:</h2>
                                    <button
                                        className="absolute top-2 right-2 text-white py-2 px-4 rounded"
                                        style={{ backgroundColor: '#060270', hover: { backgroundColor: '#040160' },border:'2px solid #060270', }}
                                        onClick={() => handleCopySolution(problemsData[key].solution, key)}
                                    >
                                        {copiedProblem === key ? "Copied!" : "Copy"}
                                    </button>
                                    <pre className="solution-code bg-gray-200 p-4 rounded font-bold mt-2">
                                        {problemsData[key].solution}
                                    </pre>
                                </div>


                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

        </Layout>
    );
};

export default FAQ;
