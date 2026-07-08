#!/usr/bin/env node

/**
 * generateStats.js
 *
 * Documentation Coverage Dashboard — scans all algorithm docs and reports
 * how many have each standardized metadata field populated.
 *
 * Outputs a formatted summary table to the console, useful for tracking
 * progress toward full metadata coverage.
 *
 * Usage:
 *   node scripts/generateStats.js
 *   npm run stats:docs
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');

const METADATA_FIELDS = [
  'category',
  'subcategory',
  'difficulty',
  'time_complexity',
  'space_complexity',
  'languages',
  'prerequisites',
];

// Core required fields (from validate-frontmatter.js)
const CORE_FIELDS = ['id', 'title', 'sidebar_label', 'description', 'tags'];

let totalFiles = 0;
const fieldCounts = {};
const coreFieldCounts = {};
const missingExamples = {};

// Initialize counters
METADATA_FIELDS.forEach((field) => {
  fieldCounts[field] = 0;
  missingExamples[field] = [];
});
CORE_FIELDS.forEach((field) => {
  coreFieldCounts[field] = 0;
});

function scanFile(filePath, fileName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      return; // No frontmatter
    }

    totalFiles++;

    // Count core fields
    CORE_FIELDS.forEach((field) => {
      if (parsed.data[field] !== undefined && parsed.data[field] !== null) {
        coreFieldCounts[field]++;
      }
    });

    // Count metadata fields
    METADATA_FIELDS.forEach((field) => {
      if (parsed.data[field] !== undefined && parsed.data[field] !== null) {
        fieldCounts[field]++;
      } else if (missingExamples[field].length < 3) {
        // Collect up to 3 example files missing each field
        missingExamples[field].push(fileName);
      }
    });
  } catch (err) {
    // Skip files that can't be parsed
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.')) {
        walkDir(filePath);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
      scanFile(filePath, relativePath);
    }
  });
}

function padRight(str, len) {
  return str + ' '.repeat(Math.max(0, len - str.length));
}

function padLeft(str, len) {
  return ' '.repeat(Math.max(0, len - str.length)) + str;
}

function printProgressBar(count, total, width = 20) {
  const pct = total > 0 ? count / total : 0;
  const filled = Math.round(pct * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

console.log('📊 Documentation Coverage Dashboard\n');
console.log('═'.repeat(72));

try {
  walkDir(DOCS_DIR);
} catch (err) {
  console.error('Error scanning docs directory:', err);
  process.exit(1);
}

console.log(`\n📁 Total documentation files with frontmatter: ${totalFiles}\n`);

// Core fields coverage
console.log('─'.repeat(72));
console.log('  CORE FIELDS (required by validate-frontmatter.js)');
console.log('─'.repeat(72));
console.log(
  `  ${padRight('Field', 22)} ${padLeft('Has', 5)} ${padLeft('Missing', 8)} ${padLeft('%', 6)}  Coverage`
);
console.log('  ' + '─'.repeat(68));

CORE_FIELDS.forEach((field) => {
  const has = coreFieldCounts[field];
  const missing = totalFiles - has;
  const pct = totalFiles > 0 ? ((has / totalFiles) * 100).toFixed(1) : '0.0';
  const bar = printProgressBar(has, totalFiles);
  console.log(
    `  ${padRight(field, 22)} ${padLeft(String(has), 5)} ${padLeft(String(missing), 8)} ${padLeft(pct + '%', 6)}  ${bar}`
  );
});

// Metadata fields coverage
console.log('\n' + '─'.repeat(72));
console.log('  METADATA FIELDS (standardized schema — Issue #2410)');
console.log('─'.repeat(72));
console.log(
  `  ${padRight('Field', 22)} ${padLeft('Has', 5)} ${padLeft('Missing', 8)} ${padLeft('%', 6)}  Coverage`
);
console.log('  ' + '─'.repeat(68));

METADATA_FIELDS.forEach((field) => {
  const has = fieldCounts[field];
  const missing = totalFiles - has;
  const pct = totalFiles > 0 ? ((has / totalFiles) * 100).toFixed(1) : '0.0';
  const bar = printProgressBar(has, totalFiles);
  console.log(
    `  ${padRight(field, 22)} ${padLeft(String(has), 5)} ${padLeft(String(missing), 8)} ${padLeft(pct + '%', 6)}  ${bar}`
  );
});

// Summary counts from the issue
const complexityMissing = totalFiles - fieldCounts['time_complexity'];
const examplesMissing = totalFiles - fieldCounts['languages'];
const explanationsMissing = totalFiles - fieldCounts['category'];

console.log('\n' + '─'.repeat(72));
console.log('  QUICK SUMMARY');
console.log('─'.repeat(72));
console.log(`  Algorithms Missing Complexity:    ${complexityMissing}`);
console.log(`  Algorithms Missing Languages:     ${examplesMissing}`);
console.log(`  Algorithms Missing Category:      ${explanationsMissing}`);

// Show example files missing metadata
console.log('\n' + '─'.repeat(72));
console.log('  SAMPLE FILES MISSING METADATA (up to 3 per field)');
console.log('─'.repeat(72));

METADATA_FIELDS.forEach((field) => {
  if (missingExamples[field].length > 0) {
    console.log(`\n  ${field}:`);
    missingExamples[field].forEach((file) => {
      console.log(`    - ${file}`);
    });
  }
});

console.log('\n' + '═'.repeat(72));
console.log('  Run "npm run validate:metadata" to check for schema errors.');
console.log('═'.repeat(72) + '\n');
