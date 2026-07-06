import { Step } from './types';

// 0 - 1 - 2
// |   |
// 3 - 4
const graph: Record<number, number[]> = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1],
  3: [0, 4],
  4: [1, 3],
};

export function generateBfsSteps(): Step[] {
  const newSteps: Step[] = [];
  const visited: number[] = [];
  const queue: number[] = [0];
  visited.push(0);

  newSteps.push({
    description: 'Start BFS traversal. Enqueue starting node 0 and mark it as visited.',
    variables: { queue: '[0]', visited: '[0]' },
    graphState: { activeNode: 0, visited: [...visited], structure: [...queue] },
  });

  while (queue.length > 0) {
    const curr = queue.shift()!;
    newSteps.push({
      description: `Dequeue node ${curr} and process it.`,
      variables: { queue: JSON.stringify(queue), visited: JSON.stringify(visited) },
      graphState: { activeNode: curr, visited: [...visited], structure: [...queue] },
    });

    for (const neighbor of graph[curr]) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        newSteps.push({
          description: `Neighbor ${neighbor} of node ${curr} is unvisited. Enqueue and mark visited.`,
          variables: { queue: JSON.stringify(queue), visited: JSON.stringify(visited) },
          graphState: { activeNode: curr, visited: [...visited], structure: [...queue] },
        });
      }
    }
  }
  newSteps.push({
    description: 'BFS Queue is empty. Graph traversal completed.',
    variables: { queue: '[]', visited: JSON.stringify(visited) },
    graphState: { activeNode: null, visited: [...visited], structure: [] },
  });

  return newSteps;
}

export function generateDfsSteps(): Step[] {
  const newSteps: Step[] = [];
  const visited: number[] = [];
  const stack: number[] = [0];

  newSteps.push({
    description: 'Start DFS traversal. Push starting node 0 to stack.',
    variables: { stack: '[0]', visited: '[]' },
    graphState: { activeNode: 0, visited: [...visited], structure: [...stack] },
  });

  while (stack.length > 0) {
    const curr = stack.pop()!;
    if (!visited.includes(curr)) {
      visited.push(curr);
      newSteps.push({
        description: `Pop node ${curr} from stack. Mark as visited.`,
        variables: { stack: JSON.stringify(stack), visited: JSON.stringify(visited) },
        graphState: { activeNode: curr, visited: [...visited], structure: [...stack] },
      });

      // Push unvisited neighbors in reverse order to explore left-to-right
      const neighbors = [...graph[curr]].reverse();
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor)) {
          stack.push(neighbor);
          newSteps.push({
            description: `Push unvisited neighbor ${neighbor} of node ${curr} to stack.`,
            variables: { stack: JSON.stringify(stack), visited: JSON.stringify(visited) },
            graphState: { activeNode: curr, visited: [...visited], structure: [...stack] },
          });
        }
      }
    }
  }
  newSteps.push({
    description: 'DFS Stack is empty. Graph traversal completed.',
    variables: { stack: '[]', visited: JSON.stringify(visited) },
    graphState: { activeNode: null, visited: [...visited], structure: [] },
  });

  return newSteps;
}
