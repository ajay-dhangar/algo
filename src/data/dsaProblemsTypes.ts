export interface HintStages {
  nudge?: string;
  approach?: string;
  pseudocode?: string;
  fullSolution?: string;
}

export interface DsaProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  companies: string[];
  url: string;
  hintStages?: HintStages;
}

export interface DsaTag {
  value: string;
  label: string;
}

export interface DsaProblemsIndex {
  generatedAt: string;
  count: number;
  difficulties: Array<'Easy' | 'Medium' | 'Hard'>;
  tags: DsaTag[];
  companies: string[];
  problems: DsaProblem[];
  problemsById?: Record<string, DsaProblem>;
}
