export interface CatalogDoc {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  /** "frontmatter" = doc author set `difficulty:` explicitly, "inferred" = guessed from keywords */
  difficultySource: 'frontmatter' | 'inferred';
  tags: string[];
  /** Top-level docs/ folder this came from, e.g. "graphs", "extra" */
  category: string;
  url: string;
}

export interface CatalogTag {
  value: string;
  label: string;
}

export interface DocsCatalogIndex {
  generatedAt: string;
  count: number;
  difficulties: Array<'Easy' | 'Medium' | 'Hard'>;
  categories: string[];
  tags: CatalogTag[];
  docs: CatalogDoc[];
}
