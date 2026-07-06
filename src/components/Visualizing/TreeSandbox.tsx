import React, { useState, useEffect, useCallback, useRef } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { useColorMode } from "@docusaurus/theme-common";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  Flame,
  Check,
  Info,
  Cpu,
  Sliders,
  BookOpen
} from "lucide-react";

// Structure of a tree node
interface NodeData {
  key: number;
  id: string; // stable identifier for anims/rendering
  leftId: string | null;
  rightId: string | null;
  height: number;
}

// Tree map representing the entire tree structure by ID
type TreeMap = Record<string, NodeData>;

// Position coordinate mapping
interface NodePosition {
  x: number;
  y: number;
}

// Interactive trace step
interface SimulationStep {
  tree: TreeMap;
  rootId: string | null;
  highlightedIds: string[]; // nodes currently active
  successIds: string[];     // node found or inserted
  warningIds: string[];     // unbalanced node
  rotationIds: string[];    // nodes involved in rotation
  explanation: string;
  visitedKeys: number[];    // keys printed out in traversal order
  actionNodeKey?: number;   // active target key
}

// Pre-defined AVL Rotation tutorials
interface RotationRecipe {
  id: string;
  name: string;
  keys: number[];
  type: "LL" | "RR" | "LR" | "RL";
  description: string;
}

