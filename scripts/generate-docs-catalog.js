/**
 * Walks the "concept doc" parts of the site — docs/graphs, docs/extra/**,
 * docs/basic-data-structures, docs/data-structures, docs/programming-fundamentals
 * — and builds a single JSON index (src/data/generated/docsCatalogIndex.json)
 * consumed by the "Catalog" page (src/pages/catalog/index.tsx).
 *
 * This deliberately excludes docs/dsa-problems (already has its own
 * dedicated index + browse page, see generate-dsa-problems-index.js) and
 * docs/dsa-interview (separate Docusaurus plugin instance / route base).
 *
 * Difficulty comes from frontmatter (`difficulty: Easy|Medium|Hard`) when a
 * doc author has set it explicitly. Most docs in this repo don't have that
 * field yet, so as a fallback this infers a difficulty from keywords in the
 * title/tags — good enough to make the catalog usable today, but authors
 * are encouraged to set `difficulty` explicitly in frontmatter, which
 * always takes priority over the guess. Search for "HEURISTIC" below to
 * adjust the keyword lists.
 *
 * Run manually with `npm run generate:docs-catalog`, or automatically
 * before `npm start` / `npm run build` via the prestart/prebuild hooks in
 * package.json.
 */
 
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
 
const DOCS_ROOT = path.join(__dirname, '../docs');
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'docsCatalogIndex.json');
 
// Top-level docs/ folders to include. Add a folder here to bring it into
// the catalog — no other code changes needed.
const INCLUDED_ROOTS = [
  'graphs',
  'extra',
  'basic-data-structures',
  'data-structures',
  'programming-fundamentals',
];
 
const VALID_DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard']);
 
const NOISE_TAGS = new Set(['dsa', 'algorithms', 'algorithm', 'problem-solving', 'data structures', 'data-structures']);
 
function normalizeTag(raw) {
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
 
const KNOWN_ABBREVIATIONS = new Set(['dfs', 'bfs', 'bst', 'lca', 'gfg', 'dsa', 'scc', 'dag', 'astar']);
 
function labelForTag(key) {
  return key
    .split('-')
    .filter(Boolean)
    .map((word) => (KNOWN_ABBREVIATIONS.has(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}
 
// --- HEURISTIC difficulty fallback, used only when frontmatter has no `difficulty` ---
const HARD_KEYWORDS = [
  'trie', 'segment tree', 'fenwick', 'persistent', 'heavy-light', 'heavy light',
  'suffix', 'tarjan', 'kosaraju', 'fibonacci heap', 'treap', 'red-black', 'red black',
  'b-tree', 'articulation', 'bridge', 'strongly connected', 'network flow', 'max flow',
  'matrix chain', 'huffman', 'kmp', 'rabin-karp', 'rabin karp', 'z-algorithm', 'manacher',
  'a* search', 'a-star', 'bitmask', 'sqrt decomposition', 'centroid',
];
const MEDIUM_KEYWORDS = [
  'sort', 'search', 'stack', 'queue', 'linked list', 'hash', 'graph', 'bfs', 'dfs',
  'dijkstra', 'heap', 'recursion', 'backtracking', 'greedy', 'dynamic programming',
  'topological', 'union-find', 'disjoint set', 'avl', 'skip list',
];
const EASY_KEYWORDS = [
  'array', 'bubble sort', 'selection sort', 'insertion sort', 'linear search',
  'introduction', 'what is', 'basics', 'two pointer',
];
 
function inferDifficulty(title, tags) {
  const haystack = `${title} ${tags.join(' ')}`.toLowerCase();
  if (HARD_KEYWORDS.some((k) => haystack.includes(k))) return 'Hard';
  if (EASY_KEYWORDS.some((k) => haystack.includes(k))) return 'Easy';
  if (MEDIUM_KEYWORDS.some((k) => haystack.includes(k))) return 'Medium';
  return 'Medium'; // safe default when nothing matches
}
// --- end heuristic ---
 
function walk(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, fileList);
    } else if (/\.mdx?$/.test(entry.name) && entry.name !== '_category_.json') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}
 
function collectDocs() {
  const docs = [];
  const tagLabels = new Map();
 
  for (const root of INCLUDED_ROOTS) {
    const rootPath = path.join(DOCS_ROOT, root);
    if (!fs.existsSync(rootPath)) continue;
 
    const files = walk(rootPath);
 
    for (const filePath of files) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(raw);
 
      const relativeFromDocs = path.relative(DOCS_ROOT, filePath).replace(/\.mdx?$/, '');
      const url = `/docs/${relativeFromDocs.split(path.sep).join('/')}`;
 
      const baseId = path.basename(filePath).replace(/\.mdx?$/, '');
      const id = frontMatter.id || baseId;
      const title = frontMatter.title || id;
      const description = frontMatter.description || '';
 
      const rawTags = Array.isArray(frontMatter.tags)
        ? frontMatter.tags
        : typeof frontMatter.tags === 'string'
        ? frontMatter.tags.split(',')
        : [];
      const tags = [...new Set(rawTags.map(normalizeTag).filter((t) => t && !NOISE_TAGS.has(t)))];
      tags.forEach((tag) => {
        if (!tagLabels.has(tag)) tagLabels.set(tag, labelForTag(tag));
      });
 
      let difficulty = frontMatter.difficulty;
      let difficultySource = 'frontmatter';
      if (!VALID_DIFFICULTIES.has(difficulty)) {
        difficulty = inferDifficulty(title, tags);
        difficultySource = 'inferred';
      }
 
      docs.push({
        id,
        title,
        description,
        difficulty,
        difficultySource,
        tags,
        category: root,
        url,
      });
    }
  }
 
  docs.sort((a, b) => a.title.localeCompare(b.title));
 
  return {
    docs,
    tags: [...tagLabels.entries()]
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  };
}
 
function main() {
  const { docs, tags } = collectDocs();
 
  const explicitCount = docs.filter((d) => d.difficultySource === 'frontmatter').length;
 
  const output = {
    generatedAt: new Date().toISOString(),
    count: docs.length,
    difficulties: ['Easy', 'Medium', 'Hard'],
    categories: INCLUDED_ROOTS,
    tags,
    docs,
  };
 
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');
 
  console.log(
    `✅ Indexed ${docs.length} docs -> ${path.relative(process.cwd(), OUTPUT_FILE)} ` +
      `(${explicitCount} with explicit difficulty, ${docs.length - explicitCount} inferred)`
  );
}
 
main();