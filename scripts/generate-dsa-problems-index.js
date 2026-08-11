/**
 * Walks docs/dsa-problems/{easy,medium,hard} and builds a single JSON index
 * (src/data/generated/dsaProblemsIndex.json) consumed by the
 * "Browse Problems" page (src/pages/dsa-problems/index.tsx).
 *
 * Difficulty is derived from the top-level folder (easy/medium/hard) rather
 * than frontmatter, since that's how these docs are actually organized today.
 * Tags are pulled from frontmatter and normalized (trimmed, lowercased) so
 * near-duplicates like "DSA" / "dsa" and "Leetcode" / "leetcode" collapse
 * into a single filter chip instead of showing up twice.
 *
 * Run manually with `npm run generate:dsa-index`, or automatically before
 * `npm start` / `npm run build` via the prestart/prebuild hooks in
 * package.json.
 */
 
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
 
const DOCS_ROOT = path.join(__dirname, '../docs/dsa-problems');
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'dsaProblemsIndex.json');
 
const DIFFICULTY_DIRS = ['easy', 'medium', 'hard'];
const DIFFICULTY_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
 
// These show up on the majority of problems and don't help anyone filter
// anything (e.g. "dsa" and "leetcode" are almost universal here), so they're
// dropped from the generated index rather than cluttering the filter UI.
const NOISE_TAGS = new Set(['dsa', 'leetcode', 'algorithms', 'problem-solving', 'prolem-solving']);
 
function normalizeTag(raw) {
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
 
// Merges the clearest near-duplicates (plural/singular, alternate phrasing)
// so the filter list doesn't show both "Array" and "Arrays" as separate chips.
const TAG_SYNONYMS = {
  arrays: 'array',
  strings: 'string',
  'greedy-algorithms': 'greedy',
  'lowest-common-ancestor': 'lca',
};
 
function canonicalTag(tag) {
  return TAG_SYNONYMS[tag] || tag;
}
 
const KNOWN_ABBREVIATIONS = new Set(['dfs', 'bfs', 'bst', 'lca', 'gfg', 'dsa', 'potd']);
 
/** Turns a normalized tag key back into a readable chip label, e.g. "dfs" -> "DFS", "two-pointers" -> "Two Pointers". */
function labelForTag(key) {
  return key
    .split('-')
    .filter(Boolean)
    .map((word) => (KNOWN_ABBREVIATIONS.has(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(' ');
}
 
function collectProblems() {
  const problems = [];
  const tagLabels = new Map(); // normalized tag -> display label
  const companySet = new Set();
 
  for (const dir of DIFFICULTY_DIRS) {
    const dirPath = path.join(DOCS_ROOT, dir);
    if (!fs.existsSync(dirPath)) continue;
 
    const files = fs.readdirSync(dirPath).filter((f) => /\.mdx?$/.test(f));
 
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(raw);
 
      const baseId = file.replace(/\.mdx?$/, '');
      const id = frontMatter.id || baseId;
      const title = frontMatter.title || id;
      const description = frontMatter.description || '';
 
      const rawTags = Array.isArray(frontMatter.tags)
        ? frontMatter.tags
        : typeof frontMatter.tags === 'string'
        ? frontMatter.tags.split(',')
        : [];
 
      const tags = [
        ...new Set(rawTags.map(normalizeTag).map(canonicalTag).filter((tag) => tag && !NOISE_TAGS.has(tag))),
      ];
      tags.forEach((tag) => {
        if (!tagLabels.has(tag)) tagLabels.set(tag, labelForTag(tag));
      });
 
      // Not present in any doc today, but frontmatter can add this later
      // (e.g. `companies: [Google, Amazon]`) without any code changes here.
      const companies = Array.isArray(frontMatter.companies)
        ? frontMatter.companies.map((c) => String(c).trim()).filter(Boolean)
        : [];
      companies.forEach((c) => companySet.add(c));
 
      problems.push({
        id,
        title,
        description,
        difficulty: DIFFICULTY_LABELS[dir],
        tags,
        companies,
        url: `/docs/dsa-problems/${dir}/${baseId}`,
      });
    }
  }
 
  problems.sort((a, b) => a.title.localeCompare(b.title));
 
  return {
    problems,
    tags: [...tagLabels.entries()]
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    companies: [...companySet].sort(),
  };
}
 
function main() {
  const { problems, tags, companies } = collectProblems();

  // Build a lookup map for quick problem access by ID (used by company tracks)
  const problemsById = {};
  problems.forEach((p) => {
    problemsById[p.id] = p;
  });

  const output = {
    generatedAt: new Date().toISOString(),
    count: problems.length,
    difficulties: DIFFICULTY_DIRS.map((dir) => DIFFICULTY_LABELS[dir]),
    tags,
    companies,
    problems,
    problemsById,
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');

  console.log(`✅ Indexed ${problems.length} DSA problems -> ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}
 
main();