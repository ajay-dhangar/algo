const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_DIR = path.join(__dirname, '../src/data/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'docsCatalogIndex.json');
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

function normalizeDifficulty(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  const raw = String(value).trim();
  const lower = raw.toLowerCase();

  if (lower === 'easy') return 'Easy';
  if (lower === 'medium') return 'Medium';
  if (lower === 'hard') return 'Hard';
  return undefined;
}

function normalizeTopics(raw) {
  if (raw === undefined || raw === null) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw
      .map((topic) => String(topic).trim())
      .filter((topic) => topic.length > 0);
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((topic) => topic.trim())
      .filter((topic) => topic.length > 0);
  }

  return [];
}

function normalizeTags(raw) {
  if (raw === undefined || raw === null) {
    return [];
  }

  if (Array.isArray(raw)) {
    return raw.map((tag) => String(tag).trim()).filter((tag) => tag.length > 0);
  }

  if (typeof raw === 'string') {
    return raw.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0);
  }

  return [];
}

function buildPermalink(relativePath, frontMatter) {
  const explicitSlug = typeof frontMatter.slug === 'string' ? frontMatter.slug.trim() : '';
  let docPath = '';

  if (explicitSlug) {
    docPath = explicitSlug;
    if (docPath.startsWith('/')) docPath = docPath.slice(1);
    if (docPath.endsWith('/')) docPath = docPath.slice(0, -1);
  } else {
    docPath = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
    if (docPath.endsWith('/index')) {
      docPath = docPath.slice(0, -6);
    }
    if (docPath === 'index') {
      docPath = '';
    }
  }

  const encodedPath = docPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `/docs${encodedPath ? `/${encodedPath}` : ''}`;
}

function getAllMarkdownFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (/\.mdx?$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectDocs() {
  const files = getAllMarkdownFiles(DOCS_DIR);
  const items = [];
  const difficultySet = new Set();
  const topicSet = new Set();
  const tagSet = new Set();

  for (const filePath of files) {
    const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(raw);

    if (frontMatter?.draft === true || frontMatter?.unlisted === true) {
      continue;
    }

    const baseName = path.basename(filePath).replace(/\.mdx?$/, '');
    const title = String(frontMatter?.title || frontMatter?.sidebar_label || baseName).trim();

    const description = frontMatter?.description
      ? String(frontMatter.description).trim()
      : content
          .replace(/^#+.*$/gm, '')
          .replace(/:::.*?:::/gs, '')
          .replace(/<[^>]+>/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/[`*_]/g, '')
          .trim()
          .slice(0, 200);

    const difficulty = normalizeDifficulty(frontMatter?.difficulty);
    const topics = normalizeTopics(frontMatter?.topics);
    const tags = normalizeTags(frontMatter?.tags);

    if (difficulty) {
      difficultySet.add(difficulty);
    }
    topics.forEach((topic) => topicSet.add(topic));
    tags.forEach((tag) => tagSet.add(tag));

    items.push({
      id: String(frontMatter?.id || `${relativePath}`),
      title,
      description,
      difficulty,
      topics,
      tags,
      permalink: buildPermalink(relativePath, frontMatter || {}),
    });
  }

  items.sort((a, b) => a.title.localeCompare(b.title));

  const difficulties = DIFFICULTIES.filter((difficulty) => difficultySet.has(difficulty));
  const topics = [...topicSet].sort((a, b) => a.localeCompare(b));
  const tags = [...tagSet].sort((a, b) => a.localeCompare(b));

  return { generatedAt: new Date().toISOString(), items, difficulties, topics, tags };
}

function main() {
  const output = collectDocs();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`✅ Indexed ${output.items.length} docs -> ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

main();
