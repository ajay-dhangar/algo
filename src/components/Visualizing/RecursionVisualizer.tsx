import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaUndo,
  FaInfoCircle,
  FaTerminal,
  FaLayerGroup,
  FaCogs,
} from "react-icons/fa";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";

type AlgorithmType = "fibonacci" | "factorial" | "binarySearch" | "mergeSort";

interface StackFrame {
  id: string;
  label: string;
  params: Record<string, any>;
}

interface TreeNode {
  id: string;
  label: string;
  params: Record<string, any>;
  status: "pending" | "active" | "resolved";
  children: string[];
  parent: string;
  depth: number;
  x: number;
  y: number;
  returnValue?: any;
}

interface TraceStep {
  stack: StackFrame[];
  treeNodes: Record<string, TreeNode>;
  activeNodeId: string | null;
  description: string;
  variables: Record<string, any>;
}

const getLineCount = (value: string): number => Math.max(1, value.split(/\r\n|\r|\n/).length);

function RecursionVisualizer() {
  const [algo, setAlgo] = useState<AlgorithmType>("fibonacci");
  
  // Inputs
  const [fibN, setFibN] = useState<number>(4);
  const [factN, setFactN] = useState<number>(5);
  const [bsTarget, setBsTarget] = useState<number>(13);
  const [bsArrayStr, setBsArrayStr] = useState<string>("1, 3, 5, 7, 9, 11, 13, 15");
  const [msArrayStr, setMsArrayStr] = useState<string>("5, 2, 8, 3");

  // Trace state
  const [steps, setSteps] = useState<TraceStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms per step
  const [treeWidth, setTreeWidth] = useState<number>(600);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace based on current configurations
  const generateTrace = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    if (algo === "fibonacci") {
      const { steps: fibSteps, width } = generateFibTrace(fibN);
      setSteps(fibSteps);
      setTreeWidth(width);
    } else if (algo === "factorial") {
      const { steps: factSteps, width } = generateFactTrace(factN);
      setSteps(factSteps);
      setTreeWidth(width);
    } else if (algo === "binarySearch") {
      const arr = bsArrayStr.split(",").map(x => Number(x.trim())).filter(x => !isNaN(x));
      const { steps: bsSteps, width } = generateBSTrace(arr, bsTarget);
      setSteps(bsSteps);
      setTreeWidth(width);
    } else if (algo === "mergeSort") {
      const arr = msArrayStr.split(",").map(x => Number(x.trim())).filter(x => !isNaN(x));
      const { steps: msSteps, width } = generateMergeSortTrace(arr);
      setSteps(msSteps);
      setTreeWidth(width);
    }
    setCurrentStepIdx(0);
  };

  // Re-generate trace whenever algo or inputs change
  useEffect(() => {
    generateTrace();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [algo, fibN, factN, bsTarget, bsArrayStr, msArrayStr]);

  // Autoplay control
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps, speed]);

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // --- TRACE GENERATORS ---

  // 1. Fibonacci Trace
  function generateFibTrace(n: number) {
    const stepsList: TraceStep[] = [];
    const nodes: Record<string, TreeNode> = {};
    const activeStack: StackFrame[] = [];
    let nodeIdCounter = 0;

    function buildTree(val: number, parentId: string = ""): string {
      const id = `node_${nodeIdCounter++}`;
      nodes[id] = {
        id,
        label: `fib(${val})`,
        params: { n: val },
        status: "pending",
        children: [],
        parent: parentId,
        depth: parentId ? nodes[parentId].depth + 1 : 0,
        x: 0,
        y: 0,
      };
      if (parentId) {
        nodes[parentId].children.push(id);
      }
      if (val > 1) {
        buildTree(val - 1, id);
        buildTree(val - 2, id);
      }
      return id;
    }

    const rootId = buildTree(n);

    // Compute layout
    let leafCount = 0;
    function computeCoordinates(id: string) {
      const node = nodes[id];
      node.y = (node.depth + 1) * 80;
      if (node.children.length === 0) {
        node.x = ++leafCount * 90;
      } else {
        node.children.forEach(computeCoordinates);
        const firstChildX = nodes[node.children[0]].x;
        const lastChildX = nodes[node.children[node.children.length - 1]].x;
        node.x = (firstChildX + lastChildX) / 2;
      }
    }
    computeCoordinates(rootId);

    const minX = Math.min(...Object.values(nodes).map((n) => n.x));
    const maxX = Math.max(...Object.values(nodes).map((n) => n.x));
    const width = maxX - minX;

    function runFib(val: number, id: string): number {
      activeStack.push({ id, label: `fib(${val})`, params: { n: val } });
      nodes[id].status = "active";
      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Calling fib(${val}). Checking base cases.`,
        variables: { n: val },
      });

      if (val <= 1) {
        nodes[id].status = "resolved";
        nodes[id].returnValue = val;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Base case hit! fib(${val}) returns ${val}.`,
          variables: { n: val, return: val },
        });
        return val;
      }

      const leftChildId = nodes[id].children[0];
      const rightChildId = nodes[id].children[1];

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `fib(${val}) requires fib(${val - 1}) + fib(${val - 2}). Dispatching left branch.`,
        variables: { n: val },
      });

      const leftVal = runFib(val - 1, leftChildId);

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Left branch fib(${val - 1}) returned ${leftVal}. Dispatching right branch fib(${val - 2}).`,
        variables: { n: val, leftResult: leftVal },
      });

      const rightVal = runFib(val - 2, rightChildId);
      const sum = leftVal + rightVal;

      nodes[id].status = "resolved";
      nodes[id].returnValue = sum;
      activeStack.pop();

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: nodes[id].parent || null,
        description: `Both sub-calls resolved: fib(${val - 1}) = ${leftVal}, fib(${val - 2}) = ${rightVal}. fib(${val}) returns ${sum}.`,
        variables: { n: val, leftResult: leftVal, rightResult: rightVal, return: sum },
      });

      return sum;
    }

    stepsList.push({
      stack: [],
      treeNodes: JSON.parse(JSON.stringify(nodes)),
      activeNodeId: null,
      description: `Initializing recursion visualizer for Fibonacci(n = ${n}).`,
      variables: {},
    });

    runFib(n, rootId);
    return { steps: stepsList, width: width + 150 };
  }

  // 2. Factorial Trace
  function generateFactTrace(n: number) {
    const stepsList: TraceStep[] = [];
    const nodes: Record<string, TreeNode> = {};
    const activeStack: StackFrame[] = [];
    let nodeIdCounter = 0;

    function buildTree(val: number, parentId: string = ""): string {
      const id = `node_${nodeIdCounter++}`;
      nodes[id] = {
        id,
        label: `${val}!`,
        params: { n: val },
        status: "pending",
        children: [],
        parent: parentId,
        depth: parentId ? nodes[parentId].depth + 1 : 0,
        x: 200,
        y: 0,
      };
      if (parentId) {
        nodes[parentId].children.push(id);
      }
      if (val > 1) {
        buildTree(val - 1, id);
      }
      return id;
    }

    const rootId = buildTree(n);
    Object.values(nodes).forEach((node) => {
      node.y = (node.depth + 1) * 80;
      node.x = 250 + node.depth * 30; // staggered list
    });

    function runFact(val: number, id: string): number {
      activeStack.push({ id, label: `${val}!`, params: { n: val } });
      nodes[id].status = "active";
      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Calling ${val}!. Evaluating base case.`,
        variables: { n: val },
      });

      if (val <= 1) {
        nodes[id].status = "resolved";
        nodes[id].returnValue = 1;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Base case reached! 1! = 1.`,
          variables: { n: val, return: 1 },
        });
        return 1;
      }

      const childId = nodes[id].children[0];
      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Calculating ${val} * (${val - 1})!. Pushing recursive sub-call.`,
        variables: { n: val },
      });

      const childVal = runFact(val - 1, childId);
      const result = val * childVal;

      nodes[id].status = "resolved";
      nodes[id].returnValue = result;
      activeStack.pop();

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: nodes[id].parent || null,
        description: `Recursive call returned (${val - 1})! = ${childVal}. Computing ${val} * ${childVal} = ${result}.`,
        variables: { n: val, childResult: childVal, return: result },
      });

      return result;
    }

    stepsList.push({
      stack: [],
      treeNodes: JSON.parse(JSON.stringify(nodes)),
      activeNodeId: null,
      description: `Initializing recursion visualizer for Factorial(n = ${n}).`,
      variables: {},
    });

    runFact(n, rootId);
    return { steps: stepsList, width: 600 };
  }

  // 3. Binary Search Trace
  function generateBSTrace(arr: number[], target: number) {
    const stepsList: TraceStep[] = [];
    const nodes: Record<string, TreeNode> = {};
    const activeStack: StackFrame[] = [];
    let nodeIdCounter = 0;

    function buildTree(low: number, high: number, parentId: string = ""): string {
      const id = `node_${nodeIdCounter++}`;
      const mid = Math.floor((low + high) / 2);
      const midVal = arr[mid];
      nodes[id] = {
        id,
        label: `bs(${low}, ${high})`,
        params: { low, high, mid, midVal },
        status: "pending",
        children: [],
        parent: parentId,
        depth: parentId ? nodes[parentId].depth + 1 : 0,
        x: 250,
        y: 0,
      };
      if (parentId) {
        nodes[parentId].children.push(id);
      }
      
      if (low <= high && midVal !== target) {
        if (midVal < target) {
          buildTree(mid + 1, high, id);
        } else {
          buildTree(low, mid - 1, id);
        }
      }
      return id;
    }

    const rootId = buildTree(0, arr.length - 1);
    Object.values(nodes).forEach((node) => {
      node.y = (node.depth + 1) * 80;
      node.x = 250 + node.depth * 30;
    });

    function runBS(low: number, high: number, id: string): number {
      activeStack.push({ id, label: `bs(${low}, ${high})`, params: { low, high } });
      nodes[id].status = "active";
      const mid = Math.floor((low + high) / 2);
      const midVal = arr[mid];

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Evaluating bs(low=${low}, high=${high}). Middle index is ${mid} (value ${midVal}).`,
        variables: { low, high, mid, midVal },
      });

      if (low > high) {
        nodes[id].status = "resolved";
        nodes[id].returnValue = -1;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Base case: low (${low}) > high (${high}). Target not found.`,
          variables: { low, high, return: -1 },
        });
        return -1;
      }

      if (midVal === target) {
        nodes[id].status = "resolved";
        nodes[id].returnValue = mid;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Target ${target} found at mid index ${mid}! Returning ${mid}.`,
          variables: { low, high, mid, midVal, return: mid },
        });
        return mid;
      }

      const childId = nodes[id].children[0];
      if (midVal < target) {
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: id,
          description: `mid value ${midVal} < target ${target}. Searching right branch: bs(${mid + 1}, ${high}).`,
          variables: { low, high, mid, midVal },
        });
        const res = runBS(mid + 1, high, childId);
        nodes[id].status = "resolved";
        nodes[id].returnValue = res;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Right branch returned index ${res}.`,
          variables: { low, high, mid, midVal, return: res },
        });
        return res;
      } else {
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: id,
          description: `mid value ${midVal} > target ${target}. Searching left branch: bs(${low}, ${mid - 1}).`,
          variables: { low, high, mid, midVal },
        });
        const res = runBS(low, mid - 1, childId);
        nodes[id].status = "resolved";
        nodes[id].returnValue = res;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Left branch returned index ${res}.`,
          variables: { low, high, mid, midVal, return: res },
        });
        return res;
      }
    }

    stepsList.push({
      stack: [],
      treeNodes: JSON.parse(JSON.stringify(nodes)),
      activeNodeId: null,
      description: `Initializing Binary Search for target ${target} on array [${arr.join(", ")}].`,
      variables: {},
    });

    runBS(0, arr.length - 1, rootId);
    return { steps: stepsList, width: 600 };
  }

  // 4. Merge Sort Trace
  function generateMergeSortTrace(arr: number[]) {
    const stepsList: TraceStep[] = [];
    const nodes: Record<string, TreeNode> = {};
    const activeStack: StackFrame[] = [];
    let nodeIdCounter = 0;

    function buildTree(low: number, high: number, parentId: string = ""): string {
      const id = `node_${nodeIdCounter++}`;
      const subArr = arr.slice(low, high + 1);
      nodes[id] = {
        id,
        label: `ms(${low}, ${high})`,
        params: { low, high, subArr },
        status: "pending",
        children: [],
        parent: parentId,
        depth: parentId ? nodes[parentId].depth + 1 : 0,
        x: 0,
        y: 0,
      };
      if (parentId) {
        nodes[parentId].children.push(id);
      }
      if (low < high) {
        const mid = Math.floor((low + high) / 2);
        buildTree(low, mid, id);
        buildTree(mid + 1, high, id);
      }
      return id;
    }

    const rootId = buildTree(0, arr.length - 1);

    // Compute layout
    let leafCount = 0;
    function computeCoordinates(id: string) {
      const node = nodes[id];
      node.y = (node.depth + 1) * 85;
      if (node.children.length === 0) {
        node.x = ++leafCount * 110;
      } else {
        node.children.forEach(computeCoordinates);
        const firstChildX = nodes[node.children[0]].x;
        const lastChildX = nodes[node.children[node.children.length - 1]].x;
        node.x = (firstChildX + lastChildX) / 2;
      }
    }
    computeCoordinates(rootId);

    const minX = Math.min(...Object.values(nodes).map((n) => n.x));
    const maxX = Math.max(...Object.values(nodes).map((n) => n.x));
    const width = maxX - minX;

    function runMS(low: number, high: number, id: string): number[] {
      const subArr = arr.slice(low, high + 1);
      activeStack.push({ id, label: `ms(${low}, ${high})`, params: { low, high } });
      nodes[id].status = "active";
      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Calling ms(${low}, ${high}) on partition [${subArr.join(", ")}].`,
        variables: { low, high, subArr },
      });

      if (low >= high) {
        nodes[id].status = "resolved";
        const val = [arr[low]];
        nodes[id].returnValue = `[${val.join(", ")}]`;
        activeStack.pop();
        stepsList.push({
          stack: [...activeStack],
          treeNodes: JSON.parse(JSON.stringify(nodes)),
          activeNodeId: nodes[id].parent || null,
          description: `Base case: partition size <= 1. Returning [${arr[low]}].`,
          variables: { low, high, return: val },
        });
        return val;
      }

      const mid = Math.floor((low + high) / 2);
      const leftChildId = nodes[id].children[0];
      const rightChildId = nodes[id].children[1];

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Splitting partition at index ${mid}. Launching left partition ms(${low}, ${mid}).`,
        variables: { low, high, mid },
      });

      const leftSorted = runMS(low, mid, leftChildId);

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: id,
        description: `Left partition resolved to [${leftSorted.join(", ")}]. Launching right partition ms(${mid + 1}, ${high}).`,
        variables: { low, high, mid, leftResult: leftSorted },
      });

      const rightSorted = runMS(mid + 1, high, rightChildId);

      // Merge sorted arrays
      const merged: number[] = [];
      let i = 0, j = 0;
      while (i < leftSorted.length && j < rightSorted.length) {
        if (leftSorted[i] <= rightSorted[j]) {
          merged.push(leftSorted[i++]);
        } else {
          merged.push(rightSorted[j++]);
        }
      }
      while (i < leftSorted.length) merged.push(leftSorted[i++]);
      while (j < rightSorted.length) merged.push(rightSorted[j++]);

      nodes[id].status = "resolved";
      nodes[id].returnValue = `[${merged.join(", ")}]`;
      activeStack.pop();

      stepsList.push({
        stack: [...activeStack],
        treeNodes: JSON.parse(JSON.stringify(nodes)),
        activeNodeId: nodes[id].parent || null,
        description: `Merged [${leftSorted.join(", ")}] and [${rightSorted.join(", ")}] into sorted partition [${merged.join(", ")}].`,
        variables: { low, high, mid, leftResult: leftSorted, rightResult: rightSorted, return: merged },
      });

      return merged;
    }

    stepsList.push({
      stack: [],
      treeNodes: JSON.parse(JSON.stringify(nodes)),
      activeNodeId: null,
      description: `Initializing Merge Sort visualizer for array [${arr.join(", ")}].`,
      variables: {},
    });

    runMS(0, arr.length - 1, rootId);
    return { steps: stepsList, width: width + 150 };
  }

  // Current Step details
  const currentStep = steps[currentStepIdx] || {
    stack: [],
    treeNodes: {},
    activeNodeId: null,
    description: "Initializing visualizer...",
    variables: {},
  };

  return (
    <div style={{ padding: "1.5rem 0", color: "var(--ifm-font-color-base)" }}>
      {/* Top Configuration & Control Bar */}
      <div
        style={{
          background: "var(--ifm-card-background-color)",
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-end" }}>
          {/* Select Algorithm */}
          <div style={{ flex: "1 1 200px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Select Algorithm
            </label>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value as AlgorithmType)}
              style={{
                width: "100%",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--ifm-color-emphasis-400)",
                background: "var(--ifm-background-color)",
                color: "var(--ifm-font-color-base)",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <option value="fibonacci">Fibonacci Sequence</option>
              <option value="factorial">Factorial</option>
              <option value="binarySearch">Binary Search</option>
              <option value="mergeSort">Merge Sort Partitioning</option>
            </select>
          </div>

          {/* Algorithm-Specific Inputs */}
          {algo === "fibonacci" && (
            <div style={{ flex: "1 1 120px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                N (Max 6)
              </label>
              <input
                type="number"
                min={0}
                max={6}
                value={fibN}
                onChange={(e) => setFibN(Math.min(6, Math.max(0, Number(e.target.value))))}
                style={{
                  width: "100%",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--ifm-color-emphasis-400)",
                  background: "var(--ifm-background-color)",
                  color: "var(--ifm-font-color-base)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          )}

          {algo === "factorial" && (
            <div style={{ flex: "1 1 120px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                N (Max 8)
              </label>
              <input
                type="number"
                min={0}
                max={8}
                value={factN}
                onChange={(e) => setFactN(Math.min(8, Math.max(0, Number(e.target.value))))}
                style={{
                  width: "100%",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--ifm-color-emphasis-400)",
                  background: "var(--ifm-background-color)",
                  color: "var(--ifm-font-color-base)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          )}

          {algo === "binarySearch" && (
            <>
              <div style={{ flex: "2 1 200px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Sorted Array
                </label>
                <input
                  type="text"
                  value={bsArrayStr}
                  onChange={(e) => setBsArrayStr(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--ifm-color-emphasis-400)",
                    background: "var(--ifm-background-color)",
                    color: "var(--ifm-font-color-base)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
              <div style={{ flex: "1 1 100px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Target
                </label>
                <input
                  type="number"
                  value={bsTarget}
                  onChange={(e) => setBsTarget(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--ifm-color-emphasis-400)",
                    background: "var(--ifm-background-color)",
                    color: "var(--ifm-font-color-base)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
            </>
          )}

          {algo === "mergeSort" && (
            <div style={{ flex: "2 1 200px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Array to Sort
              </label>
              <input
                type="text"
                value={msArrayStr}
                onChange={(e) => setMsArrayStr(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid var(--ifm-color-emphasis-400)",
                  background: "var(--ifm-background-color)",
                  color: "var(--ifm-font-color-base)",
                  fontSize: "0.9rem",
                }}
              />
            </div>
          )}

          {/* Stepping controls */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "nowrap" }}>
            <button
              onClick={handleStepBackward}
              disabled={currentStepIdx === 0}
              title="Step Backward"
              style={{
                padding: "0.65rem 0.8rem",
                borderRadius: "8px",
                border: "none",
                background: "var(--ifm-color-emphasis-200)",
                color: "var(--ifm-font-color-base)",
                cursor: currentStepIdx === 0 ? "not-allowed" : "pointer",
                opacity: currentStepIdx === 0 ? 0.5 : 1,
              }}
            >
              <FaStepBackward />
            </button>

            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                disabled={currentStepIdx >= steps.length - 1}
                title="Play Autoplay"
                style={{
                  padding: "0.65rem 1.2rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#16a34a",
                  color: "white",
                  cursor: currentStepIdx >= steps.length - 1 ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  opacity: currentStepIdx >= steps.length - 1 ? 0.5 : 1,
                }}
              >
                <FaPlay /> Play
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                title="Pause Autoplay"
                style={{
                  padding: "0.65rem 1.2rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#dc2626",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaPause /> Pause
              </button>
            )}

            <button
              onClick={handleStepForward}
              disabled={currentStepIdx >= steps.length - 1}
              title="Step Forward"
              style={{
                padding: "0.65rem 0.8rem",
                borderRadius: "8px",
                border: "none",
                background: "var(--ifm-color-emphasis-200)",
                color: "var(--ifm-font-color-base)",
                cursor: currentStepIdx >= steps.length - 1 ? "not-allowed" : "pointer",
                opacity: currentStepIdx >= steps.length - 1 ? 0.5 : 1,
              }}
            >
              <FaStepForward />
            </button>

            <button
              onClick={handleReset}
              title="Reset"
              style={{
                padding: "0.65rem 0.8rem",
                borderRadius: "8px",
                border: "none",
                background: "var(--ifm-color-emphasis-200)",
                color: "var(--ifm-font-color-base)",
                cursor: "pointer",
              }}
            >
              <FaUndo /> Reset
            </button>
          </div>

          {/* Speed slider */}
          <div style={{ flex: "1 1 150px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
              Autoplay Speed ({speed}ms)
            </label>
            <input
              type="range"
              min={200}
              max={2000}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", lg: "1fr 1fr", gap: "2rem" }} className="grid lg:grid-cols-12">
        {/* Left Side: Recursion Tree Visualizer (takes 8 cols on large screen) */}
        <div
          className="lg:col-span-8 flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md"
          style={{ height: "550px" }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem 1.5rem",
              background: "var(--ifm-color-emphasis-100)",
              borderBottom: "1px solid var(--ifm-color-emphasis-300)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "between",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaTerminal /> Recursion Tree View
            </span>
            <span style={{ fontSize: "0.8rem", fontWeight: "normal", color: "var(--ifm-color-emphasis-600)" }}>
              Step {currentStepIdx + 1} of {steps.length}
            </span>
          </div>

          {/* Canvas SVG Area */}
          <div style={{ flexGrow: 1, padding: "1rem", overflow: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", background: "var(--ifm-background-color)" }}>
            {Object.keys(currentStep.treeNodes).length === 0 ? (
              <div style={{ padding: "4rem", textAlign: "center", fontStyle: "italic", color: "gray" }}>
                Generate recursion structure...
              </div>
            ) : (
              <svg
                width={Math.max(treeWidth, 550)}
                height={Math.max(...Object.values(currentStep.treeNodes).map((n) => n.y)) + 100}
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Glowing active node outline filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Render Edges */}
                {Object.values(currentStep.treeNodes).map((node) => {
                  if (!node.parent) return null;
                  const parentNode = currentStep.treeNodes[node.parent];
                  if (!parentNode) return null;

                  // Highlight link if child is active or parent is active
                  const isActiveEdge = node.status === "active" || (parentNode.status === "active" && node.status !== "pending");
                  const isResolvedEdge = node.status === "resolved";

                  let strokeColor = "var(--ifm-color-emphasis-300)";
                  let strokeWidth = 2;
                  let strokeDash = "0";

                  if (isActiveEdge) {
                    strokeColor = "#3b82f6";
                    strokeWidth = 3;
                  } else if (isResolvedEdge) {
                    strokeColor = "#16a34a";
                    strokeWidth = 2;
                  } else {
                    strokeDash = "4 4";
                  }

                  return (
                    <line
                      key={`edge-${node.id}`}
                      x1={parentNode.x}
                      y1={parentNode.y}
                      x2={node.x}
                      y2={node.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDash}
                      style={{ transition: "all 0.5s ease" }}
                    />
                  );
                })}

                {/* Render Nodes */}
                {Object.values(currentStep.treeNodes).map((node) => {
                  const isActive = node.id === currentStep.activeNodeId;
                  const isPending = node.status === "pending";
                  const isResolved = node.status === "resolved";

                  let fill = "var(--ifm-card-background-color)";
                  let stroke = "var(--ifm-color-emphasis-400)";
                  let strokeWidth = 2;
                  let filter = undefined;

                  if (isActive) {
                    fill = "var(--ifm-color-emphasis-100)";
                    stroke = "#3b82f6";
                    strokeWidth = 4;
                    filter = "url(#glow)";
                  } else if (isResolved) {
                    fill = "#e2fbe8";
                    stroke = "#16a34a";
                  }

                  return (
                    <g key={node.id} style={{ cursor: "pointer", transition: "all 0.5s ease" }}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={24}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        filter={filter}
                        style={{ transition: "all 0.5s ease" }}
                      />
                      {/* Node label */}
                      <text
                        x={node.x}
                        y={node.y - 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                          fill: "var(--ifm-font-color-base)",
                        }}
                      >
                        {node.label}
                      </text>
                      {/* Resolved return value label underneath node */}
                      {isResolved && node.returnValue !== undefined && (
                        <g>
                          <rect
                            x={node.x - 22}
                            y={node.y + 12}
                            width={44}
                            height={15}
                            rx={4}
                            fill="#16a34a"
                          />
                          <text
                            x={node.x}
                            y={node.y + 20}
                            textAnchor="middle"
                            style={{
                              fontSize: "9px",
                              fontWeight: "bold",
                              fill: "white",
                            }}
                          >
                            ={node.returnValue}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        {/* Right Side: Stack & State Info Panel (takes 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Call Stack Panel */}
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md flex flex-col">
            <div
              style={{
                padding: "1rem 1.25rem",
                background: "var(--ifm-color-emphasis-100)",
                borderBottom: "1px solid var(--ifm-color-emphasis-300)",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaLayerGroup /> Call Stack
            </div>
            <div
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column-reverse",
                gap: "0.5rem",
                minHeight: "180px",
                background: "var(--ifm-background-color)",
                maxHeight: "260px",
                overflowY: "auto",
              }}
            >
              {currentStep.stack.length === 0 ? (
                <div style={{ color: "gray", textAlign: "center", fontStyle: "italic", padding: "1rem" }}>
                  Stack is empty.
                </div>
              ) : (
                currentStep.stack.map((frame, index) => {
                  const isTop = index === currentStep.stack.length - 1;
                  return (
                    <div
                      key={`frame-${frame.id}-${index}`}
                      style={{
                        padding: "0.6rem 1rem",
                        borderRadius: "8px",
                        borderLeft: `5px solid ${isTop ? "#3b82f6" : "#64748b"}`,
                        background: "var(--ifm-card-background-color)",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        fontWeight: isTop ? "bold" : "normal",
                        fontSize: "0.85rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transform: "translateY(0)",
                        transition: "all 0.3s ease",
                        animation: "slideIn 0.3s ease-out",
                      }}
                    >
                      <span>{frame.label}</span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          background: "var(--ifm-color-emphasis-200)",
                          padding: "0.15rem 0.4rem",
                          borderRadius: "4px",
                          color: "gray",
                        }}
                      >
                        Depth: {index}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* State Variables Panel */}
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md flex flex-col">
            <div
              style={{
                padding: "1rem 1.25rem",
                background: "var(--ifm-color-emphasis-100)",
                borderBottom: "1px solid var(--ifm-color-emphasis-300)",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaCogs /> State & Local Variables
            </div>
            <div style={{ padding: "1.25rem", background: "var(--ifm-background-color)" }}>
              {Object.keys(currentStep.variables).length === 0 ? (
                <div style={{ color: "gray", fontStyle: "italic" }}>No active variables.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {Object.entries(currentStep.variables).map(([key, val]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.4rem 0.8rem",
                        background: "var(--ifm-card-background-color)",
                        border: "1px solid var(--ifm-color-emphasis-200)",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        fontFamily: "monospace",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{key}</span>
                      <span>{JSON.stringify(val)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Explanation Panel */}
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md flex flex-col">
            <div
              style={{
                padding: "1rem 1.25rem",
                background: "var(--ifm-color-emphasis-100)",
                borderBottom: "1px solid var(--ifm-color-emphasis-300)",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaInfoCircle /> Explanation
            </div>
            <div
              style={{
                padding: "1.25rem",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                background: "var(--ifm-background-color)",
                minHeight: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p style={{ margin: 0, fontWeight: "500" }}>{currentStep.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Keyframes for Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default withVisualizerErrorBoundary(RecursionVisualizer);
