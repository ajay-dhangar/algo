import React, { useState } from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import {
  FaFolderOpen,
  FaFolder,
  FaFileAlt,
  FaChevronDown,
  FaMapSigns,
  FaCheckDouble,
  FaCompressAlt,
} from "react-icons/fa";
import { topics } from "../../data/topics";

const DSARoadmap: React.FC = () => {
  // State for major topics (Top level nodes) - open the first one by default
  const [expandedTopics, setExpandedTopics] = useState<{ [key: number]: boolean }>({ 0: true });
  // State for specific folders (Second level nodes)
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});

  const toggleTopic = (idx: number) => {
    setExpandedTopics((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleFolder = (topicIdx: number, folderIdx: number) => {
    const key = `${topicIdx}-${folderIdx}`;
    setExpandedFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const allTopics: { [key: number]: boolean } = {};
    const allFolders: { [key: string]: boolean } = {};
    
    topics.forEach((topic, tIdx) => {
      allTopics[tIdx] = true;
      topic.folders.forEach((_, fIdx) => {
        allFolders[`${tIdx}-${fIdx}`] = true;
      });
    });
    
    setExpandedTopics(allTopics);
    setExpandedFolders(allFolders);
  };

  const collapseAll = () => {
    setExpandedTopics({});
    setExpandedFolders({});
  };

  return (
    <Layout
      title="DSA Roadmap"
      description="Data Structures and Algorithms Learning Path"
    >
      <div className="min-h-screen bg-gray-50 dark:bg-[#1b1b1d] py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          {/* header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-4 text-gray-900 dark:text-white">
              <FaMapSigns className="text-[var(--ifm-color-primary)]" />
              <Translate>DSA Roadmap</Translate>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              <Translate>A comprehensive, step-by-step interactive learning path to master Data Structures, Algorithms, and Problem Solving.</Translate>
            </p>
         
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={expandAll}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:text-[var(--ifm-color-primary)] transition-colors font-semibold text-sm"
              >
                <FaCheckDouble /> Expand All
              </button>
              <button 
                onClick={collapseAll}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:text-red-500 transition-colors font-semibold text-sm"
              >
                <FaCompressAlt /> Collapse All
              </button>
            </div>
          </div>

          {/* timeline */}
          <div className="relative border-l-4 border-gray-300 dark:border-gray-700 ml-4 md:ml-12 pb-8">
            {topics.map((topic, tIdx) => (
              <div key={tIdx} className="mb-10 ml-8 relative">

                <div 
                  className={`absolute -left-[2.65rem] top-[21px] h-8 w-8 rounded-full border-4 border-gray-50 dark:border-[#1b1b1d] shadow-sm flex items-center justify-center z-10 transition-colors duration-300 ${
                    expandedTopics[tIdx] ? "bg-[var(--ifm-color-primary)]" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                ></div>
      
                <div
                  role="button"
                  tabIndex={0}
                  className={`cursor-pointer p-5 rounded-xl border shadow-sm transition-all duration-200 flex justify-between items-center ${
                    expandedTopics[tIdx] 
                      ? "bg-white dark:bg-gray-800 border-[var(--ifm-color-primary)]" 
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-400"
                  }`}
                  onClick={() => toggleTopic(tIdx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleTopic(tIdx);
                    }
                  }}
                >
                  <h2 className={`text-2xl font-bold m-0 transition-colors duration-200 ${expandedTopics[tIdx] ? 'text-[var(--ifm-color-primary)]' : 'text-gray-800 dark:text-gray-200'}`}>
                    <span className="text-gray-400 dark:text-gray-500 mr-2 text-xl font-normal">{(tIdx + 1).toString().padStart(2, '0')}</span> 
                    {topic.title}
                  </h2>
                  <div className={`text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded-full transition-transform duration-300 ${expandedTopics[tIdx] ? 'rotate-180' : 'rotate-0'}`}>
                    <FaChevronDown />
                  </div>
                </div>

                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    expandedTopics[tIdx] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                      {topic.folders.map((folder, fIdx) => {
                        const isFolderExpanded = expandedFolders[`${tIdx}-${fIdx}`];

                        return (
                          <div 
                            key={fIdx} 
                            className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden h-fit"
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              onClick={() => toggleFolder(tIdx, fIdx)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  toggleFolder(tIdx, fIdx);
                                }
                              }}
                            >
                              <div className="flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {isFolderExpanded ? (
                                  <FaFolderOpen className="text-[var(--ifm-color-primary)] text-xl transition-colors duration-200" />
                                ) : (
                                  <FaFolder className="text-gray-400 dark:text-gray-500 text-xl transition-colors duration-200" />
                                )}
                                <span>{folder.name}</span>
                              </div>
                              <div className={`text-gray-400 text-sm transition-transform duration-300 ${isFolderExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                <FaChevronDown />
                              </div>
                            </div>

                            <div 
                              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                isFolderExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden">
                                <div className="px-4 pb-4 pt-1 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-700">
                                  <ul className="ml-2 border-l-2 border-gray-200 dark:border-gray-600 pl-4 space-y-3 mt-3">
                                    {folder.files.map((file, fileIdx) => (
                                      <li 
                                        key={fileIdx} 
                                        className="flex items-center text-[15px] text-gray-600 dark:text-gray-300 hover:text-[var(--ifm-color-primary)] dark:hover:text-[var(--ifm-color-primary)] transition-colors cursor-pointer group"
                                      >
                                        <FaFileAlt className="mr-3 text-gray-300 dark:text-gray-500 group-hover:text-[var(--ifm-color-primary)] transition-colors" />
                                        {file}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DSARoadmap;