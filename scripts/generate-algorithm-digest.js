/**
 * Algorithm Digest & RSS Generator for Algo
 * ----------------------------------------------------
 * Scans all documentation files across `docs/` to index newly added
 * and updated algorithm articles.
 *
 * Generates:
 *  1. `static/algorithm-digest.xml` (RSS 2.0 feed)
 *  2. `static/rss/algorithm-digest.xml` (Mirror RSS endpoint)
 *  3. `src/data/generated/algorithmDigest.json` (Structured feed data for frontend UI)
 *
 * Optional: Dispatches email newsletter via Buttondown API if process.env.BUTTONDOWN_API_KEY
 * is set and `--send-email` argument is provided.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const https = require('https');

const SITE_URL = 'https://ajay-dhangar.github.io';
const BASE_URL = '/algo';
const DOCS_DIR = path.join(__dirname, '../docs');
const STATIC_DIR = path.join(__dirname, '../static');
const RSS_DIR = path.join(STATIC_DIR, 'rss');
const OUTPUT_DATA_DIR = path.join(__dirname, '../src/data/generated');

const RSS_OUT_FILE = path.join(STATIC_DIR, 'algorithm-digest.xml');
const RSS_MIRROR_FILE = path.join(RSS_DIR, 'algorithm-digest.xml');
const JSON_OUT_FILE = path.join(OUTPUT_DATA_DIR, 'algorithmDigest.json');

// Ensure output directories exist
[STATIC_DIR, RSS_DIR, OUTPUT_DATA_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

/** Formats a relative doc path to a full public permalink */
function buildPermalink(relativePath) {
  let docPath = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');

  // Handle index files
  if (docPath.endsWith('/index')) {
    docPath = docPath.slice(0, -6);
  }

  // Handle top-level index
  if (docPath === 'index') {
    docPath = '';
  }

  const pathSuffix = docPath ? `/${docPath}` : '';
  return `${SITE_URL}${BASE_URL}/docs${pathSuffix}`;
}

/** Recursively collects all markdown files in a directory */
function getAllMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (/\.mdx?$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

/** Obtains fast file modification timestamp */
function getFileTimestamp(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime;
  } catch {
    return new Date();
  }
}

/** Collects and processes all algorithm doc entries */
function collectAlgorithmDocs() {
  const files = getAllMarkdownFiles(DOCS_DIR);
  const items = [];

  for (const filePath of files) {
    const relativePath = path.relative(DOCS_DIR, filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Skip unlisted or draft docs if specified
    if (frontmatter.draft === true || frontmatter.unlisted === true) continue;

    const baseName = path.basename(filePath).replace(/\.mdx?$/, '');
    const title = frontmatter.title || frontmatter.sidebar_label || baseName;

    // Strip markdown formatting for summary
    const cleanContent = content
      .replace(/^#+.*$/gm, '')
      .replace(/:::.*?:::/gs, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_]/g, '')
      .trim();

    const description =
      frontmatter.description ||
      (cleanContent ? cleanContent.slice(0, 240) + '…' : 'Comprehensive guide and tutorial on Algo.');

    const dateObj = frontmatter.date
      ? new Date(frontmatter.date)
      : getFileTimestamp(filePath);

    const category = relativePath.split(path.sep)[0] || 'General';
    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags
      : typeof frontmatter.tags === 'string'
      ? frontmatter.tags.split(',').map((t) => t.trim())
      : [];

    const permalink = buildPermalink(relativePath);

    items.push({
      id: frontmatter.id || baseName,
      title: title.trim(),
      description: description.trim(),
      permalink,
      category,
      tags: tags.slice(0, 5),
      author: frontmatter.author || 'Algo Community',
      pubDate: dateObj.toISOString(),
      pubDateFormatted: dateObj.toUTCString(),
    });
  }

  // Sort descending by pubDate (newest algorithms first)
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return items;
}

/** Escapes special XML characters */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Generates RSS 2.0 XML string */
function generateRssXml(items) {
  const buildDate = new Date().toUTCString();
  const last30Items = items.slice(0, 50);

  const itemsXml = last30Items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.permalink)}</link>
      <guid isPermaLink="true">${escapeXml(item.permalink)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDateFormatted}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">${escapeXml(item.author)}</dc:creator>
    </item>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Algo — New Algorithm Digest</title>
    <link>${SITE_URL}${BASE_URL}/newsletter</link>
    <description>Periodic digest summarizing newly merged algorithm docs and problem walkthroughs in Algo.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}${BASE_URL}/algorithm-digest.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;
}

/** Sends an optional email digest via Buttondown API if configured */
async function sendButtondownDigest(recentItems) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.log('ℹ️ BUTTONDOWN_API_KEY not found. Skipping email dispatch.');
    return;
  }

  if (recentItems.length === 0) {
    console.log('ℹ️ No new algorithm articles found for digest email.');
    return;
  }

  const topItems = recentItems.slice(0, 5);
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const subject = `🚀 New Algorithm Digest (${dateStr}) — ${topItems.length} New Topics`;

  let bodyMarkdown = `Here is your periodic digest of newly added Data Structures & Algorithms docs on **Algo**!\n\n`;
  topItems.forEach((item, index) => {
    bodyMarkdown += `### ${index + 1}. [${item.title}](${item.permalink})\n`;
    bodyMarkdown += `*Category: ${item.category}*\n\n`;
    bodyMarkdown += `${item.description}\n\n`;
    bodyMarkdown += `[Read Full Guide →](${item.permalink})\n\n---\n\n`;
  });
  bodyMarkdown += `Explore all tutorials and visualizers on [Algo Mastery](${SITE_URL}${BASE_URL}/).\n`;

  const payload = JSON.stringify({
    subject,
    body: bodyMarkdown,
  });

  const options = {
    hostname: 'api.buttondown.email',
    port: 443,
    path: '/v1/emails',
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Buttondown email digest created successfully!');
          resolve(data);
        } else {
          console.error(`❌ Buttondown API error (${res.statusCode}):`, data);
          reject(new Error(data));
        }
      });
    });
    req.on('error', (err) => {
      console.error('❌ Request error sending Buttondown email:', err);
      reject(err);
    });
    req.write(payload);
    req.end();
  });
}

function main() {
  console.log('🔍 Scanning docs for Algorithm Digest generation...');
  const items = collectAlgorithmDocs();

  console.log(`📦 Found ${items.length} total algorithm articles.`);

  // Write JSON data
  fs.writeFileSync(JSON_OUT_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log(`✅ Saved JSON digest data -> ${JSON_OUT_FILE}`);

  // Write RSS XML
  const xmlContent = generateRssXml(items);
  fs.writeFileSync(RSS_OUT_FILE, xmlContent, 'utf8');
  fs.writeFileSync(RSS_MIRROR_FILE, xmlContent, 'utf8');
  console.log(`✅ Generated RSS feed -> ${RSS_OUT_FILE}`);
  console.log(`✅ Generated RSS mirror -> ${RSS_MIRROR_FILE}`);

  if (process.argv.includes('--send-email')) {
    sendButtondownDigest(items).catch(() => process.exit(1));
  }
}

main();
