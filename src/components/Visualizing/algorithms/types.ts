export type AlgorithmType = 'bubble-sort' | 'binary-search' | 'bfs' | 'dfs';

export interface Step {
  description: string;
  variables: Record<string, any>;
  array?: number[];
  highlights?: {
    active?: number[];
    compared?: number[];
    sorted?: number[];
    low?: number;
    high?: number;
    mid?: number;
  };
  graphState?: {
    activeNode: number | null;
    visited: number[];
    structure: number[];
  };
}