export default function TreeSandbox() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Mode state: BST vs AVL
  const [treeMode, setTreeMode] = useState<"BST" | "AVL">("AVL");
  const [inputKey, setInputKey] = useState<string>("25");

  // Main tree state representation
  const [treeMap, setTreeMap] = useState<TreeMap>({});
  const [rootId, setRootId] = useState<string | null>(null);

  // Stepper/simulation timeline states
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1000); // ms delay
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Node helper functions
  const createNode = (key: number): NodeData => {
    const id = Math.random().toString(36).substring(2, 9);
    return {
      key,
      id,
      leftId: null,
      rightId: null,
      height: 1
    };
  };

  const cloneTreeMap = (map: TreeMap): TreeMap => {
    const newMap: TreeMap = {};
    for (const key in map) {
      newMap[key] = { ...map[key] };
    }
    return newMap;
  };

  const getHeight = (nodeId: string | null, map: TreeMap): number => {
    if (!nodeId || !map[nodeId]) return 0;
    return map[nodeId].height;
  };

  const getBalanceFactor = (nodeId: string | null, map: TreeMap): number => {
    if (!nodeId || !map[nodeId]) return 0;
    const node = map[nodeId];
    return getHeight(node.leftId, map) - getHeight(node.rightId, map);
  };

  const updateHeight = (nodeId: string, map: TreeMap) => {
    const node = map[nodeId];
    node.height = Math.max(getHeight(node.leftId, map), getHeight(node.rightId, map)) + 1;
  };

  // Generate layouts dynamically based on SVG size
  const calculateNodePositions = useCallback((
    root: string | null,
    map: TreeMap,
    width = 800,
    height = 360
  ): Record<string, NodePosition> => {
    const positions: Record<string, NodePosition> = {};
    if (!root) return positions;

    const traverse = (
      nodeId: string,
      depth: number,
      xMin: number,
      xMax: number
    ) => {
      const node = map[nodeId];
      if (!node) return;

      const x = (xMin + xMax) / 2;
      const y = 40 + depth * 65;
      positions[nodeId] = { x, y };

      if (node.leftId) {
        traverse(node.leftId, depth + 1, xMin, x);
      }
      if (node.rightId) {
        traverse(node.rightId, depth + 1, x, xMax);
      }
    };

    traverse(root, 0, 0, width);
    return positions;
  }, []);

  // Set up play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, playSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playSpeed]);

  // Apply a Simulation Step sequence
  const pushStep = (
    stepList: SimulationStep[],
    currentMap: TreeMap,
    currentRoot: string | null,
    highlighted: string[],
    success: string[],
    warning: string[],
    rotation: string[],
    explanation: string,
    visited: number[] = [],
    actionKey?: number
  ) => {
    stepList.push({
      tree: cloneTreeMap(currentMap),
      rootId: currentRoot,
      highlightedIds: [...highlighted],
      successIds: [...success],
      warningIds: [...warning],
      rotationIds: [...rotation],
      explanation,
      visitedKeys: [...visited],
      actionNodeKey: actionKey
    });
  };

  // --- INTERACTION: SEARCH ---
  const triggerSearch = (key: number) => {
    setIsPlaying(false);
    if (isNaN(key) || key < 1 || key > 99) {
      alert(translate({ message: "Please enter a valid integer between 1 and 99." }));
      return;
    }
    if (!rootId) return;

    const searchSteps: SimulationStep[] = [];
    let currId: string | null = rootId;
    const path: string[] = [];

    pushStep(
      searchSteps,
      treeMap,
      rootId,
      [],
      [],
      [],
      [],
      translate({
        message: "Starting search for key {key} at the root.",
        values: { key }
      }),
      [],
      key
    );

    while (currId) {
      const node = treeMap[currId];
      path.push(currId);

      if (node.key === key) {
        pushStep(
          searchSteps,
          treeMap,
          rootId,
          [...path],
          [currId],
          [],
          [],
          translate({
            message: "Found node {key}!",
            values: { key }
          }),
          [],
          key
        );
        break;
      }

      pushStep(
        searchSteps,
        treeMap,
        rootId,
        [...path],
        [],
        [],
        [],
        translate({
          message: "Inspecting node {nodeKey}. Since {key} {operator} {nodeKey}, branch {direction}.",
          values: {
            nodeKey: node.key,
            key,
            operator: key < node.key ? "<" : ">",
            direction: key < node.key ? translate({ message: "left" }) : translate({ message: "right" })
          }
        }),
        [],
        key
      );

      currId = key < node.key ? node.leftId : node.rightId;

      if (!currId) {
        pushStep(
          searchSteps,
          treeMap,
          rootId,
          [...path],
          [],
          [],
          [],
          translate({
            message: "Reached a leaf. Key {key} is not in the tree.",
            values: { key }
          }),
          [],
          key
        );
      }
    }

    setSteps(searchSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  // --- INTERACTION: INSERT ---
  const triggerInsert = (key: number) => {
    setIsPlaying(false);
    if (isNaN(key) || key < 1 || key > 99) {
      alert(translate({ message: "Please enter a valid integer between 1 and 99." }));
      return;
    }

    // Prevent duplicate entries
    const exists = Object.values(treeMap).some((n) => n.key === key);
    if (exists) {
      alert(translate({ message: "Key {key} already exists in the tree!", values: { key } }));
      return;
    }

    const insertSteps: SimulationStep[] = [];
    const tempMap = cloneTreeMap(treeMap);
    let tempRoot = rootId;

    pushStep(
      insertSteps,
      tempMap,
      tempRoot,
      [],
      [],
      [],
      [],
      translate({
        message: "Preparing to insert key {key}.",
        values: { key }
      }),
      [],
      key
    );

    // Core AVL/BST recursive insertion simulation
    const insertHelper = (nodeId: string | null, parentId: string | null, isLeft: boolean): string => {
      if (!nodeId) {
        const newNode = createNode(key);
        tempMap[newNode.id] = newNode;
        
        if (parentId) {
          const parent = tempMap[parentId];
          if (isLeft) parent.leftId = newNode.id;
          else parent.rightId = newNode.id;
          updateHeight(parentId, tempMap);
        } else {
          tempRoot = newNode.id;
        }

        pushStep(
          insertSteps,
          tempMap,
          tempRoot,
          parentId ? [parentId] : [],
          [newNode.id],
          [],
          [],
          translate({
            message: "Inserted new leaf node {key}.",
            values: { key }
          }),
          [],
          key
        );
        return newNode.id;
      }

      const node = tempMap[nodeId];
      pushStep(
        insertSteps,
        tempMap,
        tempRoot,
        [nodeId],
        [],
        [],
        [],
        translate({
          message: "Comparing key {key} with {nodeKey}. Since {key} {operator} {nodeKey}, go {direction}.",
          values: {
            nodeKey: node.key,
            key,
            operator: key < node.key ? "<" : ">",
            direction: key < node.key ? translate({ message: "left" }) : translate({ message: "right" })
          }
        }),
        [],
        key
      );

      if (key < node.key) {
        node.leftId = insertHelper(node.leftId, nodeId, true);
      } else {
        node.rightId = insertHelper(node.rightId, nodeId, false);
      }

      updateHeight(nodeId, tempMap);

      if (treeMode === "AVL") {
        const bf = getBalanceFactor(nodeId, tempMap);
        pushStep(
          insertSteps,
          tempMap,
          tempRoot,
          [nodeId],
          [],
          Math.abs(bf) > 1 ? [nodeId] : [],
          [],
          translate({
            message: "Inspecting balance factor of node {nodeKey}: Height = {height}, Balance Factor = {bf}.",
            values: { nodeKey: node.key, height: node.height, bf }
          }),
          [],
          key
        );

        // Left heavy
        if (bf > 1) {
          const leftNode = tempMap[node.leftId!];
          const leftBf = getBalanceFactor(node.leftId, tempMap);

          // Left Left (LL Case)
          if (leftBf >= 0) {
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [nodeId, node.leftId!],
              [],
              [nodeId],
              [nodeId, node.leftId!, leftNode.leftId!],
              translate({
                message: "Unbalance detected! Left-Left (LL) case at node {nodeKey}. Perform a Right Rotation.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            const rotated = rotateRight(nodeId, tempMap);
            if (parentId) {
              const p = tempMap[parentId];
              if (isLeft) p.leftId = rotated;
              else p.rightId = rotated;
            } else {
              tempRoot = rotated;
            }
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [rotated],
              [rotated],
              [],
              [],
              translate({
                message: "Right rotation around node {nodeKey} completed successfully. Heights re-calculated.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            return rotated;
          }
          // Left Right (LR Case)
          else {
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [nodeId, node.leftId!],
              [],
              [nodeId],
              [nodeId, node.leftId!, leftNode.rightId!],
              translate({
                message: "Unbalance detected! Left-Right (LR) case at node {nodeKey}. Perform Left Rotation on left child, then Right Rotation.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            
            // Step 1: Left rotate left child
            node.leftId = rotateLeft(node.leftId!, tempMap);
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [nodeId, node.leftId!],
              [],
              [nodeId],
              [],
              translate({
                message: "Stage 1: Left rotated child {childKey}. Now preparing to Right Rotate parent {nodeKey}.",
                values: { childKey: leftNode.key, nodeKey: node.key }
              }),
              [],
              key
            );

            // Step 2: Right rotate parent
            const rotated = rotateRight(nodeId, tempMap);
            if (parentId) {
              const p = tempMap[parentId];
              if (isLeft) p.leftId = rotated;
              else p.rightId = rotated;
            } else {
              tempRoot = rotated;
            }
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [rotated],
              [rotated],
              [],
              [],
              translate({
                message: "Stage 2: Right rotation around node {nodeKey} completed. Tree successfully balanced.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            return rotated;
          }
        }

        // Right heavy
        if (bf < -1) {
          const rightNode = tempMap[node.rightId!];
          const rightBf = getBalanceFactor(node.rightId, tempMap);

          // Right Right (RR Case)
          if (rightBf <= 0) {
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [nodeId, node.rightId!],
              [],
              [nodeId],
              [nodeId, node.rightId!, rightNode.rightId!],
              translate({
                message: "Unbalance detected! Right-Right (RR) case at node {nodeKey}. Perform a Left Rotation.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            const rotated = rotateLeft(nodeId, tempMap);
            if (parentId) {
              const p = tempMap[parentId];
              if (isLeft) p.leftId = rotated;
              else p.rightId = rotated;
            } else {
              tempRoot = rotated;
            }
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [rotated],
              [rotated],
              [],
              [],
              translate({
                message: "Left rotation around node {nodeKey} completed successfully. Heights re-calculated.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            return rotated;
          }
          // Right Left (RL Case)
          else {
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [nodeId, node.rightId!],
              [],
              [nodeId],
              [nodeId, node.rightId!, rightNode.leftId!],
              translate({
                message: "Unbalance detected! Right-Left (RL) case at node {nodeKey}. Perform Right Rotation on right child, then Left Rotation.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );

            // Step 1: Right rotate right child
            node.rightId = rotateRight(node.rightId!, tempMap);
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [nodeId, node.rightId!],
              [],
              [nodeId],
              [],
              translate({
                message: "Stage 1: Right rotated child {childKey}. Now preparing to Left Rotate parent {nodeKey}.",
                values: { childKey: rightNode.key, nodeKey: node.key }
              }),
              [],
              key
            );

            // Step 2: Left rotate parent
            const rotated = rotateLeft(nodeId, tempMap);
            if (parentId) {
              const p = tempMap[parentId];
              if (isLeft) p.leftId = rotated;
              else p.rightId = rotated;
            } else {
              tempRoot = rotated;
            }
            pushStep(
              insertSteps,
              tempMap,
              tempRoot,
              [rotated],
              [rotated],
              [],
              [],
              translate({
                message: "Stage 2: Left rotation around node {nodeKey} completed. Tree successfully balanced.",
                values: { nodeKey: node.key }
              }),
              [],
              key
            );
            return rotated;
          }
        }
      }

      return nodeId;
    };

    insertHelper(tempRoot, null, false);
    
    // Save state
    setSteps(insertSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);

    // Apply the final snapshot to treeMap instantly for state persistence
    const finalStep = insertSteps[insertSteps.length - 1];
    setTreeMap(finalStep.tree);
    setRootId(finalStep.rootId);
  };

  // AVL ROTATIONS CORE MATH
  const rotateRight = (zId: string, map: TreeMap): string => {
    const z = map[zId];
    const yId = z.leftId!;
    const y = map[yId];
    const T3Id = y.rightId;

    // Perform rotation
    y.rightId = zId;
    z.leftId = T3Id;

    // Update heights
    updateHeight(zId, map);
    updateHeight(yId, map);

    return yId;
  };

  const rotateLeft = (zId: string, map: TreeMap): string => {
    const z = map[zId];
    const yId = z.rightId!;
    const y = map[yId];
    const T2Id = y.leftId;

    // Perform rotation
    y.leftId = zId;
    z.rightId = T2Id;

    // Update heights
    updateHeight(zId, map);
    updateHeight(yId, map);

    return yId;
  };

  // --- INTERACTION: DELETE ---
  const triggerDelete = (key: number) => {
    setIsPlaying(false);
    if (isNaN(key) || key < 1 || key > 99) {
      alert(translate({ message: "Please enter a valid integer between 1 and 99." }));
      return;
    }

    const exists = Object.values(treeMap).some((n) => n.key === key);
    if (!exists) {
      alert(translate({ message: "Key {key} does not exist in the tree!", values: { key } }));
      return;
    }

    const deleteSteps: SimulationStep[] = [];
    const tempMap = cloneTreeMap(treeMap);
    let tempRoot = rootId;

    pushStep(
      deleteSteps,
      tempMap,
      tempRoot,
      [],
      [],
      [],
      [],
      translate({
        message: "Preparing to delete key {key}.",
        values: { key }
      }),
      [],
      key
    );

    // Helper to find the min value node key
    const findMinValue = (nodeId: string, map: TreeMap): number => {
      let curr = map[nodeId];
      while (curr.leftId) {
        curr = map[curr.leftId];
      }
      return curr.key;
    };

    const deleteHelper = (
      nodeId: string | null,
      parentId: string | null,
      isLeft: boolean,
      keyToDelete: number
    ): string | null => {
      if (!nodeId) return null;

      const node = tempMap[nodeId];
      pushStep(
        deleteSteps,
        tempMap,
        tempRoot,
        [nodeId],
        [],
        [],
        [],
        translate({
          message: "Comparing key {keyToDelete} with {nodeKey}.",
          values: { keyToDelete, nodeKey: node.key }
        }),
        [],
        keyToDelete
      );

      if (keyToDelete < node.key) {
        node.leftId = deleteHelper(node.leftId, nodeId, true, keyToDelete);
      } else if (keyToDelete > node.key) {
        node.rightId = deleteHelper(node.rightId, nodeId, false, keyToDelete);
      } else {
        // Node found!
        pushStep(
          deleteSteps,
          tempMap,
          tempRoot,
          [nodeId],
          [],
          [nodeId],
          [],
          translate({
            message: "Found node {keyToDelete} to delete. Evaluating children structure...",
            values: { keyToDelete }
          }),
          [],
          keyToDelete
        );

        // Node with 0 or 1 child
        if (!node.leftId || !node.rightId) {
          const tempChild = node.leftId ? node.leftId : node.rightId;
          
          if (!tempChild) {
            // No child case
            delete tempMap[nodeId];
            if (parentId) {
              const p = tempMap[parentId];
              if (isLeft) p.leftId = null;
              else p.rightId = null;
            } else {
              tempRoot = null;
            }
            pushStep(
              deleteSteps,
              tempMap,
              tempRoot,
              parentId ? [parentId] : [],
              [],
              [],
              [],
              translate({
                message: "Removed leaf node {keyToDelete}.",
                values: { keyToDelete }
              }),
              [],
              keyToDelete
            );
            return null;
          } else {
            // One child case
            delete tempMap[nodeId];
            if (parentId) {
              const p = tempMap[parentId];
              if (isLeft) p.leftId = tempChild;
              else p.rightId = tempChild;
            } else {
              tempRoot = tempChild;
            }
            pushStep(
              deleteSteps,
              tempMap,
              tempRoot,
              [tempChild],
              [tempChild],
              [],
              [],
              translate({
                message: "Replaced node {keyToDelete} with its only child node {childKey}.",
                values: { keyToDelete, childKey: tempMap[tempChild].key }
              }),
              [],
              keyToDelete
            );
            return tempChild;
          }
        } else {
          // Two children case
          const successorKey = findMinValue(node.rightId, tempMap);
          pushStep(
            deleteSteps,
            tempMap,
            tempRoot,
            [nodeId],
            [],
            [],
            [],
            translate({
              message: "Node {keyToDelete} has two children. Finding minimum value in right subtree (successor): {successorKey}.",
              values: { keyToDelete, successorKey }
            }),
            [],
            keyToDelete
          );

          // Copy successor value
          node.key = successorKey;
          pushStep(
            deleteSteps,
            tempMap,
            tempRoot,
            [nodeId],
            [nodeId],
            [],
            [],
            translate({
              message: "Copied successor key {successorKey} to target node. Now recursively deleting successor from right subtree.",
              values: { successorKey }
            }),
            [],
            keyToDelete
          );

          // Delete successor recursively and update rightId
          node.rightId = deleteHelper(node.rightId, nodeId, false, successorKey);
        }
      }

      updateHeight(nodeId, tempMap);

      // AVL Balancing on Walk Up
      if (treeMode === "AVL") {
        const bf = getBalanceFactor(nodeId, tempMap);
        pushStep(
          deleteSteps,
          tempMap,
          tempRoot,
          [nodeId],
          [],
          Math.abs(bf) > 1 ? [nodeId] : [],
          [],
          translate({
            message: "Inspecting balance of node {nodeKey} on way up: Height = {height}, Balance Factor = {bf}.",
            values: { nodeKey: node.key, height: node.height, bf }
          }),
          [],
          keyToDelete
        );

        if (bf > 1) {
          const leftBf = getBalanceFactor(node.leftId, tempMap);
          if (leftBf >= 0) {
            pushStep(
              deleteSteps,
              tempMap,
              tempRoot,
              [nodeId, node.leftId!],
              [],
              [nodeId],
              [nodeId, node.leftId!],
              translate({
                message: "Unbalance detected! Left-Left (LL) case. Perform a Right Rotation."
              }),
              [],
              keyToDelete
            );
            const rotated = rotateRight(nodeId, tempMap);
            return rotated;
          } else {
            pushStep(
              deleteSteps,
              tempMap,
              tempRoot,
              [nodeId, node.leftId!],
              [],
              [nodeId],
              [nodeId, node.leftId!],
              translate({
                message: "Unbalance detected! Left-Right (LR) case. Left rotating child, then Right rotating parent."
              }),
              [],
              keyToDelete
            );
            node.leftId = rotateLeft(node.leftId!, tempMap);
            return rotateRight(nodeId, tempMap);
          }
        }

        if (bf < -1) {
          const rightBf = getBalanceFactor(node.rightId, tempMap);
          if (rightBf <= 0) {
            pushStep(
              deleteSteps,
              tempMap,
              tempRoot,
              [nodeId, node.rightId!],
              [],
              [nodeId],
              [nodeId, node.rightId!],
              translate({
                message: "Unbalance detected! Right-Right (RR) case. Perform a Left Rotation."
              }),
              [],
              keyToDelete
            );
            const rotated = rotateLeft(nodeId, tempMap);
            return rotated;
          } else {
            pushStep(
              deleteSteps,
              tempMap,
              tempRoot,
              [nodeId, node.rightId!],
              [],
              [nodeId],
              [nodeId, node.rightId!],
              translate({
                message: "Unbalance detected! Right-Left (RL) case. Right rotating child, then Left rotating parent."
              }),
              [],
              keyToDelete
            );
            node.rightId = rotateRight(node.rightId!, tempMap);
            return rotateLeft(nodeId, tempMap);
          }
        }
      }

      return nodeId;
    };

    deleteHelper(tempRoot, null, false, key);

    setSteps(deleteSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);

    const finalStep = deleteSteps[deleteSteps.length - 1];
    setTreeMap(finalStep.tree);
    setRootId(finalStep.rootId);
  };

  // --- TRAVERSALS SIMULATIONS ---
  const triggerTraversal = (type: "in" | "pre" | "post" | "level") => {
    setIsPlaying(false);
    if (!rootId || Object.keys(treeMap).length === 0) return;

    const traversalSteps: SimulationStep[] = [];
    const visitedKeys: number[] = [];

    pushStep(
      traversalSteps,
      treeMap,
      rootId,
      [],
      [],
      [],
      [],
      translate({
        message: "Starting {type} traversal on root.",
        values: { type: type.toUpperCase() }
      }),
      []
    );

    if (type === "pre") {
      const traverse = (nodeId: string | null) => {
        if (!nodeId) return;
        const node = treeMap[nodeId];
        visitedKeys.push(node.key);
        pushStep(
          traversalSteps,
          treeMap,
          rootId,
          [nodeId],
          [nodeId],
          [],
          [],
          translate({
            message: "PRE-ORDER: Visit root node [{key}]. Append to result.",
            values: { key: node.key }
          }),
          visitedKeys
        );
        traverse(node.leftId);
        traverse(node.rightId);
      };
      traverse(rootId);
    } else if (type === "in") {
      const traverse = (nodeId: string | null) => {
        if (!nodeId) return;
        const node = treeMap[nodeId];
        traverse(node.leftId);
        visitedKeys.push(node.key);
        pushStep(
          traversalSteps,
          treeMap,
          rootId,
          [nodeId],
          [nodeId],
          [],
          [],
          translate({
            message: "IN-ORDER: Left subtree visited. Visit root node [{key}]. Append to result.",
            values: { key: node.key }
          }),
          visitedKeys
        );
        traverse(node.rightId);
      };
      traverse(rootId);
    } else if (type === "post") {
      const traverse = (nodeId: string | null) => {
        if (!nodeId) return;
        const node = treeMap[nodeId];
        traverse(node.leftId);
        traverse(node.rightId);
        visitedKeys.push(node.key);
        pushStep(
          traversalSteps,
          treeMap,
          rootId,
          [nodeId],
          [nodeId],
          [],
          [],
          translate({
            message: "POST-ORDER: Left and Right subtrees visited. Visit root node [{key}]. Append to result.",
            values: { key: node.key }
          }),
          visitedKeys
        );
      };
      traverse(rootId);
    } else if (type === "level") {
      const queue: string[] = [rootId];
      while (queue.length > 0) {
        const currId = queue.shift()!;
        const node = treeMap[currId];
        visitedKeys.push(node.key);

        pushStep(
          traversalSteps,
          treeMap,
          rootId,
          [currId],
          [currId],
          [],
          [],
          translate({
            message: "LEVEL-ORDER (BFS): Dequeue front element and visit [{key}].",
            values: { key: node.key }
          }),
          visitedKeys
        );

        if (node.leftId) queue.push(node.leftId);
        if (node.rightId) queue.push(node.rightId);
      }
    }

    pushStep(
      traversalSteps,
      treeMap,
      rootId,
      [],
      [],
      [],
      [],
      translate({
        message: "Traversal completed! Full sequence: [{sequence}].",
        values: { sequence: visitedKeys.join(", ") }
      }),
      visitedKeys
    );

    setSteps(traversalSteps);
    setCurrentStepIdx(0);
    setIsPlaying(true);
  };

  // --- RECIPES LOADERS ---
  const applyRecipe = (recipe: RotationRecipe) => {
    setIsPlaying(false);
    setTreeMode("AVL");

    const tempMap: TreeMap = {};
    let tempRoot: string | null = null;

    // Helper functions inside recipe applying to simulate standard insert
    const insertRaw = (key: number) => {
      const helper = (nodeId: string | null): string => {
        if (!nodeId) {
          const n = createNode(key);
          tempMap[n.id] = n;
          return n.id;
        }
        const n = tempMap[nodeId];
        if (key < n.key) n.leftId = helper(n.leftId);
        else n.rightId = helper(n.rightId);
        updateHeight(nodeId, tempMap);
        return nodeId;
      };
      tempRoot = helper(tempRoot);
    };

    // Insert first two keys directly without balancing to trigger the exact state
    insertRaw(recipe.keys[0]);
    insertRaw(recipe.keys[1]);

    // Apply state
    setTreeMap(tempMap);
    setRootId(tempRoot);
    setSteps([]);
    setCurrentStepIdx(0);

    // Prompt user to trigger insertion of 3rd key
    setInputKey(recipe.keys[2].toString());
    alert(translate({
      message: "Recipe loaded! Click 'Insert' to add key {key} and watch the AVL {type} rotation rebalancing animation!",
      values: { key: recipe.keys[2], type: recipe.type }
    }));
  };

  const loadRandomTree = () => {
    setIsPlaying(false);
    const keys = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);
    // Remove duplicates
    const uniqueKeys = Array.from(new Set(keys));

    const tempMap: TreeMap = {};
    let tempRoot: string | null = null;

    // Build the tree with AVL rotations if in AVL mode, otherwise simple BST
    const insertRaw = (key: number) => {
      const helper = (nodeId: string | null): string => {
        if (!nodeId) {
          const n = createNode(key);
          tempMap[n.id] = n;
          return n.id;
        }
        const n = tempMap[nodeId];
        if (key < n.key) n.leftId = helper(n.leftId);
        else n.rightId = helper(n.rightId);
        
        updateHeight(nodeId, tempMap);

        if (treeMode === "AVL") {
          const bf = getBalanceFactor(nodeId, tempMap);
          if (bf > 1) {
            const leftBf = getBalanceFactor(n.leftId, tempMap);
            return leftBf >= 0 ? rotateRight(nodeId, tempMap) : (n.leftId = rotateLeft(n.leftId!, tempMap), rotateRight(nodeId, tempMap));
          }
          if (bf < -1) {
            const rightBf = getBalanceFactor(n.rightId, tempMap);
            return rightBf <= 0 ? rotateLeft(nodeId, tempMap) : (n.rightId = rotateRight(n.rightId!, tempMap), rotateLeft(nodeId, tempMap));
          }
        }
        return nodeId;
      };
      tempRoot = helper(tempRoot);
    };

    uniqueKeys.forEach(insertRaw);

    setTreeMap(tempMap);
    setRootId(tempRoot);
    setSteps([]);
    setCurrentStepIdx(0);
  };

  const handleClear = () => {
    setIsPlaying(false);
    setTreeMap({});
    setRootId(null);
    setSteps([]);
    setCurrentStepIdx(0);
  };

  // Convert inputs to lists for rendering
  const activeStep = steps[currentStepIdx] || null;
  const currentMap = activeStep ? activeStep.tree : treeMap;
  const currentRoot = activeStep ? activeStep.rootId : rootId;

  // Compute node locations
  const nodePositions = calculateNodePositions(currentRoot, currentMap);

  const rotationRecipesList: RotationRecipe[] = [
    {
      id: "avl_ll",
      name: translate({ message: "Left-Left (LL) Single Rotation" }),
      keys: [30, 20, 10],
      type: "LL",
      description: translate({ message: "Inserting 10 into a left-skewed path (30 -> 20) triggers a single Right Rotation around node 30 to restore balance." })
    },
    {
      id: "avl_rr",
      name: translate({ message: "Right-Right (RR) Single Rotation" }),
      keys: [10, 20, 30],
      type: "RR",
      description: translate({ message: "Inserting 30 into a right-skewed path (10 -> 20) triggers a single Left Rotation around node 10 to restore balance." })
    },
    {
      id: "avl_lr",
      name: translate({ message: "Left-Right (LR) Double Rotation" }),
      keys: [30, 10, 20],
      type: "LR",
      description: translate({ message: "Inserting 20 into the right child of left child (30 -> 10 -> 20) requires a Left Rotation around 10, followed by a Right Rotation around 30." })
    },
    {
      id: "avl_rl",
      name: translate({ message: "Right-Left (RL) Double Rotation" }),
      keys: [10, 30, 20],
      type: "RL",
      description: translate({ message: "Inserting 20 into the left child of right child (10 -> 30 -> 20) requires a Right Rotation around 30, followed by a Left Rotation around 10." })
    }
  ];

  return (
    <div style={{ padding: "8px", fontFamily: "var(--ifm-font-family-base)", color: "var(--ifm-font-color-base)" }}>
      
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "30px", marginBottom: "8px" }}>
          <Cpu size={16} color="#6366f1" />
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6366f1", letterSpacing: "1px", textTransform: "uppercase" }}>
            <Translate>Tree Sandbox Labs</Translate>
          </span>
        </div>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
          <Translate>BST & AVL Self-Balancing Tree Sandbox</Translate>
        </h2>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--ifm-color-emphasis-600)" }}>
          <Translate>Insert, search, or delete nodes and trace balance factors and rotations step-by-step.</Translate>
        </p>
      </div>

      {/* TOP CONTROL PANEL */}
      <div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          background: "var(--ifm-color-emphasis-100, #f8fafc)",
          border: "1px solid var(--ifm-color-emphasis-200)",
          padding: "16px",
          borderRadius: "14px",
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Toggle Mode */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, marginRight: "4px" }}>
            <Translate>Algorithm:</Translate>
          </span>
          {["BST", "AVL"].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setTreeMode(mode as "BST" | "AVL");
                handleClear();
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                background: treeMode === mode ? "var(--ifm-color-primary, #6366f1)" : "var(--ifm-color-emphasis-200, #cbd5e1)",
                color: treeMode === mode ? "#ffffff" : "var(--ifm-font-color-base)",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {mode === "BST" ? translate({ message: "Binary Search Tree" }) : translate({ message: "AVL Tree" })}
            </button>
          ))}
        </div>

        {/* Node Operations */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="number"
            min={1}
            max={99}
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            style={{
              width: "60px",
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid var(--ifm-color-emphasis-300)",
              fontWeight: "bold",
              textAlign: "center"
            }}
          />
          <button
            onClick={() => triggerInsert(Number(inputKey))}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#10b981",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            <Translate>Insert</Translate>
          </button>
          <button
            onClick={() => triggerDelete(Number(inputKey))}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#f43f5e",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            <Translate>Delete</Translate>
          </button>
          <button
            onClick={() => triggerSearch(Number(inputKey))}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#eab308",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            <Translate>Search</Translate>
          </button>
        </div>

        {/* Global Utilities */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={loadRandomTree}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--ifm-color-emphasis-300)",
              background: "var(--ifm-color-emphasis-100, #f8fafc)",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <Translate>Random</Translate>
          </button>
          <button
            onClick={handleClear}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--ifm-color-emphasis-300)",
              background: "var(--ifm-color-emphasis-100, #f8fafc)",
              cursor: "pointer",
              color: "#f43f5e",
              fontWeight: 600
            }}
          >
            <Translate>Clear</Translate>
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
        
        {/* LEFT COLUMN: SVG TREE GRAPH CANVAS & SIMULATION STEPS */}
        <div style={{ flex: "1 1 550px", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* SVG CANVAS */}
          <div 
            style={{
              background: isDark ? "#1e293b" : "#ffffff",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "14px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
            }}
          >
            {Object.keys(currentMap).length === 0 ? (
              <div style={{ height: "360px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", color: "var(--ifm-color-emphasis-500)" }}>
                <HelpCircle size={40} strokeWidth={1.5} style={{ marginBottom: "12px", opacity: 0.7 }} />
                <span style={{ fontWeight: 700, fontSize: "1rem" }}>
                  <Translate>Empty Canvas</Translate>
                </span>
                <span style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  <Translate>Insert keys or load a preset AVL recipe below to begin.</Translate>
                </span>
              </div>
            ) : (
              <svg width="100%" height="360" style={{ display: "block" }}>
                {/* 1. RENDER EDGES */}
                {Object.values(currentMap).map((node) => {
                  const parentPos = nodePositions[node.id];
                  if (!parentPos) return null;

                  return (
                    <g key={`edges-${node.id}`}>
                      {node.leftId && nodePositions[node.leftId] && (
                        <line
                          x1={parentPos.x}
                          y1={parentPos.y}
                          x2={nodePositions[node.leftId].x}
                          y2={nodePositions[node.leftId].y}
                          stroke={
                            (activeStep?.rotationIds.includes(node.id) && activeStep?.rotationIds.includes(node.leftId))
                              ? "#a855f7" // Rotation edge
                              : (activeStep?.highlightedIds.includes(node.id) && activeStep?.highlightedIds.includes(node.leftId))
                              ? "#38bdf8" // Trace edge
                              : (isDark ? "#475569" : "#cbd5e1")
                          }
                          strokeWidth={
                            (activeStep?.rotationIds.includes(node.id) && activeStep?.rotationIds.includes(node.leftId)) ||
                            (activeStep?.highlightedIds.includes(node.id) && activeStep?.highlightedIds.includes(node.leftId))
                              ? 3
                              : 2
                          }
                        />
                      )}
                      {node.rightId && nodePositions[node.rightId] && (
                        <line
                          x1={parentPos.x}
                          y1={parentPos.y}
                          x2={nodePositions[node.rightId].x}
                          y2={nodePositions[node.rightId].y}
                          stroke={
                            (activeStep?.rotationIds.includes(node.id) && activeStep?.rotationIds.includes(node.rightId))
                              ? "#a855f7" // Rotation edge
                              : (activeStep?.highlightedIds.includes(node.id) && activeStep?.highlightedIds.includes(node.rightId))
                              ? "#38bdf8" // Trace edge
                              : (isDark ? "#475569" : "#cbd5e1")
                          }
                          strokeWidth={
                            (activeStep?.rotationIds.includes(node.id) && activeStep?.rotationIds.includes(node.rightId)) ||
                            (activeStep?.highlightedIds.includes(node.id) && activeStep?.highlightedIds.includes(node.rightId))
                              ? 3
                              : 2
                          }
                        />
                      )}
                    </g>
                  );
                })}

                {/* 2. RENDER NODES */}
                {Object.values(currentMap).map((node) => {
                  const pos = nodePositions[node.id];
                  if (!pos) return null;

                  // Determine active highlights
                  const isHighlighted = activeStep?.highlightedIds.includes(node.id);
                  const isSuccess = activeStep?.successIds.includes(node.id);
                  const isWarning = activeStep?.warningIds.includes(node.id);
                  const isRotation = activeStep?.rotationIds.includes(node.id);

                  let nodeBg = isDark ? "#1e293b" : "#ffffff";
                  let borderCol = isDark ? "#475569" : "#cbd5e1";
                  let textCol = "var(--ifm-font-color-base)";

                  if (isSuccess) {
                    nodeBg = "#10b981"; // green
                    borderCol = "#059669";
                    textCol = "#ffffff";
                  } else if (isRotation) {
                    nodeBg = "#a855f7"; // purple
                    borderCol = "#7e22ce";
                    textCol = "#ffffff";
                  } else if (isWarning) {
                    nodeBg = "#f43f5e"; // red
                    borderCol = "#be123c";
                    textCol = "#ffffff";
                  } else if (isHighlighted) {
                    nodeBg = "#38bdf8"; // cyan
                    borderCol = "#0284c7";
                    textCol = "#ffffff";
                  }

                  const bf = getBalanceFactor(node.id, currentMap);

                  return (
                    <g key={node.id} style={{ cursor: "pointer" }}>
                      {/* Node Circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="18"
                        fill={nodeBg}
                        stroke={borderCol}
                        strokeWidth="2.5"
                        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.06))" }}
                      />
                      
                      {/* Key Value */}
                      <text
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        fill={textCol}
                        style={{ fontSize: "0.85rem", fontWeight: 800, fontFamily: "inherit" }}
                      >
                        {node.key}
                      </text>

                      {/* AVL Metadata labels (Height / Balance Factor) */}
                      {treeMode === "AVL" && (
                        <g>
                          {/* Balance Factor top right */}
                          <circle
                            cx={pos.x + 18}
                            cy={pos.y - 14}
                            r="8"
                            fill={Math.abs(bf) > 1 ? "#ef4444" : (isDark ? "#334155" : "#e2e8f0")}
                          />
                          <text
                            x={pos.x + 18}
                            y={pos.y - 11}
                            textAnchor="middle"
                            fill={Math.abs(bf) > 1 ? "#ffffff" : "var(--ifm-font-color-base)"}
                            style={{ fontSize: "0.55rem", fontWeight: 900 }}
                          >
                            {bf > 0 ? `+${bf}` : bf}
                          </text>

                          {/* Height bottom right */}
                          <text
                            x={pos.x - 22}
                            y={pos.y + 20}
                            fill="var(--ifm-color-emphasis-600)"
                            style={{ fontSize: "0.6rem", fontWeight: 700 }}
                          >
                            h={node.height}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          {/* SIMULATION TIMELINE CONTROLS */}
          {steps.length > 0 && (
            <div 
              style={{
                background: "var(--ifm-color-emphasis-100, #f8fafc)",
                border: "1px solid var(--ifm-color-emphasis-200)",
                padding: "16px",
                borderRadius: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              {/* Range Slider */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ifm-color-emphasis-600)", minWidth: "40px" }}>
                  <Translate>Step</Translate> {currentStepIdx}
                </span>
                <input
                  type="range"
                  min={0}
                  max={steps.length - 1}
                  value={currentStepIdx}
                  onChange={(e) => {
                    setCurrentStepIdx(Number(e.target.value));
                    setIsPlaying(false);
                  }}
                  style={{ flexGrow: 1, accentColor: "var(--ifm-color-primary)" }}
                />
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--ifm-color-emphasis-600)", minWidth: "40px", textAlign: "right" }}>
                  <Translate>Total</Translate> {steps.length - 1}
                </span>
              </div>

              {/* Playback Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => {
                      setCurrentStepIdx(0);
                      setIsPlaying(false);
                    }}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--ifm-color-emphasis-300)",
                      background: "#ffffff",
                      color: "#000000",
                      cursor: "pointer",
                    }}
                    title={translate({ message: "Reset Simulation" })}
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStepIdx((prev) => Math.max(0, prev - 1));
                      setIsPlaying(false);
                    }}
                    disabled={currentStepIdx === 0}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--ifm-color-emphasis-300)",
                      background: "#ffffff",
                      color: "#000000",
                      cursor: "pointer",
                      opacity: currentStepIdx === 0 ? 0.5 : 1,
                    }}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      padding: "6px 18px",
                      borderRadius: "6px",
                      border: "none",
                      background: isPlaying ? "var(--ifm-color-warning, #eab308)" : "var(--ifm-color-primary, #6366f1)",
                      color: "#ffffff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isPlaying ? translate({ message: "Pause" }) : translate({ message: "Play" })}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1));
                      setIsPlaying(false);
                    }}
                    disabled={currentStepIdx === steps.length - 1}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--ifm-color-emphasis-300)",
                      background: "#ffffff",
                      color: "#000000",
                      cursor: "pointer",
                      opacity: currentStepIdx === steps.length - 1 ? 0.5 : 1,
                    }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Sliders size={14} color="var(--ifm-color-emphasis-600)" />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    <Translate>Interval:</Translate>
                  </span>
                  <input
                    type="range"
                    min={400}
                    max={2000}
                    step={100}
                    value={playSpeed}
                    onChange={(e) => setPlaySpeed(Number(e.target.value))}
                    style={{ width: "80px", accentColor: "var(--ifm-color-primary)" }}
                  />
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, minWidth: "40px" }}>{playSpeed}ms</span>
                </div>
              </div>

              {/* Step Text Explanation */}
              <div 
                style={{
                  background: isDark ? "#0f172a" : "#eff6ff",
                  border: "1px solid rgba(99,102,241,0.2)",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  marginTop: "6px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start"
                }}
              >
                <Info size={16} color="#6366f1" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: "0.85rem", lineHeight: "1.4", display: "block", color: isDark ? "#cbd5e1" : "#1e3a8a" }}>
                    {activeStep.explanation}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: TRAVERSALS & AVL PRESET RECIPES */}
        <div style={{ flex: "1 1 350px", maxWidth: "450px", display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* TRAVERSAL CONTROL PANEL */}
          <div 
            style={{
              background: isDark ? "#1e293b" : "#ffffff",
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <BookOpen size={16} color="#6366f1" />
              <span style={{ fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase" }}>
                <Translate>Animate Traversals</Translate>
              </span>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <button
                onClick={() => triggerTraversal("pre")}
                disabled={!rootId}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: isDark ? "#334155" : "#f1f5f9",
                  color: "var(--ifm-font-color-base)",
                  cursor: rootId ? "pointer" : "not-allowed",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  opacity: rootId ? 1 : 0.5
                }}
              >
                Pre-order (DLR)
              </button>
              <button
                onClick={() => triggerTraversal("in")}
                disabled={!rootId}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: isDark ? "#334155" : "#f1f5f9",
                  color: "var(--ifm-font-color-base)",
                  cursor: rootId ? "pointer" : "not-allowed",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  opacity: rootId ? 1 : 0.5
                }}
              >
                In-order (LDR)
              </button>
              <button
                onClick={() => triggerTraversal("post")}
                disabled={!rootId}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: isDark ? "#334155" : "#f1f5f9",
                  color: "var(--ifm-font-color-base)",
                  cursor: rootId ? "pointer" : "not-allowed",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  opacity: rootId ? 1 : 0.5
                }}
              >
                Post-order (LRD)
              </button>
              <button
                onClick={() => triggerTraversal("level")}
                disabled={!rootId}
                style={{
                  padding: "8px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: isDark ? "#334155" : "#f1f5f9",
                  color: "var(--ifm-font-color-base)",
                  cursor: rootId ? "pointer" : "not-allowed",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  opacity: rootId ? 1 : 0.5
                }}
              >
                Level-order (BFS)
              </button>
            </div>

            {/* Traversal output tape */}
            {activeStep && activeStep.visitedKeys.length > 0 && (
              <div style={{ marginTop: "14px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "var(--ifm-color-emphasis-500)", display: "block", marginBottom: "6px" }}>
                  <Translate>Traversal Path Result</Translate>
                </span>
                <div 
                  style={{
                    background: isDark ? "#0f172a" : "#f1f5f9",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontFamily: "var(--ifm-font-family-monospace)",
                    fontSize: "0.85rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px"
                  }}
                >
                  {activeStep.visitedKeys.map((k, idx) => (
                    <span 
                      key={idx} 
                      style={{
                        padding: "2px 6px",
                        background: idx === activeStep.visitedKeys.length - 1 ? "#38bdf8" : (isDark ? "#334155" : "#cbd5e1"),
                        color: idx === activeStep.visitedKeys.length - 1 ? "#ffffff" : "var(--ifm-font-color-base)",
                        borderRadius: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AVL PRESET ROTATION RECIPES */}
          {treeMode === "AVL" && (
            <div 
              style={{
                background: isDark ? "#1e293b" : "#ffffff",
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "14px",
                padding: "16px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Flame size={16} color="#a855f7" />
                <span style={{ fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase" }}>
                  <Translate>AVL Rotation Tutorials</Translate>
                </span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {rotationRecipesList.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => applyRecipe(recipe)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: isDark ? "#1e293b" : "#f8fafc",
                      border: "1px solid var(--ifm-color-emphasis-200)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      position: "relative"
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#a855f7", display: "block" }}>
                      {recipe.name}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--ifm-color-emphasis-600)", display: "block", marginTop: "4px" }}>
                      {recipe.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
