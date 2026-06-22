import React, { useState } from "react";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";

interface TrieNode {
  id: number;
  char: string;
  depth: number;
  children: { [key: string]: number };
  fail: number | null;
  output: string[];
}

const AhoCorasickVisualizerComponent: React.FC = () => {
  const [patternsInput, setPatternsInput] = useState("he, she, his, hers");
  const [searchText, setSearchText] = useState("ushers");
  const [nodes, setNodes] = useState<TrieNode[]>([]);
  const [matches, setMatches] = useState<{ pattern: string; index: number }[]>([]);
  const [currentStep, setCurrentStep] = useState<string>("");

  const buildAutomaton = () => {
    const list = patternsInput
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (list.length === 0) return;

    // Initialize root
    const tempNodes: TrieNode[] = [
      { id: 0, char: "root", depth: 0, children: {}, fail: null, output: [] }
    ];

    let nextId = 1;

    // 1. Insert patterns into Trie
    for (const pattern of list) {
      let currId = 0;
      for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        if (tempNodes[currId].children[char] === undefined) {
          tempNodes.push({
            id: nextId,
            char,
            depth: tempNodes[currId].depth + 1,
            children: {},
            fail: null,
            output: []
          });
          tempNodes[currId].children[char] = nextId;
          nextId++;
        }
        currId = tempNodes[currId].children[char];
      }
      tempNodes[currId].output.push(pattern);
    }

    // 2. Build Failure Links using BFS
    const queue: number[] = [];
    
    // Root children's fail links point to root
    for (const char in tempNodes[0].children) {
      const childId = tempNodes[0].children[char];
      tempNodes[childId].fail = 0;
      queue.push(childId);
    }

    while (queue.length > 0) {
      const currId = queue.shift()!;
      const currNode = tempNodes[currId];

      for (const char in currNode.children) {
        const childId = currNode.children[char];
        let failState = currNode.fail;

        while (failState !== null && tempNodes[failState].children[char] === undefined) {
          failState = tempNodes[failState].fail;
        }

        const targetFail = failState !== null ? tempNodes[failState].children[char] : 0;
        tempNodes[childId].fail = targetFail;
        
        // Merge outputs
        tempNodes[childId].output = [
          ...tempNodes[childId].output,
          ...tempNodes[targetFail].output
        ];
        queue.push(childId);
      }
    }

    setNodes(tempNodes);
    setMatches([]);
    setCurrentStep("Automaton constructed! Ready to search.");
  };

  const searchPatterns = () => {
    if (nodes.length === 0) return;

    let currId = 0;
    const found: { pattern: string; index: number }[] = [];
    let stepLog = "";

    for (let i = 0; i < searchText.length; i++) {
      const char = searchText[i];
      
      while (currId !== null && nodes[currId].children[char] === undefined) {
        currId = nodes[currId].fail!;
      }

      if (currId === null) {
        currId = 0;
      } else {
        currId = nodes[currId].children[char];
      }

      const nodeOutputs = nodes[currId].output;
      if (nodeOutputs.length > 0) {
        for (const pattern of nodeOutputs) {
          found.push({ pattern, index: i - pattern.length + 1 });
        }
      }
    }

    setMatches(found);
    setCurrentStep(`Search complete. Found ${found.length} matches.`);
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Aho-Corasick Trie & Failure Links Visualizer
      </h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Patterns (comma-separated):
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
            value={patternsInput}
            onChange={(e) => setPatternsInput(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Search Text:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={buildAutomaton}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            Build Automaton
          </button>
          <button
            onClick={searchPatterns}
            disabled={nodes.length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition"
          >
            Search Text
          </button>
        </div>
      </div>

      {currentStep && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-mono mb-4">
          {currentStep}
        </div>
      )}

      {nodes.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200">
            Trie Automaton Nodes:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-1">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="p-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-gray-800 rounded-xl text-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">Node ID: {node.id}</span>
                  <span className="ml-2 px-1.5 py-0.5 bg-gray-200 dark:bg-zinc-700 rounded font-mono">
                    '{node.char}'
                  </span>
                </div>
                <div className="mt-2 text-gray-500">
                  <div>Fail Link: {node.fail === null ? "None" : `Node ${node.fail}`}</div>
                  <div>Children: {JSON.stringify(node.children)}</div>
                  {node.output.length > 0 && (
                    <div className="text-green-600 font-semibold mt-1">
                      Output: {node.output.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200">
            Matching Occurrences:
          </h4>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-2">
            {matches.map((m, idx) => (
              <div key={idx} className="text-xs font-mono">
                Pattern <span className="text-green-500 font-bold">"{m.pattern}"</span> matched at character index <span className="font-bold">{m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const AhoCorasickVisualizer = withVisualizerErrorBoundary(AhoCorasickVisualizerComponent);
