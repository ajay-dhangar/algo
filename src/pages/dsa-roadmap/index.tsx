import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import {
  FaFolderOpen,
  FaFolder,
  FaFileCode,
  FaChevronRight,
  FaRoute,
  FaExpandArrowsAlt,
  FaCompress,
  FaTerminal,
  FaInfoCircle,
  FaCheckCircle
} from "react-icons/fa";
import { topics } from "../../data/topics";

const DSARoadmap: React.FC = () => {
  // State Pipeline
  const [expandedTopics, setExpandedTopics] = useState<{ [key: number]: boolean }>({ 0: true });
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
  const [activeTopicIdx, setActiveTopicIdx] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Synchronize localStorage Layout Cache
  useEffect(() => {
    try {
      const savedTopics = localStorage.getItem("pro_dsa_topics");
      if (savedTopics) setExpandedTopics(JSON.parse(savedTopics));
      const savedFolders = localStorage.getItem("pro_dsa_folders");
      if (savedFolders) setExpandedFolders(JSON.parse(savedFolders));
    } catch (error) {
      console.error("Failed to parse stored roadmap layout cache status", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("pro_dsa_topics", JSON.stringify(expandedTopics));
        localStorage.setItem("pro_dsa_folders", JSON.stringify(expandedFolders));
      } catch (error) {
        console.error("Failed to write updated roadmap layout cache status", error);
      }
    }
  }, [expandedTopics, expandedFolders, isLoaded]);

  // Calculations for Matrix Analysis Engine
  const totalModules = topics.length;
  const totalSubfolders = useMemo(() => topics.reduce((acc, t) => acc + t.folders.length, 0), []);
  const currentActiveTopic = topics[activeTopicIdx] || topics[0];

  const toggleTopic = (idx: number) => {
    setExpandedTopics(prev => ({ ...prev, [idx]: !prev[idx] }));
    setActiveTopicIdx(idx);
  };

  const toggleFolder = (tIdx: number, fIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${tIdx}-${fIdx}`;
    setExpandedFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setMassState = (expand: boolean) => {
    const nextTopics: { [key: number]: boolean } = {};
    const nextFolders: { [key: string]: boolean } = {};
    if (expand) {
      topics.forEach((topic, tIdx) => {
        nextTopics[tIdx] = true;
        topic.folders.forEach((_, fIdx) => { 
          nextFolders[`${tIdx}-${fIdx}`] = true; 
        });
      });
    }
    setExpandedTopics(nextTopics);
    setExpandedFolders(nextFolders);
  };

  return (
    <Layout title="Enterprise DSA Roadmap" description="High-density architecture layout for algorithmic training pipelines.">
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d10] transition-colors duration-300 select-none text-slate-800 dark:text-zinc-300 font-sans">
        
        {/* Global Toolbar Header */}
        <header className="border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-[#0d1117]/70 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
                <FaRoute className="text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white m-0 flex items-center gap-2">
                  <Translate>System Pipeline Workspace</Translate>
                </h1>
                <p className="text-xs text-slate-500 dark:text-zinc-500 m-0">
                  Interactive File-Tree Compilers & Metric Complexities Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={() => setMassState(true)}
                className="flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 rounded-lg cursor-pointer shadow-sm text-slate-700 dark:text-zinc-300 transition-all"
              >
                <FaExpandArrowsAlt /> Expand All
              </button>
              <button
                onClick={() => setMassState(false)}
                className="flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-950/40 hover:text-red-500 rounded-lg cursor-pointer shadow-sm text-slate-400 transition-all"
              >
                <FaCompress /> Collapse
              </button>
            </div>
          </div>
        </header>

        {/* Main Grid Split Viewport */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Technical Directory Tree (7 Cols) */}
          <section className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-2 pb-1">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-zinc-600">
                Execution Branch Navigation
              </span>
              <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
                {totalModules} Clusters Available
              </span>
            </div>

            <div className="space-y-2.5">
              {topics.map((topic, tIdx) => {
                const isTopicOpen = !!expandedTopics[tIdx];
                const isActiveModule = activeTopicIdx === tIdx;

                return (
                  <div 
                    key={tIdx}
                    onClick={() => setActiveTopicIdx(tIdx)}
                    className={`rounded-xl border transition-all duration-200 bg-white dark:bg-[#0d1117] ${
                      isActiveModule 
                        ? "border-red-500/40 dark:border-red-500/30 ring-1 ring-red-500/10 shadow-sm" 
                        : "border-slate-200/70 dark:border-zinc-900 hover:border-slate-300 dark:hover:border-zinc-800"
                    }`}
                  >
                    {/* Module Controller Header */}
                    <div
                      onClick={(e) => { e.stopPropagation(); toggleTopic(tIdx); }}
                      className="w-full flex items-center justify-between p-4 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-6 h-6 rounded-md font-mono text-[11px] font-bold flex items-center justify-center transition-colors ${
                          isTopicOpen 
                            ? "bg-red-500 text-white" 
                            : "bg-slate-100 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400 group-hover:bg-slate-200 dark:group-hover:bg-zinc-800"
                        }`}>
                          {(tIdx + 1).toString().padStart(2, '0')}
                        </div>
                        <h3 className="text-sm font-semibold tracking-tight text-slate-800 dark:text-zinc-200 m-0 truncate">
                          {topic.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-slate-100 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 px-2 py-0.5 rounded-md">
                          {topic.folders.length} Nodes
                        </span>
                        <FaChevronRight className={`text-xs text-slate-400 dark:text-zinc-600 transition-transform duration-200 ${
                          isTopicOpen ? "rotate-180 text-red-500" : ""
                        }`} />
                      </div>
                    </div>

                    {/* Subtree Structure */}
                    <div className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                      isTopicOpen ? "grid-rows-[1fr] opacity-100 border-t border-slate-100 dark:border-zinc-800/60" : "grid-rows-[0fr] opacity-0"
                    }`}>
                      <div className="overflow-hidden">
                        <div className="p-4 bg-slate-50/40 dark:bg-zinc-950/20 space-y-2">
                          {topic.folders.map((folder, fIdx) => {
                            const isFolderOpen = !!expandedFolders[`${tIdx}-${fIdx}`];

                            return (
                              <div key={fIdx} className="relative pl-4 border-l-2 border-slate-200 dark:border-zinc-800/80 ml-2">
                                <div 
                                  onClick={(e) => toggleFolder(tIdx, fIdx, e)}
                                  className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121820] border border-slate-200/60 dark:border-zinc-800/60 rounded-lg hover:border-slate-300 dark:hover:border-zinc-700 cursor-pointer transition-all"
                                >
                                  <div className="flex items-center gap-2 text-xs font-medium">
                                    {isFolderOpen ? (
                                      <FaFolderOpen className="text-amber-500 dark:text-amber-400 shrink-0" />
                                    ) : (
                                      <FaFolder className="text-slate-400 dark:text-zinc-600 shrink-0" />
                                    )}
                                    <span className="text-slate-700 dark:text-zinc-300">{folder.name}</span>
                                  </div>
                                  <FaChevronRight className={`text-[10px] text-slate-300 transition-transform ${isFolderOpen ? "rotate-90 text-amber-500" : ""}`} />
                                </div>

                                {/* Leaf Node Link Anchors */}
                                <div className={`grid transition-[grid-template-rows,opacity] duration-150 ${
                                  isFolderOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}>
                                  <div className="overflow-hidden">
                                    <ul className="pl-4 pr-1 py-1.5 mt-1.5 bg-slate-100/50 dark:bg-zinc-900/40 rounded-lg border border-slate-200/40 dark:border-zinc-800/30 space-y-1 list-none m-0">
                                      {folder.files.map((file, fileIdx) => (
                                        <li key={fileIdx} className="m-0">
                                          <Link
                                            to={file.link}
                                            className="flex items-center text-xs font-mono text-slate-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors py-1 group/item"
                                            style={{ textDecoration: "none" }}
                                          >
                                            <FaFileCode className="mr-2 text-slate-300 dark:text-zinc-700 group-hover/item:text-red-400 transition-colors" />
                                            <span className="truncate">{file.name}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </section>

          {/* Right Column: Architectural Complexity Matrix Panel (5 Cols) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Matrix Metrics Dashboard Widget */}
              <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800/80 pb-3.5 mb-4">
                  <FaTerminal className="text-red-500 text-sm" />
                  <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 m-0">
                    Matrix Metadata Monitor
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 dark:bg-zinc-950/40 p-3.5 rounded-lg border border-slate-100 dark:border-zinc-900">
                    <span className="block text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wide">Global Modules</span>
                    <span className="text-xl font-black text-slate-800 dark:text-white mt-0.5 block">{totalModules}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-950/40 p-3.5 rounded-lg border border-slate-100 dark:border-zinc-900">
                    <span className="block text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wide">Total Subnodes</span>
                    <span className="text-xl font-black text-slate-800 dark:text-white mt-0.5 block">{totalSubfolders}</span>
                  </div>
                </div>

                <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 flex gap-3">
                  <FaInfoCircle className="text-red-500 text-sm shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 dark:text-zinc-400 m-0 leading-relaxed">
                    Selected Cluster: <strong className="text-slate-800 dark:text-zinc-200">{currentActiveTopic?.title}</strong>. 
                    Explore inner directory nodes on the left to review specific algorithmic assets.
                  </p>
                </div>
              </div>

              {/* Live Big-O Algorithmic Reference Matrix */}
              <div className="bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 m-0">
                      Complexity Matrix Cheat Sheet
                    </h4>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-zinc-800 text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                        <th className="pb-2 font-bold">Data Structure</th>
                        <th className="pb-2 font-bold">Average Access</th>
                        <th className="pb-2 font-bold">Average Search</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-900/60 text-slate-700 dark:text-zinc-300">
                      <tr>
                        <td className="py-2.5 font-sans font-medium text-slate-900 dark:text-white">Array / Vector</td>
                        <td className="py-2.5 text-green-500">O(1)</td>
                        <td className="py-2.5 text-amber-500">O(n)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-medium text-slate-900 dark:text-white">Linked List</td>
                        <td className="py-2.5 text-amber-500">O(n)</td>
                        <td className="py-2.5 text-amber-500">O(n)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-medium text-slate-900 dark:text-white">Hash Table</td>
                        <td className="py-2.5 text-green-500">O(1)</td>
                        <td className="py-2.5 text-green-500">O(1)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-medium text-slate-900 dark:text-white">BST (Balanced)</td>
                        <td className="py-2.5 text-sky-500">O(log n)</td>
                        <td className="py-2.5 text-sky-500">O(log n)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>
    </Layout>
  );
};

export default DSARoadmap;